import '../assets/style.css'
import BordedButton from '../components/BordedButton.tsx';
import { ClockCountdownIcon } from '@phosphor-icons/react';
import { CalendarClock } from 'lucide-react';
import { ChevronUp } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import { NotePencilIcon } from '@phosphor-icons/react';
import { useState } from 'react';
import EmptySection from '../components/EmptySection.tsx';

export default function Horario(){
    
    const [aberto, setAberto] = useState<number | null >(null);
    
    function toggleDia(id: number){
        setAberto(aberto === id ? null : id);
    };
    
    const dias = [
        "Segunda - Feira",
        "Terça - Feira",
        "Quarta - Feira",
        "Quinta - Feira",
        "Sexta - Feira",
        "Sábado"
    ];
    
    return(
        <div className='flex flex-col p-7 justify-center px-6'>
            
            {/* Título */}
            <div className='flex items-center gap-2 px-10'>
                <p className='text-white font-black text-4xl uppercase'>Horários</p> 
                <ClockCountdownIcon size={45} color="#fff"/>
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
                                <CalendarClock size={32} color="#fff"/>
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
                                        className="w-full p-2 rounded-lg bg-[#141640] text-white outline-none"
                                    />
                                </div>

                                <div className="flex flex-col gap-1">
                                    <p className='text-white'>2° Aula:</p>
                                    <input 
                                        type="text"
                                        className="w-full p-2 rounded-lg bg-[#141640] text-white outline-none"
                                    />
                                </div>

                                <div className="flex flex-col gap-1">
                                    <p className='text-white'>3° Aula:</p>
                                    <input 
                                        type="text"
                                        className="w-full p-2 rounded-lg bg-[#141640] text-white outline-none"
                                    />
                                </div>

                                <div className="flex flex-col gap-1">
                                    <p className='text-white'>4° Aula:</p>
                                    <input 
                                        type="text"
                                        className="w-full p-2 rounded-lg bg-[#141640] text-white outline-none"
                                    />
                                </div>

                            </div>
                        )}

                    </div>
                </div>
            ))}

            {/* Rodapé botões */}
            <div className='flex items-center justify-between px-10 p-6'> 
                <button className='cursor-pointer'>
                    <NotePencilIcon size={40} color="#fff"/>
                </button>
                <BordedButton>Gravar</BordedButton>
            </div> 
            <EmptySection/>
        </div>
    );
}