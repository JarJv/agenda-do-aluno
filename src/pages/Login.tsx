import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import Toast from '../components/Toast';

import logoCps from '../assets/logo-cps.png';
import logoSite from '../assets/logo-site.jpg';

export default function Login() {
  const [loginField, setLoginField] = useState('');
  const [senha, setSenha] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'loading'>('success');
  const [showToast, setShowToast] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/usuario/login', { username: loginField, senha_hash: senha });
      await login(response.data.access_token);
      setToastMessage('Login realizado com sucesso!');
      setToastType('success');
      setShowToast(true);
      setTimeout(() => navigate('/menu'), 1000);
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setToastMessage('Erro ao fazer login. Verifique suas credenciais.');
      setToastType('error');
      setShowToast(true);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#010326] flex flex-col px-8 py-8 font-sans">
      
      <Toast 
        type={toastType} 
        message={toastMessage} 
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
      
      <header className="w-full flex items-center justify-center mb-10">
         <img 
           src={logoCps} 
           alt="Logo CPS" 
           className="w-16 h-auto object-contain" 
         />
      </header>

      <div className="flex-1 flex flex-col items-center w-full">
        
        {/* 2. Logo do Site  */}
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
            
            {/* Input Login */}
            <div className="flex flex-col gap-1">
              <label className="text-white font-bold text-sm">Seu Login: *</label>
              <input 
                type="text" 
                value={loginField}
                onChange={(e) => setLoginField(e.target.value)}
                className="w-full bg-transparent border border-[#797FF2] rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:bg-[#141640] transition-colors"
              />
            </div>

            {/* Input Senha */}
            <div className="flex flex-col gap-1">
              <label className="text-white font-bold text-sm">Sua Senha: *</label>
              <input 
                type="password" 
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full bg-transparent border border-[#797FF2] rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:bg-[#141640] transition-colors"
              />
            </div>

            {/* Botão Entrar */}
            <button type='submit' className="w-2/3 mx-auto bg-[#797FF2] text-white font-bold rounded-full py-3 mt-4 hover:opacity-90 transition-opacity">
              Entrar
            </button>

            {/* Rodapé */}
            <div className="flex justify-between items-center mt-2">
              <Link to="/recuperar-senha" className="text-gray-400 text-sm hover:text-white underline decoration-transparent hover:decoration-white transition-all">
                Esqueci minha senha
              </Link>
              
              <Link to="/cadastro" className="bg-[#797FF2] text-white text-sm font-bold px-6 py-3 rounded-full hover:bg-[#797FF2] transition-colors">
                Cadastrar
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}