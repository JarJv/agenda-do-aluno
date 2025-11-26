import React, { useState, useEffect, useRef } from "react";
import { Search, Trash2 } from "lucide-react";
import "../assets/style.css";
import LosaP from "../assets/losaProfessores.png";
import EmptySection from "../components/EmptySection.tsx";
import api from "../api/axios";

type ProfessorAPI = {
    id_docente: number;
    nome: string;
    email: string;
    ra?: string;
    disciplina?: string;
};

type ProfessoresResponse = {
    data: ProfessorAPI[];
    success: boolean;
    message: string;
    total?: number;
    skip?: number;
    limit?: number;
};

type NovoProfessor = {
    nome: string;
    email: string;
    disciplina?: string;
};

type ModalCadastroProps = {
    isOpen: boolean;
    onClose: () => void;
    onCadastrar: (dados: NovoProfessor) => Promise<void>;
};

const getInitials = (name: string): string => {
    const words = name.trim().split(" ");
    if (words.length === 1) return words[0][0].toUpperCase();
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
};

const ITEMS_PER_PAGE = 2;

const ModalCadastroProfessor: React.FC<ModalCadastroProps> = ({ isOpen, onClose, onCadastrar }) => {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [disciplina, setDisciplina] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const resetFields = () => {
        setNome("");
        setEmail("");
        setDisciplina("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!nome.trim() || !email.trim()) {
            alert("Preencha nome e e-mail.");
            return;
        }
        setSubmitting(true);
        try {
            await onCadastrar({ nome: nome.trim(), email: email.trim(), disciplina: disciplina.trim() || undefined });
            resetFields();
        } finally {
            setSubmitting(false);
        }
    };

    const handleClose = () => {
        resetFields();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-5">
            <div className="bg-[#1A1C35] rounded-xl shadow-2xl p-6 w-full max-w-sm md:max-w-md">
                <div className="text-center mb-6">
                <h2 className="text-3xl text-white font-extrabold leading-none tracking-tight inline-block pb-1">
                    CADASTRO DE PROFESSOR
                </h2>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="text-white block text-sm mb-1">Nome Completo: <span className="text-red-500">*</span></label>
                        <input value={nome} onChange={(e) => setNome(e.target.value)} type="text" className="bg-[#323558] w-full p-3 rounded-lg text-white border-none outline-none" required/>
                    </div>

                    <div className="mb-4">
                        <label className="text-white block text-sm mb-1">E-mail: <span className="text-red-500">*</span></label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="bg-[#323558] w-full p-3 rounded-lg text-white border-none outline-none" required/>
                    </div>

                    <div className="mb-6">
                        <label className="text-white block text-sm mb-1">Disciplina</label>
                        <input value={disciplina} onChange={(e) => setDisciplina(e.target.value)} type="text" className="bg-[#323558] w-full p-3 rounded-lg text-white border-none outline-none"/>
                    </div>

                    <div className="flex justify-between mt-8">
                        <button type="button" onClick={handleClose} className="border border-white text-white px-8 py-2 rounded-full font-semibold transition-colors hover:bg-white hover:text-[#1A1C35]" disabled={submitting}>
                            Sair
                        </button>

                        <button type="submit" className="bg-[#5960FF] text-white px-8 py-2 rounded-full font-semibold transition-colors hover:bg-[#4a50e0]" disabled={submitting}>
                            {submitting ? "Cadastrando..." : "Cadastrar"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default function Professores() {
    const [professores, setProfessores] = useState<ProfessorAPI[]>([]);
    const [pesquisa, setPesquisa] = useState("");
    const [page, setPage] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [excluindo, setExcluindo] = useState<number | null>(null);

    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    //GET dos professores
    const getProfessores = async () => {
        setLoading(true);
        try {
            const response = await api.get<ProfessoresResponse>("/docentes/");
            const apiData = response.data;
            if (apiData && Array.isArray(apiData.data)) {
                setProfessores(apiData.data);
            } else {
                console.warn("Resposta inesperada ao buscar docentes:", response.data);
                setProfessores([]);
            }
        } catch (err: unknown) {
            console.error("Erro ao buscar professores:", err);
            setProfessores([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProfessores();
    }, []);

  //POST dos professores
    const cadastrarProfessor = async (novoProfessor: NovoProfessor) => {
        try {
            const response = await api.post("/docentes/", novoProfessor);

        if (response.status === 201 || response.status === 200) {
            await getProfessores();
            setIsModalOpen(false);
            alert("Professor cadastrado com sucesso!");
        } else {
            console.warn("Resposta inesperada ao cadastrar docente:", response.data);
            alert("Cadastro realizado, mas resposta inesperada da API.");
            await getProfessores();
            setIsModalOpen(false);
        }
        } catch (err: unknown) {
            console.error("Erro ao cadastrar professor:", err);
            if ((err as any)?.response?.status === 400) {
                alert("Erro de validação. Verifique os dados (e-mail pode já existir).");
            } else if ((err as any)?.response?.status === 401) {
                alert("Não autenticado. Faça login novamente.");
            } else {
                alert("Erro ao cadastrar professor. Tente novamente.");
            }
            throw err;
        }
    };

  //DELETE dos professores
    const excluirProfessor = async (idDocente: number): Promise<boolean> => {
        try {
        const response = await api.delete(`/docentes/${idDocente}`);
        if (response.data && response.data.success) {
            return true;
        }
        console.warn("Resposta delete inesperada:", response.data);
        return false;
        } catch (err) {
            console.error("Erro ao excluir professor:", err);
            throw err;
        }
    };

    const handleExcluirProfessor = async (id: number, nome: string) => {
        if (!window.confirm(`Tem certeza que deseja excluir o professor "${nome}"?`)) {
            return;
        }
        setExcluindo(id);
        try {
            const sucesso = await excluirProfessor(id);
            if (sucesso) {
                setProfessores((prev) => prev.filter((p) => p.id_docente !== id));
                alert("Professor excluído com sucesso!");
            } else {
                alert("Erro ao excluir professor. Tente novamente.");
            }
        } catch (err: unknown) {
            console.error(err);
            if ((err as any)?.response?.status === 401) {
                alert("Não autenticado. Faça login novamente.");
            } else {
                alert("Erro ao excluir professor. Tente novamente.");
            }
        } finally {
            setExcluindo(null);
        }
    };

    const filtrados = Array.isArray(professores)
        ? professores.filter((p) =>
            (p.nome || "").toLowerCase().includes(pesquisa.toLowerCase())
        )
        : [];

    const totalPages = Math.max(1, Math.ceil(filtrados.length / ITEMS_PER_PAGE));
    const pages = Array.from({ length: totalPages }, (_, i) => filtrados.slice(i * ITEMS_PER_PAGE, i * ITEMS_PER_PAGE + ITEMS_PER_PAGE));

    const handleTouchStart = (e: React.TouchEvent) => (touchStartX.current = e.touches[0].clientX);
    const handleTouchMove = (e: React.TouchEvent) => (touchEndX.current = e.touches[0].clientX);
    const handleTouchEnd = () => {
        const dist = touchStartX.current - touchEndX.current;
        if (Math.abs(dist) < 50) return;
        if (dist > 50 && page < totalPages - 1) setPage((p) => p + 1);
        if (dist < -50 && page > 0) setPage((p) => p - 1);
    };

  return (
    <>
        <section className="flex justify-center items-center py-8 px-5 flex-col mt-6 mb-24">
            <div className="w-full flex flex-row max-w-xl justify-center items-center gap-3 mb-6">
                <h1 className="text-4xl text-white font-extrabold">PROFESSORES</h1>
                <img style={{ maxWidth: "10%" }} src={LosaP} alt="Icone Lousa Professores" />
            </div>

            <div className="relative w-full max-w-xl mb-6">
                <Search size={20} className="absolute inset-y-0 left-3 my-auto text-white pointer-events-none" />
                <input type="text" placeholder="Pesquisar..." value={pesquisa} onChange={(e) => { setPesquisa(e.target.value); setPage(0); }} className="bg-[#323558] p-4 pl-11 w-full rounded-xl text-white"/>
            </div>

            {loading && <p className="text-white text-center">Carregando professores...</p>}
            {!loading && filtrados.length === 0 && <p className="text-white text-center">Nenhum professor encontrado.</p>}

            {!loading && filtrados.length > 0 && (
                <div className="w-full max-w-xl overflow-hidden" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
                    <div className="flex transition-transform duration-300" style={{ transform: `translateX(-${page * 100}%)` }}>
                        {pages.map((grupo, i) => (
                        <div key={i} className="min-w-full px-2.5 pb-4">
                            {grupo.map((prof) => (
                            <div key={prof.id_docente} className="card-professor">
                                <div className="flex bg-[#323558] rounded-2xl mb-5 p-5 h-40 relative">

                                    <div className="flex items-center justify-center mr-4">
                                        <div className="w-[120px] h-[120px] object-cover rounded-xl mr-4 bg-[#5960FF] flex items-center justify-center text-white text-xl font-bold">
                                            {getInitials(prof.nome)}
                                        </div>
                                    </div>

                                    <button onClick={() => handleExcluirProfessor(prof.id_docente, prof.nome)} disabled={excluindo === prof.id_docente} 
                                    className="absolute top-3 right-3 p-2 text-red-500 hover:text-red-400 disabled:opacity-50 disabled:cursor-not-allowed" title={`Excluir ${prof.nome}`}>
                                        {excluindo === prof.id_docente ? 
                                            (<div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />) : (<Trash2 />)
                                        }
                                    </button>

                                    <div className="flex flex-col gap-3 justify-center pl-2">
                                        <div>
                                            <h1 className="text-white text-xl font-bold">{prof.nome}</h1>
                                            <p className="text-white ml-2.5">{prof.email}</p>
                                        </div>
                                        <div>
                                            <h2 className="text-white font-semibold">Disciplina:</h2>
                                            <p className="text-white font-bold ml-2.5">{prof.disciplina ?? "-"}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            ))}
                        </div>
                        ))}
                    </div>
                </div>
            )}

            {filtrados.length > 0 && (
                <div className="flex justify-center mt-2 gap-2">
                    {[...Array(totalPages)].map((_, i) => (<button key={i} onClick={() => setPage(i)} className={`w-3 h-3 rounded-full transition-all ${i === page ? "bg-white w-4" : "bg-gray-500"}`}/>))}
                </div>
            )}

            <div className="flex justify-between items-center w-full max-w-xl mt-7 mb-6 px-4">
                <button className="px-8 py-2 rounded-full border-2 border-white text-white font-semibold cursor-pointer" onClick={() => setIsModalOpen(true)}>
                    Adicionar
                </button>
            </div>
        </section>
        <ModalCadastroProfessor isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onCadastrar={cadastrarProfessor} />
        <EmptySection />
    </>
    );
}