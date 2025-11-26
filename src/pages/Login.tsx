import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import Toast from '../components/Toast';

import logoCps from '../assets/logo-cps.png';
import logoSite from '../assets/logo-site.jpg';

const MENSAGENS = {
  CREDENCIAIS_INVALIDAS: 'Erro ao fazer login. Verifique suas credenciais.',
  LOGIN_SUCESSO: 'Login realizado com sucesso!',
  CAMPOS_VAZIOS: 'Preenchimento de login e senha obrigatórios.',
  ENTRANDO: 'Entrando...'
} as const;

const DELAYS = {
  REDIRECIONAMENTO: 1000
} as const;

const ENDPOINTS = {
  LOGIN: '/usuario/login'
} as const;

interface ToastState {
  mensagem: string;
  tipo: 'success' | 'error' | 'loading';
  visivel: boolean;
}

interface CredenciaisLogin {
  username: string;
  senha_hash: string;
}

export default function Login() {
  const [loginField, setLoginField] = useState('');
  const [senha, setSenha] = useState('');
  const [toast, setToast] = useState<ToastState>({
    mensagem: '',
    tipo: 'success',
    visivel: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const exibirToast = (mensagem: string, tipo: ToastState['tipo']): void => {
    setToast({ mensagem, tipo, visivel: true });
  };

  const ocultarToast = (): void => {
    setToast(prev => ({ ...prev, visivel: false }));
  };

  const validarCredenciais = (): boolean => {
    if (!loginField.trim() || !senha.trim()) {
      exibirToast(MENSAGENS.CAMPOS_VAZIOS, 'error');
      return false;
    }
    return true;
  };

  const prepararCredenciais = (): CredenciaisLogin => ({
    username: loginField,
    senha_hash: senha
  });

  const processarLoginBemSucedido = (): void => {
    exibirToast(MENSAGENS.LOGIN_SUCESSO, 'success');
    setTimeout(() => navigate('/menu'), DELAYS.REDIRECIONAMENTO);
  };

  const processarErroLogin = (error: unknown): void => {
    console.error('Erro ao fazer login:', error);
    exibirToast(MENSAGENS.CREDENCIAIS_INVALIDAS, 'error');
  };

  const handleLogin = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (!validarCredenciais()) {
      return;
    }

    try {
      setIsLoading(true);
      exibirToast(MENSAGENS.ENTRANDO, 'loading');

      const credenciais = prepararCredenciais();
      const response = await api.post(ENDPOINTS.LOGIN, credenciais);

      await login(response.data.access_token);
      processarLoginBemSucedido();
    } catch (error) {
      processarErroLogin(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#010326] flex flex-col px-8 py-8 font-sans">
      <Toast
        type={toast.tipo}
        message={toast.mensagem}
        isVisible={toast.visivel}
        onClose={ocultarToast}
        position="bottom"
      />

      <header className="w-full flex items-center justify-center mb-10">
        <img
          src={logoCps}
          alt="Logo CPS"
          className="w-16 h-auto object-contain"
        />
      </header>

      <div className="flex-1 flex flex-col items-center w-full">
        <div className="mb-10">
          <img
            src={logoSite}
            alt="Logo do Projeto"
            className="w-24 h-auto rounded-md"
          />
        </div>

        <div className="w-full max-w-xs">
          <h1 className="text-5xl font-black text-white uppercase mb-6 text-left">
            Faça Login!
          </h1>

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <label className="text-white font-bold text-sm">Seu Login: *</label>
              <input
                type="text"
                value={loginField}
                onChange={(e) => setLoginField(e.target.value)}
                disabled={isLoading}
                className="w-full bg-transparent border border-[#797FF2] rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:bg-[#141640] transition-colors disabled:opacity-50"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-white font-bold text-sm">Sua Senha: *</label>
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                disabled={isLoading}
                className="w-full bg-transparent border border-[#797FF2] rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:bg-[#141640] transition-colors disabled:opacity-50"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-2/3 mx-auto bg-[#797FF2] text-white font-bold rounded-full py-3 mt-4 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? MENSAGENS.ENTRANDO : 'Entrar'}
            </button>

            <div className="flex justify-between items-center mt-2">
              <Link
                to="/recuperar-senha"
                className="text-gray-400 text-sm hover:text-white underline decoration-transparent hover:decoration-white transition-all"
              >
                Esqueci minha senha
              </Link>

              <Link
                to="/cadastro"
                className="bg-[#797FF2] text-white text-sm font-bold px-6 py-3 rounded-full hover:bg-[#797FF2] transition-colors"
              >
                Cadastrar
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}