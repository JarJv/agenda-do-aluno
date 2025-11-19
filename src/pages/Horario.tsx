import '../assets/style.css'
import BordedButton from '../components/BordedButton.tsx';
import { ClockCountdownIcon } from '@phosphor-icons/react';
import { CalendarClock } from 'lucide-react';
import { NotePencilIcon } from '@phosphor-icons/react';
import { useState } from 'react';


export default function Horario(){

    const [aberto, setAberto] = useState(null);

    function toggleDia(id){
        setAberto(aberto === id ? null : id);
    }

    const dias = [
        "Segunda - Feira",
        "Terça - Feira",
        "Quarta - Feira",
        "Quinta - Feira",
        "Sexta - Feira",
        "Sábado"
    ];

    return(
        <div className='p-7 px-10'>
            <div className='flex items-center gap-2 px-10'>
                <p className='text-white font-black text-4xl uppercase'>Horários</p> 
                <ClockCountdownIcon size={45} color="#fff"/>
            </div>

            <p className='gap-10'> .</p>
            {dias.map((dia, index) => (
                <div 
                  key={index} 
                  className='flex-column items-center px-10 p-1 font-black' 
                  style={{ width: "95%" }}
                >
                    {/* Cabeçalho clicável */}
                    <div
                        onClick={() => toggleDia(index)}
                        style={{
                            background: "#323558",
                            cursor: "pointer",
                            borderRadius: "8px",
                        }}>
                        <p className='flex items-center gap-2 p-5 text-white r-10'>
                            <CalendarClock size={32} color="#fff"/>
                            {aberto === index ? `${dia} ▲` : `${dia} ▼`}
                        </p>
                    </div>

                    {/* Conteúdo expandido */}
                    {aberto === index && (
                        <div
                            style={{
                                marginTop: "10px",
                                padding: "15px",
                                background: "#323558",
                                borderRadius: "8px",
                                display: "flex",
                                flexDirection: "column",
                                gap: "10px",
                            }}
                        >
                            <p className='text-white'>1° Aula:</p>  
                            <input type="text" placeholder="Digite Aqui" />

                            <p className='text-white'>2° Aula:</p>
                            <input type="text" placeholder="Digite Aqui" />

                            <p className='text-white'>3° Aula:</p>
                            <input type="text" placeholder="Digite Aqui" />

                            <p className='text-white'>4° Aula:</p>
                            <input type="text" placeholder="Digite Aqui" />
                        </div>
                    )}
                </div>
            ))}

            <div className='flex items-center gap-60 px-10 p-6'> 
                <BordedButton>Gravar</BordedButton>
                <button><NotePencilIcon size={40} color="#fff"/></button>
            </div>  
        </div>
    );
}