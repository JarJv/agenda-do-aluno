import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../assets/style.css';
import BlueFilledButtom from '../components/BlueFilledButton';
import BordedButton from '../components/BordedButton.tsx';
import { CalendarDots, NotePencil } from "@phosphor-icons/react";

export default function Calendario() {
  const [date, setDate] = useState(new Date());

  const meses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const ano = date.getFullYear();
  const mesAtual = meses[date.getMonth()];



  // Exemplo de datas especiais
  const naoLetivos = ['2025-03-10', '2025-03-15'];
  const faltas = ['2025-03-05'];

  const tileClassName = ({ date }: { date: Date }) => {
    const dataString = date.toISOString().split('T')[0];
    if (naoLetivos.includes(dataString)) return 'bg-red-600 text-white rounded-xl';
    if (faltas.includes(dataString)) return 'border-2 border-yellow-300 text-white rounded-xl';
    return '';
  };

  return (
    <div className="p-6 text-center">
        <h1 className='text-white font-bold'>CALENDÁRIO <CalendarDots size={32} weight="bold" color="#ffffff" /></h1>

      <div className="mb-4">
        <BlueFilledButtom>{mesAtual}</BlueFilledButtom>
      </div>

     

      {/* Calendário */}
      <div className="flex flex-col items-center">
        <div className="bg-gray-800 text-white rounded-xl shadow-lg p-4">
          <Calendar
            value={date}
            calendarType="gregory"
            locale="pt-BR"
            tileClassName={tileClassName}
            className="react-calendar bg-gray-800 text-white border-20 rounded-xl [&_*]:text-black"
            activeStartDate={date}
            view="month"  
            minDetail="month" 
          />
        </div>
      </div>

      <div id="legenda"className="mt-6 flex justify-center gap-6">
        <p className="text-green-400 text-lg font-bold">Letivo</p>
        <p className="text-yellow-300 text-lg font-bold">Falta</p>
        <p className="text-red-600 text-lg font-bold">Não letivo</p>
      </div>
      
      <div> 
        <BordedButton>Gravar</BordedButton>
        <button><NotePencil/></button>
      </div>   
    </div>
  );
}
