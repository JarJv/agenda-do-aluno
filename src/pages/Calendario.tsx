import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { CalendarDots, NotePencil, CaretLeft, CaretRight, X } from "@phosphor-icons/react";
import BordedButton from "../components/BordedButton";
import EmptySection from "../components/EmptySection.tsx";
import api from "../api/axios.ts";

// Constantes
const TIPO_EVENTO = {
  FALTA: 1,
  NAO_LETIVO: 2,
  LETIVO: 3
} as const;

const TIPOS_EVENTO_LABEL = {
  [TIPO_EVENTO.FALTA]: 'Falta',
  [TIPO_EVENTO.NAO_LETIVO]: 'Não Letivo',
  [TIPO_EVENTO.LETIVO]: 'Letivo'
} as const;

const MESES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

const LIMIT_EVENTOS = 1000;
const DIAS_EXIBICAO_LISTA = 10;

// Interface para os eventos do calendário
interface CalendarioEvento {
  id_data_evento: number;
  ra: string;
  data_evento: string;
  id_tipo_data: number;
}

interface EventoFormData {
  data: string;
  tipo: string;
}

export default function Calendario() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventos, setEventos] = useState<CalendarioEvento[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<CalendarioEvento | null>(null);
  const navigate = useNavigate();

  const [eventFormData, setEventFormData] = useState<EventoFormData>({
    data: '',
    tipo: ''
  });

  const ano = currentDate.getFullYear();
  const mes = currentDate.getMonth();
  const diasNoMes = new Date(ano, mes + 1, 0).getDate();
  const primeiroDiaSemana = new Date(ano, mes, 1).getDay();

  // ===== Funções auxiliares de tratamento de erro =====
  const mapeiarErroEvento = (status: number): string => {
    const erroMap: Record<number, string> = {
      400: 'Tipo de data inválido',
      403: 'Você não tem permissão para realizar esta ação',
      404: 'Evento não encontrado',
      409: 'Já existe um evento para esta data',
      401: 'Token inválido ou expirado'
    };
    return erroMap[status] || 'Erro ao processar evento. Tente novamente.';
  };

  const tratarErroAPI = (error: unknown, defaultMsg: string): string => {
    if (error instanceof Error && 'response' in error) {
      const apiError = error as { response?: { status: number } };
      if (apiError.response?.status === 401) {
        navigate('/login');
      }
      return mapeiarErroEvento(apiError.response?.status || 500) || defaultMsg;
    }
    return 'Erro de conexão. Verifique sua internet.';
  };

  // ===== Funções auxiliares de data =====
  const formatarDataISO = (dia: number): string => {
    return `${ano}-${String(mes + 1).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;
  };

  const ehDataPassada = (data: Date): boolean => {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    return data < hoje;
  };

  const parsearDataISO = (dataISO: string): Date => {
    const [year, month, day] = dataISO.split('-').map(Number);
    return new Date(year, month - 1, day);
  };

  const formatarDataBR = (dataISO: string): string => {
    const data = parsearDataISO(dataISO);
    return data.toLocaleDateString('pt-BR');
  };

  // ===== Funções de filtro de eventos =====
  const filtrarEventosPorTipo = (tipoId: number): string[] => {
    return eventos
      .filter(evento => evento.id_tipo_data === tipoId)
      .map(evento => evento.data_evento);
  };

  const obterEventosNaoLetivos = (): string[] => filtrarEventosPorTipo(TIPO_EVENTO.NAO_LETIVO);
  const obterFaltas = (): string[] => filtrarEventosPorTipo(TIPO_EVENTO.FALTA);
  const obterEventosLetivos = (): string[] => filtrarEventosPorTipo(TIPO_EVENTO.LETIVO);

  // ===== Funções de API =====
  const buscarEventos = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await api.get('/calendario/', {
        params: { skip: 0, limit: LIMIT_EVENTOS }
      });
      
      if (response.data.success) {
        setEventos(response.data.data);
      }
    } catch (error: unknown) {
      if (error instanceof Error && 'response' in error) {
        const apiError = error as { response?: { status: number } };
        // Tratar 404 como lista vazia (nenhum evento encontrado)
        if (apiError.response?.status === 404) {
          setEventos([]);
          setError('');
          return;
        }
      }
      const mensagem = tratarErroAPI(error, 'Erro ao carregar eventos.');
      setError(mensagem);
    } finally {
      setLoading(false);
    }
  };

  const buscarEventoPorData = async (data: string): Promise<CalendarioEvento | null> => {
    try {
      const response = await api.get(`/calendario/data/${data}`);
      return response.data.data;
    } catch {
      return null;
    }
  };

  const executarOperacaoEvento = async (
    operacao: () => Promise<unknown>,
    mensagemSucesso: string
  ): Promise<boolean> => {
    try {
      setLoading(true);
      setError('');
      await operacao();
      await buscarEventos();
      return true;
    } catch (error: unknown) {
      const mensagem = tratarErroAPI(error, mensagemSucesso);
      setError(mensagem);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const criarEvento = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    
    const sucesso = await executarOperacaoEvento(
      () => api.post('/calendario/', {
        data_evento: eventFormData.data,
        id_tipo_data: parseInt(eventFormData.tipo)
      }),
      'Erro ao criar evento.'
    );

    if (sucesso) fecharModal();
  };

  const atualizarEvento = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (!selectedEvent) return;

    const sucesso = await executarOperacaoEvento(
      () => api.put(`/calendario/${selectedEvent.id_data_evento}`, {
        data_evento: eventFormData.data,
        id_tipo_data: parseInt(eventFormData.tipo)
      }),
      'Erro ao atualizar evento.'
    );

    if (sucesso) fecharModal();
  };

  const deletarEvento = async (id: number): Promise<void> => {
    if (!window.confirm('Tem certeza que deseja excluir este evento?')) {
      return;
    }

    const sucesso = await executarOperacaoEvento(
      () => api.delete(`/calendario/${id}`),
      'Erro ao excluir evento.'
    );

    if (sucesso) {
      fecharModal();
    }
  };

  // ===== Funções de modal =====
  const inicializarFormulario = (data?: string, evento?: CalendarioEvento): void => {
    if (evento) {
      setSelectedEvent(evento);
      setEventFormData({
        data: evento.data_evento,
        tipo: evento.id_tipo_data.toString()
      });
    } else {
      setSelectedEvent(null);
      setEventFormData({ data: data || '', tipo: '' });
    }
  };

  const abrirModal = (): void => {
    inicializarFormulario();
    setIsModalOpen(true);
    setError('');
  };

  const abrirModalEditar = async (data: string): Promise<void> => {
    try {
      setLoading(true);
      const evento = await buscarEventoPorData(data);
      inicializarFormulario(data, evento || undefined);
      setIsModalOpen(true);
    } catch {
      // Sem ação necessária
    } finally {
      setLoading(false);
    }
  };

  const fecharModal = (): void => {
    setIsModalOpen(false);
    setError('');
    setSelectedEvent(null);
    setEventFormData({ data: '', tipo: '' });
  };

  // ===== Renderização =====
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setEventFormData(prev => ({ ...prev, [name]: value }));
  };

  const construirEstiloDia = (
    dataStr: string,
    dataObj: Date,
    naoLetivos: string[],
    faltas: string[],
    letivos: string[]
  ): string => {
    const base = "px-3 py-2 rounded-lg text-white cursor-pointer transition-all duration-200 ";
    const opacidade = ehDataPassada(dataObj) ? " opacity-50 " : "";

    if (naoLetivos.includes(dataStr)) return base + opacidade + " bg-red-600 hover:bg-red-700";
    if (faltas.includes(dataStr)) return base + opacidade + " bg-yellow-600 hover:bg-yellow-700";
    if (letivos.includes(dataStr)) return base + opacidade + " bg-green-600 hover:bg-green-700";
    return base + opacidade + " hover:bg-gray-700 bg-gray-800";
  };

  const gerarDias = (): React.ReactNode[] => {
    const naoLetivos = obterEventosNaoLetivos();
    const faltas = obterFaltas();
    const letivos = obterEventosLetivos();
    
    const dias = [];
    for (let i = 1; i <= diasNoMes; i++) {
      const dataStr = formatarDataISO(i);
      const dataObj = new Date(ano, mes, i);
      const estilo = construirEstiloDia(dataStr, dataObj, naoLetivos, faltas, letivos);

      dias.push(
        <div 
          key={i} 
          className={estilo}
          onClick={() => abrirModalEditar(dataStr)}
          title="Clique para editar ou adicionar evento"
        >
          {i}
        </div>
      );
    }
    return dias;
  };

  const obterLabelTipoEvento = (tipoId: number): string => {
    return TIPOS_EVENTO_LABEL[tipoId as keyof typeof TIPOS_EVENTO_LABEL] || 'Desconhecido';
  };

  const alterarMes = (direcao: number): void => {
    setCurrentDate(new Date(ano, mes + direcao, 1));
  };

  // Buscar eventos quando o componente montar
  useEffect(() => {
    buscarEventos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-[#0d1435] text-white flex flex-col items-center p-6">

      {/* Título */}
      <h1 className="text-4xl font-black uppercase flex items-center gap-2 mb-6">
        CALENDÁRIO <CalendarDots size={40} weight="bold" color="#ffffff" />
      </h1>

      {/* Seleção de Mês */}
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={() => alterarMes(-1)}
          className="hover:bg-gray-700 p-2 rounded-lg transition"
        >
          <CaretLeft size={24} weight="bold" />
        </button>
        <span className="px-6 py-2 bg-indigo-500 rounded-full font-semibold">
          {MESES[mes]} {ano}
        </span>
        <button 
          onClick={() => alterarMes(1)}
          className="hover:bg-gray-700 p-2 rounded-lg transition"
        >
          <CaretRight size={24} weight="bold" />
        </button>
      </div>

      {/* Calendário */}
      <div className="bg-[#2e3348] rounded-xl p-6 shadow-lg w-full max-w-4xl">
        <div className="grid grid-cols-7 text-center font-bold mb-3 text-gray-300">
          <div>D</div>
          <div>S</div>
          <div>T</div>
          <div>Q</div>
          <div>Q</div>
          <div>S</div>
          <div>S</div>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: primeiroDiaSemana }).map((_, i) => (
            <div key={i}></div>
          ))}
          {gerarDias()}
        </div>
      </div>

      {/* Legenda */}
      <div className="flex gap-6 mt-6 flex-wrap justify-center">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-600 rounded-full"></div>
          <p className="text-green-400 font-black">Letivo</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-yellow-600 rounded-full"></div>
          <p className="text-yellow-300 font-black">Falta</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-600 rounded-full"></div>
          <p className="text-red-500 font-black">Não letivo</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gray-800 rounded-full"></div>
          <p className="text-gray-400 font-black">Sem evento</p>
        </div>
      </div>

      {/* Botões Ações */}
      <div className="mt-8 flex gap-6">
        <BordedButton onClick={buscarEventos} disabled={loading}>
          {loading ? 'Carregando...' : 'Atualizar'}
        </BordedButton>
        
        <button 
          className="p-3 rounded-xl hover:bg-white hover:text-black transition disabled:opacity-50"
          onClick={abrirModal}
          disabled={loading}
        >
          <NotePencil size={28} />
        </button>
      </div>

      {/* Lista de Eventos (Opcional) */}
      {eventos.length > 0 && (
        <div className="mt-8 w-full max-w-4xl">
          <h2 className="text-2xl font-bold mb-4">Seus Eventos</h2>
          <div className="grid gap-2">
            {eventos.slice(0, DIAS_EXIBICAO_LISTA).map(evento => (
              <div key={evento.id_data_evento} className="bg-[#2e3348] p-4 rounded-lg flex justify-between items-center">
                <div>
                  <span className="font-bold">
                    {formatarDataBR(evento.data_evento)}
                  </span>
                  <span className="ml-4 capitalize">
                    {obterLabelTipoEvento(evento.id_tipo_data)}
                  </span>
                </div>
                <button
                  onClick={() => deletarEvento(evento.id_data_evento)}
                  className="text-red-400 hover:text-red-300 transition"
                  disabled={loading}
                >
                  <X size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <EmptySection/>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#2e3348] rounded-xl p-6 w-full max-w-md mx-4">
            {/* Cabeçalho do Modal */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {selectedEvent ? 'Editar Evento' : 'Adicionar Evento'}
              </h2>
              <button 
                onClick={fecharModal}
                className="text-gray-400 hover:text-white transition"
                disabled={loading}
              >
                <X size={24} />
              </button>
            </div>

            {/* Mensagem de erro */}
            {error && (
              <div className="mb-4 p-3 bg-red-600 rounded-lg text-white text-sm">
                {error}
              </div>
            )}

            {/* Formulário */}
            <form onSubmit={selectedEvent ? atualizarEvento : criarEvento} className="space-y-4">
              {/* Campo de Data */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Data
                </label>
                <input
                  type="date"
                  name="data"
                  value={eventFormData.data}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-[#0d1435] border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                  disabled={loading}
                />
                <p className="text-xs text-gray-400 mt-1">Formato: AAAA-MM-DD</p>
              </div>

              {/* Campo Dropdown */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Tipo de Dia
                </label>
                <select
                  name="tipo"
                  value={eventFormData.tipo}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-[#0d1435] border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                  disabled={loading}
                >
                  <option value="">Selecione um tipo</option>
                  <option value="1">Falta</option>
                  <option value="2">Não Letivo</option>
                  <option value="3">Letivo</option>
                </select>
              </div>

              {/* Botões do Formulário */}
              <div className="flex gap-3 pt-4">
                {selectedEvent && (
                  <button
                    type="button"
                    onClick={() => deletarEvento(selectedEvent.id_data_evento)}
                    disabled={loading}
                    className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition font-medium disabled:opacity-50"
                  >
                    {loading ? 'Excluindo...' : 'Excluir'}
                  </button>
                )}
                <button
                  type="button"
                  onClick={fecharModal}
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition font-medium disabled:opacity-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition font-medium disabled:opacity-50"
                >
                  {loading ? 'Salvando...' : selectedEvent ? 'Atualizar' : 'Adicionar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}