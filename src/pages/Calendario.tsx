import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { CalendarDots, NotePencil, CaretLeft, CaretRight, X } from "@phosphor-icons/react";
import BordedButton from "../components/BordedButton";
import EmptySection from "../components/EmptySection.tsx";
//import { useAuth } from '../context/AuthContext';
import api from "../api/axios.ts";

// Interface para os eventos do calendário
interface CalendarioEvento {
  id_data_evento: number;
  ra: string;
  data_evento: string;
  id_tipo_data: number;
}

export default function Calendario() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventos, setEventos] = useState<CalendarioEvento[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<CalendarioEvento | null>(null);
  //const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    data: '',
    tipo: ''
  });

  const meses = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  const ano = currentDate.getFullYear();
  const mes = currentDate.getMonth();

  const diasNoMes = new Date(ano, mes + 1, 0).getDate();
  const primeiroDiaSemana = new Date(ano, mes, 1).getDay();

  // Função para buscar eventos do calendário
  const buscarEventos = async () => {
    try {
      setLoading(true);
      const response = await api.get('/calendario/', {
        params: {
          skip: 0,
          limit: 1000
        }
      });
      
      if (response.data.success) {
        setEventos(response.data.data);
      }
    } catch (error: any) {
      console.error('Erro ao buscar eventos:', error);
      if (error.response?.status === 401) {
        setError('Sessão expirada. Faça login novamente.');
        navigate('/login');
      } else {
        setError('Erro ao carregar eventos.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Função para buscar evento por data
  const buscarEventoPorData = async (data: string) => {
    try {
      const response = await api.get(`/calendario/data/${data}`);
      return response.data.data;
    } catch (error) {
      return null;
    }
  };

  // Função para criar novo evento
  const criarEvento = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      setLoading(true);
      
      const eventoData = {
        data_evento: formData.data,
        id_tipo_data: parseInt(formData.tipo)
      };

      const response = await api.post('/calendario/', eventoData);
      
      if (response.status === 201) {
        await buscarEventos();
        fecharModal();
      }
      
    } catch (error: any) {
      console.error('Erro ao criar evento:', error);
      
      if (error.response) {
        switch (error.response.status) {
          case 400:
            setError('Tipo de data inválido');
            break;
          case 409:
            setError('Já existe um evento para esta data');
            break;
          case 401:
            setError('Token inválido ou expirado');
            navigate('/login');
            break;
          default:
            setError('Erro ao criar evento. Tente novamente.');
        }
      } else {
        setError('Erro de conexão. Verifique sua internet.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Função para atualizar evento
  const atualizarEvento = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent) return;
    
    setError('');
    
    try {
      setLoading(true);
      
      const eventoData = {
        data_evento: formData.data,
        id_tipo_data: parseInt(formData.tipo)
      };

      const response = await api.put(`/calendario/${selectedEvent.id_data_evento}`, eventoData);
      
      if (response.status === 200) {
        await buscarEventos();
        fecharModal();
      }
      
    } catch (error: any) {
      console.error('Erro ao atualizar evento:', error);
      
      if (error.response) {
        switch (error.response.status) {
          case 400:
            setError('Tipo de data inválido');
            break;
          case 403:
            setError('Você não tem permissão para editar este evento');
            break;
          case 409:
            setError('Já existe um evento para esta data');
            break;
          case 401:
            setError('Token inválido ou expirado');
            navigate('/login');
            break;
          default:
            setError('Erro ao atualizar evento. Tente novamente.');
        }
      } else {
        setError('Erro de conexão. Verifique sua internet.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Função para deletar evento
  const deletarEvento = async (id: number) => {
    if (!window.confirm('Tem certeza que deseja excluir este evento?')) {
      return;
    }
    
    try {
      setLoading(true);
      const response = await api.delete(`/calendario/${id}`);
      
      if (response.status === 200) {
        await buscarEventos();
      }
      
    } catch (error: any) {
      console.error('Erro ao deletar evento:', error);
      
      if (error.response) {
        switch (error.response.status) {
          case 403:
            setError('Você não tem permissão para excluir este evento');
            break;
          case 404:
            setError('Evento não encontrado');
            break;
          case 401:
            setError('Token inválido ou expirado');
            navigate('/login');
            break;
          default:
            setError('Erro ao excluir evento. Tente novamente.');
        }
      } else {
        setError('Erro de conexão. Verifique sua internet.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Função para converter eventos para os arrays de exibição
  const getDiasNaoLetivos = () => {
    return eventos
      .filter(evento => evento.id_tipo_data === 2)
      .map(evento => evento.data_evento);
  };

  const getFaltas = () => {
    return eventos
      .filter(evento => evento.id_tipo_data === 1)
      .map(evento => evento.data_evento);
  };

  const getLetivos = () => {
    return eventos
      .filter(evento => evento.id_tipo_data === 3)
      .map(evento => evento.data_evento);
  };

  const alterarMes = (direcao: number) => {
    setCurrentDate(new Date(ano, mes + direcao, 1));
  };

  // Funções para o modal
  const abrirModal = () => {
    setSelectedEvent(null);
    setFormData({
      data: '',
      tipo: ''
    });
    setIsModalOpen(true);
    setError('');
  };

  const abrirModalEditar = async (data: string) => {
    try {
      setLoading(true);
      const evento = await buscarEventoPorData(data);
      
      if (evento) {
        setSelectedEvent(evento);
        setFormData({
          data: evento.data_evento,
          tipo: evento.id_tipo_data.toString()
        });
        setIsModalOpen(true);
      } else {
        // Se não existe evento, abrir modal para criar
        setFormData({
          data: data,
          tipo: ''
        });
        setSelectedEvent(null);
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error('Erro ao buscar evento:', error);
    } finally {
      setLoading(false);
    }
  };

  const fecharModal = () => {
    setIsModalOpen(false);
    setError('');
    setSelectedEvent(null);
    setFormData({
      data: '',
      tipo: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const gerarDias = () => {
    const naoLetivos = getDiasNaoLetivos();
    const faltas = getFaltas();
    const letivos = getLetivos();
    
    const dias = [];
    for (let i = 1; i <= diasNoMes; i++) {
      const dataStr = `${ano}-${String(mes + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
      const dataObj = new Date(ano, mes, i);
      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0);

      let estilo = "px-3 py-2 rounded-lg text-white cursor-pointer transition-all duration-200 ";

      if (dataObj < hoje) {
        estilo += " opacity-50 ";
      }

      if (naoLetivos.includes(dataStr)) {
        estilo += " bg-red-600 hover:bg-red-700";
      } else if (faltas.includes(dataStr)) {
        estilo += " bg-yellow-600 hover:bg-yellow-700";
      } else if (letivos.includes(dataStr)) {
        estilo += " bg-green-600 hover:bg-green-700";
      } else {
        estilo += " hover:bg-gray-700 bg-gray-800";
      }

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

  // Buscar eventos quando o componente montar
  useEffect(() => {
    buscarEventos();
  }, [currentDate]); // Recarregar eventos quando mudar o mês

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
          {meses[mes]} {ano}
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
            {eventos.slice(0, 10).map(evento => (
              <div key={evento.id_data_evento} className="bg-[#2e3348] p-4 rounded-lg flex justify-between items-center">
                <div>
                  <span className="font-bold">
                    {new Date(evento.data_evento).toLocaleDateString('pt-BR')}
                  </span>
                  <span className="ml-4 capitalize">
                    {evento.id_tipo_data === 1 ? 'Falta' : 
                     evento.id_tipo_data === 2 ? 'Não Letivo' : 'Letivo'}
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
                  value={formData.data}
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
                  value={formData.tipo}
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