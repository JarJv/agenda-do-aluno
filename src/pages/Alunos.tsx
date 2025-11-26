import React, { useState, useRef, useEffect } from "react";
import "../assets/style.css";
import alunoC from "../assets/alunoChapeu.png";
import { Search, Trash2 } from "lucide-react";
import {Plus} from '@phosphor-icons/react';
import EmptySection from "../components/EmptySection.tsx";
import api from "../api/axios";

// Tipagem baseada na sua API
type AlunoAPI = {
  id_discente: number;
  nome: string;
  email: string;
  tel_celular: string;
  id_curso: number;
  ra: string;
};

type ApiResponse = {
  data: AlunoAPI[];
  success: boolean;
  message: string;
};

// Tipagem para o componente (simplificada)
type Aluno = {
  id: number;
  nome: string;
  myimg: string;
  email: string;
  // REMOVIDO o campo curso
};

// Função para buscar alunos da API
async function getAlunos(): Promise<Aluno[]> {
  try {
    const response = await api.get('/discentes/');
    console.log('Resposta completa da API:', response);
    
    const apiData: ApiResponse = response.data;
    console.log('Dados da API:', apiData);
    
    if (apiData.success && Array.isArray(apiData.data)) {
      // Converte os dados da API para o formato do componente
      const alunosConvertidos = apiData.data.map(aluno => ({
        id: aluno.id_discente,
        nome: aluno.nome,
        email: aluno.email,
        myimg: `https://ui-avatars.com/api/?name=${encodeURIComponent(aluno.nome)}&background=5960FF&color=fff&size=120`,
        // REMOVIDO o campo curso
      }));
      
      console.log('Alunos convertidos:', alunosConvertidos);
      return alunosConvertidos;
    } else {
      console.warn('API não retornou dados válidos:', apiData);
      return [];
    }
  } catch (error: unknown) {
        if (error instanceof Error) {
        console.error('Erro ao buscar alunos:', error.message);
        } else {
        console.error('Erro desconhecido ao buscar alunos:', error);
        }
        return [];
}
}

// Função para cadastrar aluno
async function cadastrarAluno(dadosAluno: { nome: string; email: string; tel_celular: string }) {
  try {
    const response = await api.post('/discentes/', dadosAluno);
    console.log('Aluno cadastrado:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao cadastrar aluno:', error);
    throw error;
  }
}

// FUNÇÃO PARA EXCLUIR ALUNO
async function excluirAluno(idDiscente: number): Promise<boolean> {
  try {
    const response = await api.delete(`/discentes/${idDiscente}`);
    console.log('Aluno excluído:', response.data);
    
    if (response.data.success) {
      return true;
    } else {
      console.warn('API não retornou success true:', response.data);
      return false;
    }
  } catch (error) {
    console.error('Erro ao excluir aluno:', error);
    throw error;
  }
}

// Componente Modal separado
interface ModalCadastroAlunoProps {
  isOpen: boolean;
  onClose: () => void;
  onCadastrar: (dados: { nome: string; email: string; tel_celular: string }) => void;
}

