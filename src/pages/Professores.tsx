import React, { useState, useRef } from "react";
import { Search } from "lucide-react";
import "../assets/style.css";
import LosaP from "../assets/losaProfessores.png";

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

const ITEMS_PER_PAGE = 2;

function Professores() {
  const [pesquisa, setPesquisa] = useState("");
  const [page, setPage] = useState(0);
  // ESTADO DO MODAL
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const filtrados = professores.filter((p) =>
    p.nome.toLowerCase().includes(pesquisa.toLowerCase())
  );

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

  // Funções para abrir e fechar o modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // --- COMPONENTE MODAL INTEGRADO ---
  const ModalCadastroProfessor = () => {
    if (!isModalOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-5">
            
            {/* Container do Modal */}
            <div className="bg-[#1A1C35] rounded-xl shadow-2xl p-6 w-full max-w-sm md:max-w-md">
                
                {/* Título do Modal */}
                <div className="text-center mb-6">
                    <h2 className="text-3xl text-white font-extrabold leading-none tracking-tight inline-block pb-1">
                        CADASTRO DE PROFESSOR
                    </h2>
                  
                </div>

                {/* Imagem do Professor */}
                <div className="flex justify-center mb-6">
                    {/* Imagem do Sportacus */}
                    <img 
                        src={professores[0].myimg} 
                        alt="Imagem do Professor" 
                        className="w-full max-w-[220px] h-[180px] object-cover rounded-xl"
                    />
                </div>

                {/* Formulário */}
                <form onSubmit={(e) => { e.preventDefault(); /* Lógica de envio */ closeModal(); }}>
                    
                    {/* Campos de Input */}
                    <div className="mb-4">
                        <label className="text-white block text-sm mb-1">Nome Completo: <span className="text-red-500">*</span></label>
                        <input type="text" className="bg-[#323558] w-full p-3 rounded-lg text-white border-none outline-none" required/>
                    </div>

                    <div className="mb-4">
                        <label className="text-white block text-sm mb-1">E-mail: <span className="text-red-500">*</span></label>
                        <input type="email" className="bg-[#323558] w-full p-3 rounded-lg text-white border-none outline-none" required/>
                    </div>

                    <div className="mb-6">
                        <label className="text-white block text-sm mb-1">Disciplina<span className="text-red-500">*</span></label>
                        <input type="text" className="bg-[#323558] w-full p-3 rounded-lg text-white border-none outline-none" required/>
                    </div>

                    {/* Botões de Ação */}
                    <div className="flex justify-between mt-8">
                        
                        {/* Botão Sair - Chama closeModal */}
                        <button 
                            type="button" 
                            onClick={closeModal} 
                            className="border border-white text-white px-8 py-2 rounded-full font-semibold transition-colors hover:bg-white hover:text-[#1A1C35]"
                        >
                            Sair
                        </button>

                        {/* Botão Cadastrar */}
                        <button 
                            type="submit" 
                            className="bg-[#5960FF] text-white px-8 py-2 rounded-full font-semibold transition-colors hover:bg-[#4a50e0]"
                        >
                            Cadastrar
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
  };
  // --- FIM DO COMPONENTE MODAL INTEGRADO ---


  return (
    <>
      <section className="flex justify-center items-center py-8 px-5 flex-col mt-6 mb-24">
        {/* TÍTULO */}
        <div className="w-full max-w-xl flex items-center gap-3 mb-6">
          <h1 className="text-4xl text-white font-extrabold">PROFESSORES</h1>
          <img style={{maxWidth:'10%'}} src={LosaP} alt="Icone Lousa Professores"></img>
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

        {/* BOTÕES ABAIXO - ADICIONADO onClick */}
        <div className="flex justify-between items-center w-full max-w-xl mt-7 mb-6 px-4">
          <button 
                className="w-12 h-12 rounded-full border-2 border-white text-white text-2xl flex items-center justify-center"
                onClick={openModal} 
            >
            +
          </button>

          <button 
                className="px-8 py-2 rounded-full border-2 border-white text-white font-semibold"
                onClick={openModal} 
            >
            Gravar
          </button>
        </div>
      </section>
      <ModalCadastroProfessor />
    </>
  );
}

export default Professores;
import React, { useEffect, useState } from 'react'

import '../assets/style.css';

function Professores() {



  const[pesquisa,setPesquisa] = useState<string>('')


  type secondProfessores<T> = {
    nome:string,
    myimg:string,
    PatrickEstrelaEmail:string,
    disciplinas:T[]
  }

  const professores:secondProfessores<{name:string}>[] = [
    {
      nome: "Patrick estrela",
      myimg: 'https://i.pinimg.com/236x/79/7b/ef/797befcec4f2ad6bc26365c6adc33b62.jpg',
      PatrickEstrelaEmail: 'patrick@fatec.sp.gov.br',
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


function BuscaProfessores():secondProfessores<{name:string}>[]{
    return professores.filter((e) => e.nome.toLocaleLowerCase().includes( pesquisa.toLowerCase()))
}


  const imgClasses = 'w-[120px] h-[120px] object-cover rounded-[15px] mr-5';
  
  return (
    <> 
      <section className='flex justify-center items-center pt-10 pb-20 px-5 flex-col'>
        
        <h1 className='text-4xl text-white mt-10 font-bold mb-5 ml-4'>PROFESSORES</h1>

        <form className='myform w-full max-w-lg'>
          <input 
            className='bg-[#323558] p-4 w-full rounded-lg text-white outline-none border-none mb-8'
            type="text"
            placeholder='Pesquisar...'
            onChange={(e) => setPesquisa(e.target.value)}
          />
        </form>

        <div className='w-full max-w-xl px-2.5'>


            {BuscaProfessores().length === 0 && (
            <p className="text-white text-center text-lg mt-5">Nenhum professor encontrado</p>
  )}

          { BuscaProfessores().map((professor) => (
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
                    <li className='text-white ml-4' key={name}>{name}</li>
                  ))}
                </ul>
              </div>

            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default Professores;
