import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import freqIcon from '../assets/img/freq-icon.png';
import matIcon from '../assets/img/materiaIcon.png';
import CirculoProgresso from '../components/circuloProgresso';
import EmptySection from '../components/EmptySection.tsx';
import api from '../api/axios.ts';

// Constantes
const LIMITE_EVENTOS = 1000;
const NOME_FREQUENCIA_GLOBAL = 'Global';
const FREQUENCIA_MINIMA = 75;
const TIPO_FALTA = 1;
const TIPO_LETIVO = 3;

// Interfaces
interface CalendarioEvento {
  id_data_evento: number;
  ra: string;
  data_evento: string;
  id_tipo_data: number;
}

interface FrequenciaStats {
  diasLetivos: number;
  faltas: number;
  presencas: number;
  porcentagem: number;
}

export default function Frequencia() {
  const [frequenciaStats, setFrequenciaStats] = useState<FrequenciaStats>({
    diasLetivos: 0,
    faltas: 0,
    presencas: 0,
    porcentagem: 0
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  // ===== Funções auxiliares de tratamento de erro =====
  const mapeiarErroFrequencia = (status: number): string => {
    const erroMap: Record<number, string> = {
      401: 'Sessão expirada. Faça login novamente.',
      403: 'Você não tem permissão para acessar frequência',
      404: 'Nenhum evento encontrado',
      500: 'Erro no servidor'
    };
    return erroMap[status] || 'Erro ao carregar frequência. Tente novamente.';
  };

  const tratarErroAPI = (error: unknown, defaultMsg: string): string => {
    if (error instanceof Error && 'response' in error) {
      const apiError = error as { response?: { status: number } };
      if (apiError.response?.status === 401) {
        navigate('/login');
      }
      return mapeiarErroFrequencia(apiError.response?.status || 500) || defaultMsg;
    }
    return 'Erro de conexão. Verifique sua internet.';
  };

  const calcularFrequencia = (eventos: CalendarioEvento[]): FrequenciaStats => {
    if (eventos.length === 0) {
      return { diasLetivos: 0, faltas: 0, presencas: 0, porcentagem: 0 };
    }

    const diasLetivos = eventos.filter(
      e => e.id_tipo_data === TIPO_LETIVO
    ).length;

    const faltas = eventos.filter(
      e => e.id_tipo_data === TIPO_FALTA
    ).length;

    const presencas = diasLetivos - faltas;

    const porcentagem = diasLetivos > 0 
      ? Math.round((presencas / diasLetivos) * 100)
      : 0;

    return {
      diasLetivos,
      faltas,
      presencas,
      porcentagem
    };
  };

  const obterCorFrequencia = (porcentagem: number): string => {
    if (porcentagem >= FREQUENCIA_MINIMA) return 'text-green-400';
    if (porcentagem >= 50) return 'text-yellow-400';
    return 'text-red-400';
  };

  const buscarFrequencia = async (): Promise<void> => {
    try {
      const response = await api.get('/calendario/', {
        params: { skip: 0, limit: LIMITE_EVENTOS }
      });

      if (response.data.success) {
        const eventos: CalendarioEvento[] = response.data.data;
        const stats = calcularFrequencia(eventos);
        setFrequenciaStats(stats);
        setError('');
      }
    } catch (error: unknown) {
      if (error instanceof Error && 'response' in error) {
        const apiError = error as { response?: { status: number } };
        if (apiError.response?.status === 404) {
          setFrequenciaStats({
            diasLetivos: 0,
            faltas: 0,
            presencas: 0,
            porcentagem: 0
          });
          setError('');
          return;
        }
      }
      const mensagem = tratarErroAPI(error, 'Erro ao carregar frequência.');
      setError(mensagem);
    }
  };

  useEffect(() => {
    buscarFrequencia();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="flex flex-col items-center px-4 pb-10 min-h-screen">
      <div className="flex flex-row flex-wrap gap-x-2 p-4 w-full my-10 items-center justify-center text-center">
        <h1 className="flex text-white font-extrabold items-end justify-center text-5xl">
          Frequência
        </h1>
        <img className="w-10 min-h-10 h-auto" src={freqIcon} alt="Frequência" />
      </div>

      <div className="flex flex-row justify-self-center mt-0 mb-10 items-center justify-center m-0 min-w-1/6 min-h-12 h-auto py-2 rounded-3xl bg-(--c2)">
        <p className="text-xl text-white center">
          {NOME_FREQUENCIA_GLOBAL}
        </p>
      </div>

      <CirculoProgresso
        className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 "
        porcentagem={frequenciaStats.porcentagem}
      />

      {frequenciaStats.diasLetivos > 0 ? (
        <div className="my-20 flex flex-col gap-3 w-full max-w-full sm:max-w-[90%] md:max-w-2/3 lg:max-w-2/5 mx-auto">
          <div className="bg-(--c3) flex flex-row p-3 w-full min-h-[72px] h-auto rounded-xl gap-3 items-center flex-nowrap">
            <img
              className="w-10 min-h-10 h-auto"
              src={matIcon}
              alt="Dias Letivos"
            />
            <ul className="text-white flex-1">
              <li className="text-xl font-bold">Dias Letivos</li>
              <li className="text-green-400">
                {frequenciaStats.diasLetivos}
              </li>
            </ul>
          </div>

          <div className="bg-(--c3) flex flex-row p-3 w-full min-h-[72px] h-auto rounded-xl gap-3 items-center flex-nowrap">
            <img
              className="w-10 min-h-10 h-auto"
              src={matIcon}
              alt="Presenças"
            />
            <ul className="text-white flex-1">
              <li className="text-xl font-bold">Presenças</li>
              <li className="text-green-400">
                {frequenciaStats.presencas}
              </li>
            </ul>
          </div>

          <div className="bg-(--c3) flex flex-row p-3 w-full min-h-[72px] h-auto rounded-xl gap-3 items-center flex-nowrap">
            <img
              className="w-10 min-h-10 h-auto"
              src={matIcon}
              alt="Faltas"
            />
            <ul className="text-white flex-1">
              <li className="text-xl font-bold">Faltas</li>
              <li className={obterCorFrequencia(frequenciaStats.porcentagem)}>
                {frequenciaStats.faltas}
              </li>
            </ul>
          </div>

          <div className="bg-(--c3) flex flex-row p-3 w-full min-h-[72px] h-auto rounded-xl gap-3 items-center flex-nowrap">
            <img
              className="w-10 min-h-10 h-auto"
              src={matIcon}
              alt="Frequência"
            />
            <ul className="text-white flex-1">
              <li className="text-xl font-bold">Frequência</li>
              <li className={obterCorFrequencia(frequenciaStats.porcentagem)}>
                {frequenciaStats.porcentagem}%
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="my-20 text-center text-gray-400">
          <p>Nenhum dado de frequência disponível</p>
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 bg-red-600 rounded-lg text-white text-sm w-full max-w-2xl">
          {error}
        </div>
      )}

      <EmptySection />
    </section>
  );
}