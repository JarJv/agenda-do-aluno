import '../assets/style.css'
import { CircleUserRound } from "lucide-react"
import BordedButton from '../components/BordedButton.tsx'
import EmptySection from '../components/EmptySection.tsx'
import Toast from '../components/Toast.tsx'
import { useAuth } from '../context/AuthContext'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function PerfilEditar() {
    const { usuario, atualizarUsuarioParcial } = useAuth();
    const navigate = useNavigate();
    const [nome, setNome] = useState('');
    const [dtNascimento, setDtNascimento] = useState('');
    const [telCelular, setTelCelular] = useState('');
    const [email, setEmail] = useState('');
    const [nomeCurso, setNomeCurso] = useState('');
    const [bimestre, setBimestre] = useState('');
    const [toast, setToast] = useState<{ type: 'success' | 'error' | 'loading', message: string, isVisible: boolean } | null>(null);

    useEffect(() => {
        if (usuario) {
            setNome(usuario.nome || '');
            setDtNascimento(usuario.dt_nascimento || '');
            setTelCelular(usuario.tel_celular || '');
            setEmail(usuario.email || '');
            setNomeCurso(usuario.nome_curso || '');
            setBimestre(usuario.bimestre?.toString() || '');
        }
    }, [usuario]);

    const validateFields = () => {
        if (nome && nome.length > 50) {
            setToast({ type: 'error', message: 'Nome deve ter no máximo 50 caracteres', isVisible: true });
            return false;
        }
        if (email && email.length > 40) {
            setToast({ type: 'error', message: 'Email deve ter no máximo 40 caracteres', isVisible: true });
            return false;
        }
        if (telCelular && telCelular.length < 10) {
            setToast({ type: 'error', message: 'Telefone deve ter no mínimo 10 dígitos', isVisible: true });
            return false;
        }
        if (bimestre && (parseInt(bimestre) < 1 || parseInt(bimestre) > 4)) {
            setToast({ type: 'error', message: 'Bimestre deve ser entre 1 e 4', isVisible: true });
            return false;
        }
        return true;
    };

    const handleSalvar = async () => {
        try {
            if (!validateFields()) return;

            const dados: any = {};
            if (nome) dados.nome = nome;
            if (dtNascimento) dados.dt_nascimento = dtNascimento;
            if (telCelular) dados.tel_celular = telCelular;
            if (email) dados.email = email;
            if (nomeCurso) dados.nome_curso = nomeCurso;
            if (bimestre) dados.bimestre = parseInt(bimestre);

            setToast({ type: 'loading', message: 'Atualizando perfil...', isVisible: true });
            await atualizarUsuarioParcial(dados);
            setToast({ type: 'success', message: 'Perfil atualizado com sucesso!', isVisible: true });
            setTimeout(() => navigate('/perfil'), 1500);
        } catch (error) {
            console.error('Erro ao atualizar perfil:', error);
            setToast({ type: 'error', message: 'Erro ao atualizar perfil', isVisible: true });
        }
    };

    return (
        <div className='p-7'>
            {toast?.isVisible && (
                <Toast 
                    type={toast.type} 
                    message={toast.message} 
                    isVisible={toast.isVisible}
                    onClose={() => setToast({ ...toast, isVisible: false })}
                />
            )}
            <div className='flex items-center gap-2 px-4'>
                <p className='text-white font-black text-3xl uppercase'>Perfil</p>
                <CircleUserRound size={32} color="#fff" />
            </div>

            <div className='mt-[15%] bg-(--c4) w-full p-4 rounded-lg'>
                <div>
                    <div className='flex justify-center'>
                        <img src='/public/imgTeste.jpg' 
                        className='rounded-lg w-[50%]'></img>
                    </div>
                    
                    <p className='text-white font-black mt-[5%]'>Nome:</p>
                    <input 
                        id='nomeInput' 
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        className='text-white font-semibold text-sm p-2
                    w-full rounded-lg bg-(--c1) border-transparent
                    focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50'
                    placeholder='Digite o seu nome'></input>

                    <div className='flex gap-5 justify-between'>
                        <div>
                            <p className='text-white font-black mt-[5%]'>Data de Nascimento:</p>
                            <input 
                                id='dtNascimentoInput' 
                                type='date'
                                value={dtNascimento}
                                onChange={(e) => setDtNascimento(e.target.value)}
                                className='text-white font-semibold text-sm p-2
                            w-full rounded-lg bg-(--c1) border-transparent
                            focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50'
                            placeholder='Data de Nascimento'></input>
                        </div>

                        <div>
                            <p className='text-white font-black mt-[5%]'>Contato:</p>
                            <input 
                                id='contatoInput' 
                                value={telCelular}
                                onChange={(e) => setTelCelular(e.target.value)}
                                className='text-white font-semibold text-sm p-2
                            w-full rounded-lg bg-(--c1) border-transparent
                            focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50'
                            placeholder='Contato'></input>
                        </div>
                    </div>

                    <p className='text-white font-black mt-[5%]'>Email:</p>
                    <input 
                        id='emailInput' 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='text-white font-semibold text-sm p-2
                    w-full rounded-lg bg-(--c1) border-transparent
                    focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50'
                    placeholder='Digite o seu email'></input>

                    <p className='text-white font-black mt-[5%]'>Curso:</p>
                    <input 
                        id='cursoInput' 
                        value={nomeCurso}
                        onChange={(e) => setNomeCurso(e.target.value)}
                        className='text-white font-semibold text-sm p-2
                    w-full rounded-lg bg-(--c1) border-transparent
                    focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50'
                    placeholder='Digite o seu curso'></input>
                    

                    <p className='text-white font-black mt-[5%]'>Bimestre:</p>
                    <input 
                        id='bimestreInput' 
                        type='number'
                        value={bimestre}
                        onChange={(e) => setBimestre(e.target.value)}
                        className='text-white font-semibold text-sm p-2
                    w-[45%] rounded-lg bg-(--c1) border-transparent
                    focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50'
                    placeholder='Bimestre'></input>

                </div>
            </div>
            <div className='flex justify-between mt-[8%]'>
                <a href='/perfil'><BordedButton>
                    Voltar
                </BordedButton></a>
                <button onClick={handleSalvar}>
                    <BordedButton>
                        Gravar
                    </BordedButton>
                </button>
            </div>
            <EmptySection/>
        </div>
    )
}