import React, { useState, useRef } from 'react';
import '../assets/style.css';

type Aluno<T> = {
  nome: string;
  myimg: string;
  email: string;
  curso: T[];
};

const alunos: Aluno<string>[] = [
  {
    nome: "Sportacus Ferreira",
    myimg: "https://oyster.ignimgs.com/mediawiki/apis.ign.com/game-of-thrones/c/c5/Eddard_stark_and_ice.jpg",
    email: "shaolin@fatec.sp.gov.br",
    curso: ["Sistemas para Internet"]
  },
  {
    nome: "Ned Stark",
    myimg: "https://oyster.ignimgs.com/mediawiki/apis.ign.com/game-of-thrones/c/c5/Eddard_stark_and_ice.jpg",
    email: "ned@winterfell.gov",
    curso: ["Engenharia da Cerveja"]
  }, {
    nome: "Ned Stark",
    myimg: "https://oyster.ignimgs.com/mediawiki/apis.ign.com/game-of-thrones/c/c5/Eddard_stark_and_ice.jpg",
    email: "ned@winterfell.gov",
    curso: ["Engenharia da Cerveja"]
  }, {
    nome: "Ned Stark",
    myimg: "https://oyster.ignimgs.com/mediawiki/apis.ign.com/game-of-thrones/c/c5/Eddard_stark_and_ice.jpg",
    email: "ned@winterfell.gov",
    curso: ["Engenharia da Cerveja"]
  }

];

function Alunos() {

  const [pesquisa, setPesquisa] = useState("");
  const [page, setPage] = useState(0);

  // Touch positions
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

  // Divide os alunos em páginas
  const pages = Array.from({ length: totalPages }, (_, i) =>
    alunosFiltrados.slice(i * ITEMS_PER_PAGE, i * ITEMS_PER_PAGE + ITEMS_PER_PAGE)
  );

  // Swipe detect
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

  const imgClasses = 'w-[120px] h-[120px] object-cover rounded-[15px] mr-5';

  return (
    <>
      <section className='flex justify-center items-center py-10 px-5 flex-col'>

        <form className='myform w-full max-w-lg'>
          <h1 className='text-4xl text-white mt-10 font-bold mb-5 ml-4'>
            ALUNOS
          </h1>





          <input
            className='bg-[#323558] p-4 w-full rounded-lg text-white outline-none border-none mb-8'
            type="text"
            placeholder='Pesquisar...'
            value={pesquisa}
            onChange={(e) => {
              setPesquisa(e.target.value);
              setPage(0); // voltar para página 0 ao pesquisar
            }}
          />
        </form>

        {/* Nenhum aluno */}
        {alunosFiltrados.length === 0 && (
          <p className='text-white text-center'>Nenhum aluno encontrado.</p>
        )}

        {/* CARROSSEL */}
        <div
          className='w-full max-w-xl overflow-hidden'
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className='flex transition-transform duration-300'
            style={{ transform: `translateX(-${page * 100}%)` }}
          >
            {pages.map((grupo, pageIndex) => (
              <div key={pageIndex} className='min-w-full px-2.5'>
                {grupo.map((aluno, index) => (
                  <div key={index} className='flex bg-[#323558] rounded-[15px] mb-5 p-5'>
                    
                    <img
                      src={aluno.myimg}
                      className={imgClasses}
                      alt="Imagem do Aluno"
                    />

                    <div className='flex flex-col justify-center'>
                      <h1 className='text-white text-xl mb-1'>{aluno.nome}</h1>
                      <p className='text-white mb-2.5'>{aluno.email}</p>

                      <p className='text-white font-bold'>Curso:</p>

                      <ul className='text-white list-disc list-inside ml-2'>
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

        {/* Bolinhas */}
        {alunosFiltrados.length > 0 && (
          <div className="flex justify-center mt-4 gap-2">
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

      </section>
    </>
  );
}

export default Alunos;
