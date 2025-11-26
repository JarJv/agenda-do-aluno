import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import "../assets/style.css";
import LosaP from "../assets/losaProfessores.png";
import EmptySection from "../components/EmptySection.tsx";
import api from "../api/axios.ts";

interface Professor {
    id_docente?: number;
    nome: string;
    email: string;
    ra?: string;
    disciplina: string;
}

interface ProfessoresResponse {
    data: Professor[];
    success: boolean;
    message: string;
    total: number;
    skip: number;
    limit: number;
}

interface NovoProfessor {
    nome: string;
    email: string;
    disciplina: string;
}

const ITEMS_PER_PAGE = 2;

export default function Professores() {

    const [professoresAPI, setProfessoresAPI] = useState<Professor[]>([]);
    const [pesquisa, setPesquisa] = useState("");
    const [page, setPage] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [loading, setLoading] = useState(false);

    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    const cadastrarProfessor = async (novoProfessor: NovoProfessor) => {
    try {
        const response = await api.post("/docentes/", novoProfessor);
        
        const professorCadastrado: Professor = {
            id_docente: response.data.id_docente ?? Date.now(),
            nome: response.data.nome ?? novoProfessor.nome,
            email: response.data.email ?? novoProfessor.email,
            ra: response.data.ra ?? "",
            disciplina: response.data.disciplina ?? novoProfessor.disciplina,
        };

        setProfessoresAPI(prev => [...prev, professorCadastrado]);
        closeModal();
    } catch (error) {
        console.error("Erro ao cadastrar professor:", error);
    }};

  // Função para buscar professores da API
    const getProfessores = async () => {
        setLoading(true);
        try {
            const response = await api.get<ProfessoresResponse>("/docentes/");
            setProfessoresAPI(response.data.data); // pegando apenas o array
        } catch (error) {
            console.error("Erro ao buscar professores:", error);
            setProfessoresAPI([]);
        } finally {
            setLoading(false);
        }
    };

    // Carrega professores ao montar o componente
    useEffect(() => {
        getProfessores();
    }, []);

    // Filtra professores pela pesquisa
    const filtrados = professoresAPI.filter((p) =>
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

    // Modal
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const ModalCadastroProfessor = () => {
        if (!isModalOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-5">
            <div className="bg-[#1A1C35] rounded-xl shadow-2xl p-6 w-full max-w-sm md:max-w-md">  
            <div className="text-center mb-6">
                <h2 className="text-3xl text-white font-extrabold leading-none tracking-tight inline-block pb-1">
                CADASTRO DE PROFESSOR
                </h2>
            </div>

            <form onSubmit={(e) => {
                e.preventDefault();
                const novoProfessor: NovoProfessor = {
                    nome: e.currentTarget.nome.value,
                    email: e.currentTarget.email.value,
                    disciplina: e.currentTarget.disciplina.value
                };
                    cadastrarProfessor(novoProfessor);
            }}>
                <div className="mb-4">
                    <label className="text-white block text-sm mb-1">Nome Completo: <span className="text-red-500">*</span></label>
                    <input name="nome" type="text" className="bg-[#323558] w-full p-3 rounded-lg text-white border-none outline-none" required/>
                </div>

                <div className="mb-4">
                    <label className="text-white block text-sm mb-1">E-mail: <span className="text-red-500">*</span></label>
                    <input name="email" type="email" className="bg-[#323558] w-full p-3 rounded-lg text-white border-none outline-none" required/>
                </div>

                <div className="mb-6">
                    <label className="text-white block text-sm mb-1">Disciplina<span className="text-red-500">*</span></label>
                    <input name="disciplina" type="text" className="bg-[#323558] w-full p-3 rounded-lg text-white border-none outline-none" required/>
                </div>

                <div className="flex justify-between mt-8">
                    <button type="button" onClick={closeModal} className="border border-white text-white px-8 py-2 rounded-full font-semibold transition-colors hover:bg-white hover:text-[#1A1C35]">
                        Sair
                    </button>

                    <button type="submit" className="bg-[#5960FF] text-white px-8 py-2 rounded-full font-semibold transition-colors hover:bg-[#4a50e0]">
                        Cadastrar
                    </button>
                </div>
            </form>
            </div>
        </div>
        );
    };

  return (
    <>
        <section className="flex justify-center items-center py-8 px-5 flex-col mt-6 mb-24">
            <div className="w-full flex flex-row max-w-xl justify-center items-center gap-3 mb-6">
                <h1 className="text-4xl text-white font-extrabold">PROFESSORES</h1>
                <img style={{maxWidth:'10%'}} src={LosaP} alt="Icone Lousa Professores"></img>
            </div>

            <div className="relative w-full max-w-xl mb-6">
                <Search size={20} className="absolute inset-y-0 left-3 my-auto text-white pointer-events-none"/>
                <input type="text" placeholder="Pesquisar..." value={pesquisa} onChange={(e) => { setPesquisa(e.target.value); setPage(0); }} className="bg-[#323558] p-4 pl-11 w-full rounded-xl text-white"/>
            </div>

            {loading && <p className="text-white text-center">Carregando professores...</p>}
            {!loading && filtrados.length === 0 && <p className="text-white text-center">Nenhum professor encontrado.</p>}

            <div className="w-full max-w-xl overflow-hidden" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
            <div className="flex transition-transform duration-300" style={{ transform: `translateX(-${page * 100}%)` }}>
                {pages.map((grupo, i) => (
                <div key={i} className="min-w-full px-2.5 pb-4">
                    {grupo.map((prof, index) => (
                    <div key={index} className="flex bg-[#323558] rounded-2xl mb-5 p-5 h-40">
                        <div className="flex flex-col justify-center">
                        <h1 className="text-white text-xl font-semibold">{prof.nome}</h1>
                        <p className="text-white text-sm mb-2">{prof.email}</p>
                        <p className="text-white font-bold text-sm">Disciplina:</p>
                        <p className="text-white text-sm">{prof.disciplina}</p>
                        </div>
                    </div>
                    ))}
                </div>
                ))}
            </div>
            </div>

            {filtrados.length > 0 && (
                <div className="flex justify-center mt-2 gap-2">
                    {[...Array(totalPages)].map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setPage(i)}
                        className={`w-3 h-3 rounded-full transition-all ${i === page ? "bg-white w-4" : "bg-gray-500"}`}
                    />
                    ))}
                </div>
            )}

            <div className="flex justify-between items-center w-full max-w-xl mt-7 mb-6 px-4">
                <button className="px-8 py-2 rounded-full border-2 border-white text-white font-semibold" onClick={openModal}>
                    Adicionar 
                </button>
            </div>

        </section>
        <ModalCadastroProfessor/>
        <EmptySection/>
    </>
  );
}