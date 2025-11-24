import React, { useState, useRef } from "react";
import { Search } from "lucide-react";
import "../assets/style.css";
import LosaP from "../assets/losaProfessores.png"

type Professor = {
  nome: string;
  myimg: string;
  email: string;
  disciplinas: string[];
};

const professores: Professor[] = [
  {
    nome: "Patrick Estrela",
    myimg:
      "https://i.pinimg.com/236x/79/7b/ef/797befcec4f2ad6bc26365c6adc33b62.jpg",
    email: "patrick@fatec.sp.gov.br",
    disciplinas: ["Álgebra Linear", "Cálculo 3"],
  },
  {
    nome: "Hornet",
    myimg:
      "https://preview.redd.it/can-someone-please-explain-the-hornet-shoes-meme-v0-73tk3o6bgjwf1.jpeg?width=640&crop=smart&auto=webp&s=590cdd4f03d288695a881f6514b618bc1b148c40",
    email: "guarana@fatec.sp.gov.br",
    disciplinas: ["Álgebra Linear", "Cálculo 3"],
  },
  {
    nome: "Hornet",
    myimg:
      "https://preview.redd.it/can-someone-please-explain-the-hornet-shoes-meme-v0-73tk3o6bgjwf1.jpeg?width=640&crop=smart&auto=webp&s=590cdd4f03d288695a881f6514b618bc1b148c40",
    email: "guarana@fatec.sp.gov.br",
    disciplinas: ["Álgebra Linear", "Cálculo 3"],
  },
];

function Professores() {
  const [pesquisa, setPesquisa] = useState("");
  const [page, setPage] = useState(0);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const filtrados = professores.filter((p) =>
    p.nome.toLowerCase().includes(pesquisa.toLowerCase())
  );

  const ITEMS_PER_PAGE = 2;
  const totalPages = Math.ceil(filtrados.length / ITEMS_PER_PAGE);

  const pages = Array.from({ length: totalPages }, (_, i) =>
    filtrados.slice(i * ITEMS_PER_PAGE, i * ITEMS_PER_PAGE + ITEMS_PER_PAGE)
  );

  // Swipe
  const handleTouchStart = (e: React.TouchEvent) =>
    (touchStartX.current = e.touches[0].clientX);
  const handleTouchMove = (e: React.TouchEvent) =>
    (touchEndX.current = e.touches[0].clientX);
  const handleTouchEnd = () => {
    const dist = touchStartX.current - touchEndX.current;

    if (Math.abs(dist) < 50) return;
    if (dist > 50 && page < totalPages - 1) setPage(page + 1);
    if (dist < -50 && page > 0) setPage(page - 1);
  };

  return (
    <>
      <section className="flex justify-center items-center py-8 px-5 flex-col mt-6 mb-24">
        {/* TÍTULO */}
        <div className="w-full max-w-xl flex items-center gap-3 mb-6">
          <h1 className="text-4xl text-white font-extrabold">PROFESSORES</h1>
          <img style={{maxWidth:'10%'}} src={LosaP}></img>
        </div>

        {/* BUSCA */}
        <div className="relative w-full max-w-xl mb-6">
          <Search
            size={20}
            className="absolute inset-y-0 left-3 my-auto text-white pointer-events-none"
          />
          <input
            type="text"
            placeholder="Pesquisar..."
            value={pesquisa}
            onChange={(e) => {
              setPesquisa(e.target.value);
              setPage(0);
            }}
            className="bg-[#323558] p-4 pl-11 w-full rounded-xl text-white"
          />
        </div>

        {/* Nenhum professor */}
        {filtrados.length === 0 && (
          <p className="text-white text-center">Nenhum professor encontrado.</p>
        )}

        {/* CARROSSEL */}
        <div
          className="w-full max-w-xl overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-300"
            style={{ transform: `translateX(-${page * 100}%)` }}
          >
            {pages.map((grupo, i) => (
              <div key={i} className="min-w-full px-2.5 pb-4">
                {grupo.map((prof, index) => (
                  <div
                    key={index}
                    className="flex bg-[#323558] rounded-2xl mb-5 p-5 h-[160px]"
                  >
                    <img
                      src={prof.myimg}
                      className="w-[120px] h-[120px] object-cover rounded-xl mr-4"
                      alt="Professor"
                    />

                    <div className="flex flex-col justify-center">
                      <h1 className="text-white text-xl font-semibold">
                        {prof.nome}
                      </h1>
                      <p className="text-white text-sm mb-2">{prof.email}</p>

                      <p className="text-white font-bold text-sm">
                        Disciplinas:
                      </p>

                      <ul className="text-white text-sm list-disc list-inside ml-1">
                        {prof.disciplinas.map((d, idx) => (
                          <li key={idx}>{d}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* INDICADORES */}
        {filtrados.length > 0 && (
          <div className="flex justify-center mt-2 gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`w-3 h-3 rounded-full transition-all ${
                  i === page ? "bg-white w-4" : "bg-gray-500"
                }`}
              />
            ))}
          </div>
        )}

        {/* BOTÕES ABAIXO */}
        <div className="flex justify-between items-center w-full max-w-xl mt-7 mb-6 px-4">
          <button className="w-12 h-12 rounded-full border-2 border-white text-white text-2xl flex items-center justify-center">
            +
          </button>

          <button className="px-8 py-2 rounded-full border-2 border-white text-white font-semibold">
            Gravar
          </button>
        </div>
      </section>
    </>
  );
}

export default Professores;
