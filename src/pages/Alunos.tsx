import React, { useState, useRef } from "react";
import "../assets/style.css";
import alunoC from "../assets/alunoChapeu.png"
import { Search } from "lucide-react";


type Aluno<T> = {
  nome: string;
  myimg: string;
  email: string;
  curso: T[];
};

const alunos: Aluno<string>[] = [
  {
    nome: "Sportacus Ferreira",
    myimg:
      "https://oyster.ignimgs.com/mediawiki/apis.ign.com/game-of-thrones/c/c5/Eddard_stark_and_ice.jpg",
    email: "shaolin@fatec.sp.gov.br",
    curso: ["Lorem Ipsum is simply"],
  },
  {
    nome: "Sportacus Ferreira",
    myimg:
      "https://oyster.ignimgs.com/mediawiki/apis.ign.com/game-of-thrones/c/c5/Eddard_stark_and_ice.jpg",
    email: "shaolin@fatec.sp.gov.br",
    curso: ["Lorem Ipsum is simply"],
  },
];

function Alunos() {
  const [pesquisa, setPesquisa] = useState("");
  const [page, setPage] = useState(0);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  function buscaAlunos(): Aluno<string>[] {
    return alunos.filter((a) =>
      a.nome.toLowerCase().includes(pesquisa.toLowerCase())
    );
  }

  const alunosFiltrados = buscaAlunos();

  const ITEMS_PER_PAGE = 2;
  const totalPages = Math.ceil(alunosFiltrados.length / ITEMS_PER_PAGE);

  const pages = Array.from({ length: totalPages }, (_, i) =>
    alunosFiltrados.slice(
      i * ITEMS_PER_PAGE,
      i * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    )
  );

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const dist = touchStartX.current - touchEndX.current;

    if (Math.abs(dist) < 50) return;
    if (dist > 50 && page < totalPages - 1) setPage(page + 1);
    if (dist < -50 && page > 0) setPage(page - 1);
  };

  return (
    <>
      <section className="flex justify-center items-center py-8 px-5 flex-col mt-6 mb-24">
        {/* Título */}
        <div className="w-full max-w-xl flex items-center gap-3 mb-6">
          <h1 className="text-4xl text-white font-extrabold">ALUNOS</h1>
          <img style={{maxWidth:'10%'}} src={alunoC}></img>
        </div>

        {/* Busca */}
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

        {/* Nenhum aluno */}
        {alunosFiltrados.length === 0 && (
          <p className="text-white text-center">Nenhum aluno encontrado.</p>
        )}

        {/* Carousel */}
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
            {pages.map((grupo, pageIndex) => (
              <div key={pageIndex} className="min-w-full px-2.5 pb-4">
                {grupo.map((aluno, index) => (
                  <div
                    key={index}
                    className="flex bg-[#323558] rounded-2xl mb-5 p-5 h-[160px]"
                  >
                    <img
                      src={aluno.myimg}
                      className="w-[120px] h-[120px] object-cover rounded-xl mr-4"
                      alt="Aluno"
                    />

                    <div className="flex flex-col justify-center">
                      <h1 className="text-white text-xl font-semibold">
                        {aluno.nome}
                      </h1>
                      <p className="text-white text-sm mb-2">{aluno.email}</p>

                      <p className="text-white font-bold text-sm">Curso:</p>
                      <ul className="text-white text-sm list-disc list-inside ml-1">
                        {aluno.curso.map((c, i) => (
                          <li key={i}>{c}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Indicadores */}
        {alunosFiltrados.length > 0 && (
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

        {/* Botões inferiores */}
        <div className="flex justify-between items-center w-full max-w-xl mt-7 mb-6 px-4">
        



  <button className="w-12 h-12 rounded-full border-2 border-white text-white text-2xl flex items-center justify-center"
  >
    +
  </button>

  <button className="px-8 py-2 rounded-full border-2 border-white text-white font-semibold"
  >
    Gravar
  </button>

        </div>
      </section>
    </>
  );
}

export default Alunos;
