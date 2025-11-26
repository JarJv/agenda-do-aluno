import '../assets/style.css'
import { ClockCountdownIcon } from '@phosphor-icons/react';
import { CalendarClock } from 'lucide-react';
import { ChevronUp } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import { NotePencilIcon } from '@phosphor-icons/react';
import { CheckIcon } from '@phosphor-icons/react';
import { useState, useEffect } from 'react';
import EmptySection from '../components/EmptySection.tsx';
import Toast from '../components/Toast.tsx';
import api from '../api/axios';

interface Horario {
    id_horario: number;
    ra: string;
    dia_semana: number;
    numero_aula: number;
    disciplina: string;
}

export default function Horario() {

    const [aberto, setAberto] = useState<number | null>(null);
    const [horarios, setHorarios] = useState<Horario[]>([]);
    const [disciplinas, setDisciplinas] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(true);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [toast, setToast] = useState<{ type: 'success' | 'error' | 'loading'; message: string; visible: boolean } | null>(null);
    const [saving, setSaving] = useState(false);

    function toggleDia(id: number) {
        setAberto(aberto === id ? null : id);
    };

    function toggleModoEdicao() {
        setModoEdicao(!modoEdicao);
    };

    const dias = [
        "Segunda - Feira",
        "Terça - Feira",
        "Quarta - Feira",
        "Quinta - Feira",
        "Sexta - Feira",
        "Sábado"
    ];

    useEffect(() => {
        const carregarHorarios = async () => {
            try {
                const response = await api.get('/horario');
                const horariosData: Horario[] = response.data.data;
                setHorarios(horariosData);

                const novasDisciplinas: { [key: string]: string } = {};
                horariosData.forEach(h => {
                    const key = `${h.dia_semana - 1}-${h.numero_aula}`;
                    novasDisciplinas[key] = h.disciplina || '';
                });
                setDisciplinas(novasDisciplinas);
            } catch (error) {
                console.error('Erro ao carregar horários:', error);
            } finally {
                setLoading(false);
            }
        };

        carregarHorarios();
    }, []);

    const atualizarDisciplina = (diaIndex: number, aulaNum: number, valor: string) => {
        const key = `${diaIndex}-${aulaNum}`;
        setDisciplinas(prev => ({
            ...prev,
            [key]: valor
        }));
    };

    const gravarHorarios = async () => {
        setSaving(true);
        setToast({ type: 'loading', message: 'Salvando horários...', visible: true });

        try {
            for (let diaIndex = 0; diaIndex < 6; diaIndex++) {
                for (let aulaNum = 1; aulaNum <= 4; aulaNum++) {
                    const key = `${diaIndex}-${aulaNum}`;
                    const disciplina = disciplinas[key] || '';

                    const horarioExistente = horarios.find(h =>
                        h.dia_semana === diaIndex + 1 && h.numero_aula === aulaNum
                    );

                    if (disciplina.trim()) {
                        if (horarioExistente) {
                            await api.put(`/horario/${horarioExistente.id_horario}`, {
                                disciplina: disciplina.trim()
                            });
                        } else {
                            await api.post('/horario', {
                                dia_semana: diaIndex + 1,
                                numero_aula: aulaNum,
                                disciplina: disciplina.trim()
                            });
                        }
                    } else if (horarioExistente) {
                        await api.delete(`/horario/${horarioExistente.id_horario}`);
                    }
                }
            }

            const response = await api.get('/horario');
            const horariosData: Horario[] = response.data.data;
            setHorarios(horariosData);
            setToast({ type: 'success', message: 'Horários salvos com sucesso!', visible: true });

        } catch (error) {
            console.error('Erro ao salvar horários:', error);
            setToast({ type: 'error', message: 'Erro ao salvar horários', visible: true });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className='flex flex-col p-7 justify-center px-6'>
                {/* Título */}
                <div className='flex items-center gap-2 px-10'>
                    <p className='text-white font-black text-4xl uppercase'>Horários</p>
                    <ClockCountdownIcon size={45} color="#fff" />
                </div>

                <div className='my-4'></div>

                {/* Dias Skeleton */}
                {Array.from({ length: 6 }).map((_, index) => (
                    <div
                        key={index}
                        className="mb-3 font-black w-full box-border px-15"
                    >
                        <div className="bg-[#323558] rounded-lg overflow-hidden">
                            <div className="p-5 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className='h-8 w-8 bg-[#141640] rounded animate-pulse'></div>
                                    <div className='h-6 w-24 bg-[#141640] rounded animate-pulse'></div>
                                </div>
                                <div className='h-6 w-6 bg-[#141640] rounded animate-pulse'></div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Rodapé Skeleton */}
                <div className='flex items-center justify-between px-10 p-6'>
                    <div className='h-10 w-10 bg-[#323558] rounded animate-pulse'></div>
                    <div className='h-8 w-20 bg-[#323558] rounded-full animate-pulse'></div>
                </div>
            </div>
        );
    }

    return (
        <div className='flex flex-col p-7 justify-center px-6'>

            {/* Título */}
            <div className='flex items-center gap-2 px-10'>
                <p className='text-white font-black text-4xl uppercase'>Horários</p>
                <ClockCountdownIcon size={45} color="#fff" />
            </div>

            <div className='my-4'></div>

            {dias.map((dia, index) => (
                <div
                    key={index}
                    className="mb-3 font-black w-full box-border px-15"
                >
                    {/* AGRUPAMENTO: cabeçalho + conteúdo expandido */}
                    <div className="bg-[#323558] rounded-lg overflow-hidden transition-all">

                        {/* Cabeçalho clicável */}
                        <div
                            onClick={() => toggleDia(index)}
                            className="cursor-pointer p-5 flex items-center justify-between text-white"
                        >
                            {/* Esquerda: ícone + dia */}
                            <div className="flex items-center gap-2">
                                <CalendarClock size={32} color="#fff" />
                                <span>{dia}</span>
                            </div>

                            {/* Direita: seta */}
                            <span>
                                {aberto === index ? <ChevronUp></ChevronUp> : <ChevronDown></ChevronDown>}
                            </span>
                        </div>

                        {/* Pop-up colado ao cabeçalho */}
                        {aberto === index && (
                            <div className="px-7 py-2 pb-5 flex flex-col gap-5">

                                <div className="flex flex-col gap-1">
                                    <p className='text-white'>1° Aula:</p>
                                    <input
                                        type="text"
                                        value={disciplinas[`${index}-1`] || ''}
                                        onChange={(e) => atualizarDisciplina(index, 1, e.target.value)}
                                        disabled={!modoEdicao}
                                        className="w-full p-2 rounded-lg bg-[#141640] text-white outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                                    />
                                </div>

                                <div className="flex flex-col gap-1">
                                    <p className='text-white'>2° Aula:</p>
                                    <input
                                        type="text"
                                        value={disciplinas[`${index}-2`] || ''}
                                        onChange={(e) => atualizarDisciplina(index, 2, e.target.value)}
                                        disabled={!modoEdicao}
                                        className="w-full p-2 rounded-lg bg-[#141640] text-white outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                                    />
                                </div>

                                <div className="flex flex-col gap-1">
                                    <p className='text-white'>3° Aula:</p>
                                    <input
                                        type="text"
                                        value={disciplinas[`${index}-3`] || ''}
                                        onChange={(e) => atualizarDisciplina(index, 3, e.target.value)}
                                        disabled={!modoEdicao}
                                        className="w-full p-2 rounded-lg bg-[#141640] text-white outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                                    />
                                </div>

                                <div className="flex flex-col gap-1">
                                    <p className='text-white'>4° Aula:</p>
                                    <input
                                        type="text"
                                        value={disciplinas[`${index}-4`] || ''}
                                        onChange={(e) => atualizarDisciplina(index, 4, e.target.value)}
                                        disabled={!modoEdicao}
                                        className="w-full p-2 rounded-lg bg-[#141640] text-white outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                                    />
                                </div>

                            </div>
                        )}

                    </div>
                </div>
            ))}

            {/* Rodapé botões */}
            <div className='flex items-center justify-between px-10 p-6'>
                <button 
                    onClick={toggleModoEdicao}
                    className='cursor-pointer'
                >
                    {modoEdicao ? <CheckIcon size={40} color="#fff" /> : <NotePencilIcon size={40} color="#fff" />}
                </button>
                <button
                    onClick={gravarHorarios}
                    disabled={saving}
                    className='border-2 border-white rounded-full px-8 py-1.5 text-white font-bold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
                >
                    {saving ? 'Salvando...' : 'Gravar'}
                </button>
            </div>
            <EmptySection />
            {toast && (
                <Toast
                    type={toast.type}
                    message={toast.message}
                    isVisible={toast.visible}
                    onClose={() => setToast(null)}
                />
            )}
        </div>
    );
}