import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import api from '../api/axios';
import Toast from '../components/Toast';
import logoCps from '../assets/logo-cps.png';
import logoSite from '../assets/logo-site.jpg';

export default function Cadastro() {
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [ra, setRa] = useState('');
  const [nomeInstituicao, setNomeInstituicao] = useState('');
  const [username, setUsername] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [toast, setToast] = useState<{ type: 'success' | 'error' | 'loading'; message: string; isVisible: boolean }>({
    type: 'error',
    message: '',
    isVisible: false
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!ra || ra.length !== 13 || !/^\d+$/.test(ra)) {
      setToast({ type: 'error', message: 'RA deve ter exatamente 13 dígitos', isVisible: true });
      return;
    }

    if (!nome || nome.length < 1 || nome.length > 50) {
      setToast({ type: 'error', message: 'Nome deve ter entre 1 e 50 caracteres', isVisible: true });
      return;
    }

    if (!email || email.length > 40 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setToast({ type: 'error', message: 'Email inválido (máx. 40 caracteres)', isVisible: true });
      return;
    }

    if (!username || username.length < 1 || username.length > 20) {
      setToast({ type: 'error', message: 'Username deve ter entre 1 e 20 caracteres', isVisible: true });
      return;
    }

    if (!nomeInstituicao || nomeInstituicao.length < 1 || nomeInstituicao.length > 80) {
      setToast({ type: 'error', message: 'Instituição deve ter entre 1 e 80 caracteres', isVisible: true });
      return;
    }

    if (!senha || senha.length < 6) {
      setToast({ type: 'error', message: 'Senha deve ter no mínimo 6 caracteres', isVisible: true });
      return;
    }

    if (senha !== confirmarSenha) {
      setToast({ type: 'error', message: 'Senhas não conferem', isVisible: true });
      return;
    }

    const payload = {
      ra,
      nome,
      email,
      username,
      nome_instituicao: nomeInstituicao,
      senha_hash: senha,
    };

    try {
      setToast({ type: 'loading', message: 'Cadastrando...', isVisible: true });
      const res = await api.post('/usuario', payload);
      console.log(res.data);
      setToast({ type: 'success', message: 'Cadastro realizado com sucesso!', isVisible: true });
      setTimeout(() => navigate('/login'), 1500);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Erro ao cadastrar. Tente novamente.';
      setToast({ type: 'error', message: errorMessage, isVisible: true });
    }
  }

  return (
    <>
      <Toast 
        type={toast.type} 
        message={toast.message} 
        isVisible={toast.isVisible}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />
      <div className="min-h-screen w-full bg-[#010326] flex flex-col items-center px-6 py-8 font-sans overflow-y-auto">
      
      <header className="w-full max-w-2xl flex justify-between items-start mb-6">
         <img src={logoCps} alt="Logo CPS" className="w-19 h-auto object-contain" />
         <img src={logoSite} alt="Logo Site" className="w-22 h-auto rounded-md" />
      </header>

      
      <div className="w-full max-w-lg flex flex-col">
        <h1 className="text-5xl font-black text-white uppercase mb-6 text-center">
          CADASTRE-SE!
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-8">
          
          {/* Nome Completo */}
          <div className="flex flex-col gap-1">
            <label className="text-white font-bold text-xs">Nome Completo: *</label>
            <input value={nome} onChange={e => setNome(e.target.value)} type="text" className="input-padrao" />
          </div>

          {/* E-mail */}
          <div className="flex flex-col gap-1">
            <label className="text-white font-bold text-xs">E-mail: *</label>
            <input value={email} onChange={e => setEmail(e.target.value)} type="email" className="input-padrao" />
          </div>

          {/* RA e Instituição */}
          <div className="flex gap-3">
            <div className="flex flex-col gap-1 w-1/2">
                <label className="text-white font-bold text-xs">RA: *</label>
                <input value={ra} onChange={e => setRa(e.target.value)} type="text" className="input-padrao" />
            </div>
            <div className="flex flex-col gap-1 w-1/2">
                <label className="text-white font-bold text-xs">Instituição: *</label>
                <input value={nomeInstituicao} onChange={e => setNomeInstituicao(e.target.value)} type="text" className="input-padrao" />
            </div>
          </div>

          {/* Seu Login */}
          <div className="flex flex-col gap-1">
            <label className="text-white font-bold text-xs">Seu Login: *</label>
            <input value={username} onChange={e => setUsername(e.target.value)} type="text" className="input-padrao" />
          </div>

          {/* Senha e Repetir Senha */}
          <div className="flex gap-3">
            <div className="flex flex-col gap-1 w-1/2">
                <label className="text-white font-bold text-xs">Senha: *</label>
                <input value={senha} onChange={e => setSenha(e.target.value)} type="password" className="input-padrao" />
            </div>
            <div className="flex flex-col gap-1 w-1/2">
              <label className="text-white font-bold text-xs">Repetir Senha: *</label>
              <input value={confirmarSenha} onChange={e => setConfirmarSenha(e.target.value)} type="password" className="input-padrao" />
            </div>
          </div>

          {/* Botões do Rodapé */}
          <div className="flex justify-between gap-20 items-center mt-6 gap-4">
            {/* Botão Sair */}
            <Link to="/login" className="w-[50%] border border-white text-white text-center font-bold py-3 rounded-full hover:bg-white hover:text-[#010326] transition-colors text-sm">
              Sair
            </Link>
            
            {/* Botão Cadastrar */}
            <button type='submit' className="w-[50%] bg-[#797FF2] text-white font-bold py-3 rounded-full hover:opacity-90 transition-opacity text-sm">
              Cadastrar
            </button>
          </div>

        </form>
      </div>

      <style>{`
        .input-padrao {
          width: 100%;
          background-color: transparent;
          border: 1px solid #797FF2;
          border-radius: 8px;
          padding: 10px;
          color: white;
          outline: none;
          transition: background-color 0.2s;
        }
        .input-padrao:focus {
          background-color: #141640;
        }
        
      `}</style>
      </div>
    </>
  );
}