const ModalCadastroAluno: React.FC<ModalCadastroAlunoProps> = ({ isOpen, onClose, onCadastrar }) => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telCelular, setTelCelular] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nome && email && telCelular) {
      onCadastrar({ nome, email, tel_celular: telCelular });
      
      // Limpa os campos
      setNome("");
      setEmail("");
      setTelCelular("");
    }
  };

  const handleClose = () => {
    // Limpa os campos ao fechar
    setNome("");
    setEmail("");
    setTelCelular("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-5">
      <div className="bg-[#1A1C35] rounded-xl shadow-2xl p-6 w-full max-w-sm md:max-w-md">
        <div className="text-center mb-6">
          <h2 className="text-3xl text-white font-extrabold leading-none tracking-tight inline-block pb-1">
            CADASTRO DE ALUNO
          </h2>
        </div>

        <div className="flex justify-center mb-6">
          <div className="w-full max-w-[220px] h-[180px] bg-gray-600 rounded-xl flex items-center justify-center">
            <span className="text-white">Imagem do Aluno</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-white block text-sm mb-1">Nome Completo: <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="bg-[#323558] w-full p-3 rounded-lg text-white border-none outline-none" 
              required
            />
          </div>

          <div className="mb-4">
            <label className="text-white block text-sm mb-1">E-mail: <span className="text-red-500">*</span></label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#323558] w-full p-3 rounded-lg text-white border-none outline-none" 
              required
            />
          </div>

          <div className="mb-6">
            <label className="text-white block text-sm mb-1">Telefone Celular: <span className="text-red-500">*</span></label>
            <input 
              type="tel" 
              value={telCelular}
              onChange={(e) => setTelCelular(e.target.value)}
              className="bg-[#323558] w-full p-3 rounded-lg text-white border-none outline-none" 
              required
              placeholder="(11) 99999-9999"
            />
          </div>

          <div className="flex justify-between mt-8">
            <button 
              type="button" 
              onClick={handleClose} 
              className="border border-white text-white px-8 py-2 rounded-full font-semibold transition-colors hover:bg-white hover:text-[#1A1C35]"
            >
              Sair
            </button>

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

const ITEMS_PER_PAGE = 2;

function Alunos() {
  const [pesquisa, setPesquisa] = useState("");
  const [page, setPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [excluindo, setExcluindo] = useState<number | null>(null);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // useEffect para carregar os dados da API
  useEffect(() => {
    async function carregarAlunos() {
      try {
        setCarregando(true);
        console.log('Carregando alunos da API...');
        
        const dadosAlunos = await getAlunos();
        console.log('Alunos carregados:', dadosAlunos);
        setAlunos(dadosAlunos);
        
      } catch (error) {
        console.error('Erro ao carregar alunos:', error);
        setAlunos([]);
      } finally {
        setCarregando(false);
      }
    }

    carregarAlunos();
  }, []);

  // Função para cadastrar aluno
  const handleCadastrarAluno = async (dadosAluno: { nome: string; email: string; tel_celular: string }) => {
    try {
      console.log('Enviando dados:', dadosAluno);
      
      await cadastrarAluno(dadosAluno);
      setIsModalOpen(false);
      
      // Recarrega a lista de alunos
      const dadosAtualizados = await getAlunos();
      setAlunos(dadosAtualizados);
      
      alert('Aluno cadastrado com sucesso!');
      
    } catch (error) {
      console.error('Erro ao cadastrar aluno:', error);
      alert('Erro ao cadastrar aluno. Tente novamente.');
    }
  };

    // FUNÇÃO PARA EXCLUIR ALUNO
const handleExcluirAluno = async (id: number, nome: string) => {
  if (!window.confirm(`Tem certeza que deseja excluir o aluno "${nome}"?`)) {
    return;
  }
  try {
    setExcluindo(id);
    console.log(`Excluindo aluno ID: ${id}`);
  
    const sucesso = await excluirAluno(id);
  
    if (sucesso) {
      // Remove o aluno da lista localmente
      setAlunos(alunos.filter(aluno => aluno.id !== id));
      alert('Aluno excluído com sucesso!');
    } else {
        alert('Erro ao excluir aluno. Tente novamente.');
      }
  } catch (error) {
      console.error('Erro ao excluir aluno:', error);
      alert('Erro ao excluir aluno. Tente novamente.');
    } finally {
        setExcluindo(null);
      }
};

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  function buscaAlunos(): Aluno[] {
    if (!Array.isArray(alunos)) {
      return [];
    }
    
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

  return (
    <>
      <section className="flex justify-center items-center py-8 px-5 flex-col mt-6 mb-24">
        <div className="w-full max-w-xl flex items-center gap-3 mb-6">
          <h1 className="text-4xl text-white font-extrabold">ALUNOS</h1>
          <img style={{maxWidth:'10%'}} src={alunoC} alt="Icone Chapéu Aluno"></img>
        </div>

        <div className="relative w-full max-w-xl mb-6">
          <Search
            size={20}
            className="absolute inset-y-0 left-3 my-auto text-white pointer-events-none"
          />
          <input type="text" placeholder="Pesquisar..." value={pesquisa} onChange={(e) => {setPesquisa(e.target.value); setPage(0);}} className="bg-[#323558] p-4 pl-11 w-full rounded-xl text-white"/>
        </div>

        {carregando && (<p className="text-white text-center">Carregando alunos...</p>)}

        {!carregando && alunosFiltrados.length === 0 && (<p className="text-white text-center">Nenhum aluno encontrado.</p>)}

        {!carregando && alunosFiltrados.length > 0 && (
          <>
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
                    {grupo.map((aluno) => (
                      <div
                        key={aluno.id}
                        className="flex bg-[#323558] rounded-2xl mb-5 p-5 h-40 relative"
                      >
                        {/* BOTÃO DE EXCLUIR */}
                        <button
                          onClick={() => handleExcluirAluno(aluno.id, aluno.nome)}
                          disabled={excluindo === aluno.id}
                          className="absolute top-3 right-3 p-2 text-red-500 hover:text-red-400 disabled:opacity-50 disabled:cursor-not-allowed"
                          title={`Excluir ${aluno.nome}`}
                        >
                          {excluindo === aluno.id ? (
                            <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            <Trash2 size={18} />
                          )}
                        </button>

                        <img
                          src={aluno.myimg}
                          className="w-[120px] h-[120px] object-cover rounded-xl mr-4"
                          alt="Aluno"
                        />

                        <div className="flex flex-col justify-center pr-8">
                          <h1 className="text-white text-xl font-semibold">
                            {aluno.nome}
                          </h1>
                          <p className="text-white text-sm mb-2">{aluno.email}</p>
                          
                          {/* REMOVIDA A SEÇÃO DE CURSO */}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

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
          </>
        )}

        <div className="flex justify-between items-center w-full max-w-xl mt-7 mb-6 px-4">
          <button className='border-2 border-white rounded-full p-1.5 text-white font-bold cursor-pointer'
                          onClick={openModal}>
                    <Plus size={24} />
                  </button>

          <button 
            className="px-8 py-2 rounded-full border-2 border-white text-white font-semibold"
            onClick={openModal}
          >
            Gravar
          </button>
        </div>
      </section>

      <ModalCadastroAluno 
        isOpen={isModalOpen}
        onClose={closeModal}
        onCadastrar={handleCadastrarAluno}
      />
      <EmptySection/>
    </>
  );
}

export default Alunos;