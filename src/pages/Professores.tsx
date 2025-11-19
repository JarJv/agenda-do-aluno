import React, { useState, useRef } from 'react';
import { Search } from 'lucide-react';

import '../assets/style.css';

function Professores() {
  const [pesquisa, setPesquisa] = useState<string>('');
  const [page, setPage] = useState(0);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  type secondProfessores<T> = {
    nome: string,
    myimg: string,
    PatrickEstrelaEmail: string,
    disciplinas: T[]
  }

  const professores: secondProfessores<{ name: string }>[] = [
    {
      nome: "Patrick estrela",
      myimg: 'https://i.pinimg.com/236x/79/7b/ef/797befcec4f2ad6bc26365c6adc33b62.jpg',
      PatrickEstrelaEmail: 'patrick@fatec.sp.gov.br',
      disciplinas: [
        { name: 'Algebra Linear' },
        { name: 'Cálculo 3' }
      ]
    },
    {
      nome: "Hornet",
      myimg: 'https://preview.redd.it/can-someone-please-explain-the-hornet-shoes-meme-v0-73tk3o6bgjwf1.jpeg?width=640&crop=smart&auto=webp&s=590cdd4f03d288695a881f6514b618bc1b148c40',
      PatrickEstrelaEmail: 'guarana@fatec.sp.gov.br',
      disciplinas: [
        { name: 'Algebra Linear' },
        { name: 'Cálculo 3' }
      ]
    }, {
      nome: "Hornet",
      myimg: 'https://preview.redd.it/can-someone-please-explain-the-hornet-shoes-meme-v0-73tk3o6bgjwf1.jpeg?width=640&crop=smart&auto=webp&s=590cdd4f03d288695a881f6514b618bc1b148c40',
      PatrickEstrelaEmail: 'guarana@fatec.sp.gov.br',
      disciplinas: [
        { name: 'Algebra Linear' },
        { name: 'Cálculo 3' }
      ]
    }
  ];

  // Filtro
  const result = professores.filter((e) =>
    e.nome.toLowerCase().includes(pesquisa.toLowerCase())
  );


  // MOSTRAR 2 POR VEZ
  const ITEMS_PER_PAGE = 2;
  const totalPages = Math.ceil(result.length / ITEMS_PER_PAGE);

  // Dividir os professores em páginas
  const pages = Array.from({ length: totalPages }, (_, i) =>
    result.slice(i * ITEMS_PER_PAGE, i * ITEMS_PER_PAGE + ITEMS_PER_PAGE)
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

  const imgClasses = 'w-[120px] h-[120px] object-cover rounded-[15px] mr-5';

  return (
    <>
      <section className='flex justify-center items-center pt-10 pb-20 px-5 flex-col'>
        
        <h1 className='text-4xl text-white mt-10 font-bold mb-5 ml-4'>PROFESSORES</h1>

        <div className="relative w-full max-w-lg mb-8">
          <Search
            size={20}
            className=" text-white absolute inset-y-0 left-3 my-auto pointer-events-none"
          />

          <input
            className="bg-[#323558] p-4 pl-10 w-full rounded-lg text-white outline-none border-none"
            type="text"
            placeholder="Pesquisar..."
            onChange={(e) => setPesquisa(e.target.value)}
          />
        </div>

        {result.length === 0 && (
          <p className="text-white text-center text-lg mt-5">Nenhum professor encontrado</p>
        )}

        {/* CARROSSEL REAL */}
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
            {pages.map((group, groupIndex) => (
              <div key={groupIndex} className="min-w-full px-2.5">
                {group.map((professor) => (
                  <div
                    key={professor.PatrickEstrelaEmail}
                    className='flex bg-[#323558] rounded-[15px] mb-5 p-5'
                  >
                    <img
                      src={professor.myimg}
                      className={imgClasses}
                      alt="Foto do Professor"
                    />

                    <div className='flex flex-col justify-center'>
                      <h1 className='text-white text-xl mb-1'>{professor.nome}</h1>
                      <p className='text-white mb-2.5'>{professor.PatrickEstrelaEmail}</p>

                      <p className='text-white font-bold'>Disciplinas:</p>

                      <ul className='text-white'>
                        {professor.disciplinas.map(({ name }) => (
                          <li className='text-white ml-4' key={name}>• {name}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Bolinhas do carrossel */}
        {result.length > 0 && (
          <div className="flex justify-center mt-4 gap-2">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setPage(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === page ? 'bg-white w-4' : 'bg-gray-500'
                }`}
              />
            ))}
          </div>
        )}

      </section>
    </>
  );
}

export default Professores;
