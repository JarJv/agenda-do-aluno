import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import api from '../api/axios';
import Toast from '../components/Toast';
import logoCps from '../assets/logo-cps.png';
import logoSite from '../assets/logo-site.jpg';

interface FormData {
  nome: string;
  email: string;
  ra: string;
  nomeInstituicao: string;
  username: string;
  senha: string;
  confirmarSenha: string;
}

export default function Cadastro() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    ra: '',
    nomeInstituicao: '',
    username: '',
    senha: '',
    confirmarSenha: ''
  });
  const [toast, setToast] = useState<{ type: 'success' | 'error' | 'loading'; message: string; isVisible: boolean }>({
    type: 'error',
    message: '',
    isVisible: false
  });

  const handleChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const validateForm = (data: FormData): string | null => {
    if (!data.ra || data.ra.length !== 13 || !/^\d+$/.test(data.ra)) {
      return 'RA deve ter exatamente 13 dígitos';
    }
    if (!data.nome || data.nome.length < 1 || data.nome.length > 50) {
      return 'Nome deve ter entre 1 e 50 caracteres';
    }
    if (!data.email || data.email.length > 40 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return 'Email inválido (máx. 40 caracteres)';
    }
    if (!data.username || data.username.length < 1 || data.username.length > 20) {
      return 'Username deve ter entre 1 e 20 caracteres';
    }
    if (!data.nomeInstituicao || data.nomeInstituicao.length < 1 || data.nomeInstituicao.length > 80) {
      return 'Instituição deve ter entre 1 e 80 caracteres';
    }
    if (!data.senha || data.senha.length < 6) {
      return 'Senha deve ter no mínimo 6 caracteres';
    }
    if (data.senha !== data.confirmarSenha) {
      return 'Senhas não conferem';
    }
    return null;
  };

  const mapErrorMessage = (errorMessage: string): string => {
    if (errorMessage.includes('usuario_ra_key')) {
      return 'RA já cadastrado no sistema';
    }
    if (errorMessage.includes('usuario_email_key')) {
      return 'E-mail já cadastrado no sistema';
    }
    if (errorMessage.includes('usuario_username_key')) {
      return 'Nome de usuário já existe';
    }
    if (errorMessage.includes('duplicate key value violates unique constraint')) {
      if (errorMessage.includes('Key (ra)=')) {
        return 'RA já cadastrado no sistema';
      }
      if (errorMessage.includes('Key (email)=')) {
        return 'E-mail já cadastrado no sistema';
      }
      if (errorMessage.includes('Key (username)=')) {
        return 'Nome de usuário já existe';
      }
      return 'Dados já existem no sistema';
    }
    if (errorMessage.includes('UniqueViolation')) {
      return 'Dados já existem no sistema';
    }
    return errorMessage;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateForm(formData);
    if (validationError) {
      setToast({ type: 'error', message: validationError, isVisible: true });
      return;
    }

    const payload = {
      ra: formData.ra,
      nome: formData.nome,
      email: formData.email,
      username: formData.username,
      nome_instituicao: formData.nomeInstituicao,
      senha_hash: formData.senha,
    };

    try {
      setToast({ type: 'loading', message: 'Cadastrando...', isVisible: true });
      const res = await api.post('/usuario', payload);
      console.log(res.data);
      setToast({ type: 'success', message: 'Cadastro realizado com sucesso!', isVisible: true });
      setTimeout(() => navigate('/login'), 1500);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string; detail?: string } }; message?: string };
      const errorMessage = error?.response?.data?.message || error?.response?.data?.detail || error?.message || 'Erro ao cadastrar. Tente novamente.';
      const userFriendlyMessage = mapErrorMessage(errorMessage);
      setToast({ type: 'error', message: userFriendlyMessage, isVisible: true });
    }
  };

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
              <input value={formData.nome} onChange={handleChange('nome')} type="text" className="input-padrao" />
            </div>

            {/* E-mail */}
            <div className="flex flex-col gap-1">
              <label className="text-white font-bold text-xs">E-mail: *</label>
              <input value={formData.email} onChange={handleChange('email')} type="email" className="input-padrao" />
            </div>

            {/* RA e Instituição */}
            <div className="flex gap-3">
              <div className="flex flex-col gap-1 w-1/2">
                <label className="text-white font-bold text-xs">RA: *</label>
                <input value={formData.ra} onChange={handleChange('ra')} type="text" className="input-padrao" />
              </div>
              <div className="flex flex-col gap-1 w-1/2">
                <label className="text-white font-bold text-xs">Instituição: *</label>
                <input value={formData.nomeInstituicao} onChange={handleChange('nomeInstituicao')} type="text" className="input-padrao" />
              </div>
            </div>

            {/* Seu Login */}
            <div className="flex flex-col gap-1">
              <label className="text-white font-bold text-xs">Seu Login: *</label>
              <input value={formData.username} onChange={handleChange('username')} type="text" className="input-padrao" />
            </div>

            {/* Senha e Repetir Senha */}
            <div className="flex gap-3">
              <div className="flex flex-col gap-1 w-1/2">
                <label className="text-white font-bold text-xs">Senha: *</label>
                <input value={formData.senha} onChange={handleChange('senha')} type="password" className="input-padrao" />
              </div>
              <div className="flex flex-col gap-1 w-1/2">
                <label className="text-white font-bold text-xs">Repetir Senha: *</label>
                <input value={formData.confirmarSenha} onChange={handleChange('confirmarSenha')} type="password" className="input-padrao" />
              </div>
            </div>

            {/* Botões do Rodapé */}
            <div className="flex justify-between gap-20 items-center mt-6">
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