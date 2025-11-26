import React, { useState, useRef } from "react";
import "../assets/style.css";
import alunoC from "../assets/alunoChapeu.png";
import { Search } from "lucide-react";
import EmptySection from "../components/EmptySection.tsx";

// Dados e tipagem (mantidos)
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

const ITEMS_PER_PAGE = 2;

function Alunos() {
  const [pesquisa, setPesquisa] = useState("");
  const [page, setPage] = useState(0);
  // NOVO ESTADO DO MODAL
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  function buscaAlunos(): Aluno<string>[] {
    return alunos.filter((a) =>
      a.nome.toLowerCase().includes(pesquisa.toLowerCase())
    );
  }

  const alunosFiltrados = buscaAlunos();

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

  // Funções para abrir e fechar o modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);


  // --- COMPONENTE MODAL INTEGRADO PARA ALUNO ---
  const ModalCadastroAluno = () => {
    if (!isModalOpen) return null;

    return (
        // Fundo escuro fixo
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-5">
            
            {/* Container do Modal */}
            <div className="bg-[#1A1C35] rounded-xl shadow-2xl p-6 w-full max-w-sm md:max-w-md">
                
                {/* Título do Modal */}
                <div className="text-center mb-6">
                    <h2 className="text-3xl text-white font-extrabold leading-none tracking-tight inline-block  pb-1">
                        CADASTRO DE ALUNO
                    </h2>
                  
                </div>

                {/* Imagem do Aluno */}
                <div className="flex justify-center mb-6">
                    {/* Imagem do primeiro aluno da lista como placeholder */}
                    <img 
                        src={alunos[0].myimg} 
                        alt="Imagem do Aluno" 
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
                        <label className="text-white block text-sm mb-1">Curso<span className="text-red-500">*</span></label>
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
  // --- FIM DO COMPONENTE MODAL INTEGRADO PARA ALUNO ---


  return (
    <>
      <section className="flex justify-center items-center py-8 px-5 flex-col mt-6 mb-24">
        {/* Título */}
        <div className="w-full max-w-xl flex items-center gap-3 mb-6">
          <h1 className="text-4xl text-white font-extrabold">ALUNOS</h1>
          <img style={{maxWidth:'10%'}} src={alunoC} alt="Icone Chapéu Aluno"></img>
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

        {/* Botões inferiores - ADICIONADO onClick */}
        <div className="flex justify-between items-center w-full max-w-xl mt-7 mb-6 px-4">
        
          <button 
            className="w-12 h-12 rounded-full border-2 border-white text-white text-2xl flex items-center justify-center"
            onClick={openModal} // Chama a função para abrir o modal
          >
            +
          </button>

          <button 
            className="px-8 py-2 rounded-full border-2 border-white text-white font-semibold"
            onClick={openModal} // Chama a função para abrir o modal
          >
            Gravar
          </button>

        </div>
      </section>
      {/* RENDERIZAÇÃO DO MODAL INTEGRADO */}
      <ModalCadastroAluno />
        <EmptySection/>
    </>
  );
}

export default Alunos;