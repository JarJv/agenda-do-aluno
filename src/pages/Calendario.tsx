import { useState } from "react";
import { CalendarDots, NotePencil, CaretLeft, CaretRight } from "@phosphor-icons/react";
import BordedButton from "../components/BordedButton";

export default function Calendario() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const naoLetivos = ["2025-03-10", "2025-03-15"];
  const faltas = ["2025-03-07"];

  const meses = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  const ano = currentDate.getFullYear();
  const mes = currentDate.getMonth();

  const diasNoMes = new Date(ano, mes + 1, 0).getDate();
  const primeiroDiaSemana = new Date(ano, mes, 1).getDay();

  const alterarMes = (direcao: number) => {
    setCurrentDate(new Date(ano, mes + direcao, 1));
  };

  const gerarDias = () => {
    const dias = [];
    for (let i = 1; i <= diasNoMes; i++) {
      const dataStr = `${ano}-${String(mes + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`;

      let estilo = "px-3 py-2 rounded-lg text-white";

      if (naoLetivos.includes(dataStr)) estilo += " bg-red-600";
      else if (faltas.includes(dataStr)) estilo += " border-2 border-yellow-300";
      else estilo += " hover:bg-gray-700";

      dias.push(
        <div key={i} className={estilo}>
          {i}
        </div>
      );
    }
    return dias;
  };

  return (
    <div className="min-h-screen bg-[#0d1435] text-white flex flex-col items-center p-6">

      {/* Título */}
      <h1 className="text-4xl font-black uppercase flex items-center gap-2 mb-6">
        CALENDÁRIO <CalendarDots size={40} weight="bold" color="#ffffff" />
      </h1>

      {/* Seleção de Mês */}
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => alterarMes(-1)}>
          <CaretLeft size={24} weight="bold" />
        </button>
        <span className="px-6 py-2 bg-indigo-500 rounded-full font-semibold">
          {meses[mes]} {ano}
        </span>
        <button onClick={() => alterarMes(1)}>
          <CaretRight size={24} weight="bold" />
        </button>
      </div>

      {/* Calendário */}
      <div className="bg-[#2e3348] rounded-xl p-6 shadow-lg">
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
      <div className="flex gap-6 mt-6">
        <p className="text-green-400 font-black">● Letivo</p>
        <p className="text-yellow-300 font-black">● Falta</p>
        <p className="text-red-500 font-black">● Não letivo</p>
      </div>

      {/* Botões Ações */}
      <div className="mt-8 flex gap-6">
         <BordedButton>Gravar</BordedButton>
          
        
        <button className="p-3 rounded-xl hover:bg-white hover:text-black transition">
          <NotePencil size={28} />
        </button>
      </div>
    </div>
  );
}
