import { Link } from 'react-router-dom';

import logoCps from '../assets/logo-cps.png';
import logoSite from '../assets/logo-site.jpg';

export default function Login() {
  return (
    <div className="min-h-screen w-full bg-[#010326] flex flex-col px-8 py-8 font-sans">
      
      <header className="w-full flex justify-start mb-4">
         <img 
           src={logoCps} 
           alt="Logo CPS" 
           className="w-16 h-auto object-contain" 
         />
      </header>

      <div className="flex-1 flex flex-col items-center w-full">
        
        {/* 2. Logo do Site  */}
        <div className="mb-8">
            <img 
              src={logoSite} 
              alt="Logo do Projeto" 
              className="w-24 h-auto rounded-md" 
            />
        </div>

        <div className="w-full max-w-xs">
          <h1 className="text-2xl font-black text-white uppercase mb-6 text-left">
            Faça Login!
          </h1>

          <form className="flex flex-col gap-5">
            
            {/* Input Login */}
            <div className="flex flex-col gap-1">
              <label className="text-white font-bold text-sm">Seu Login: *</label>
              <input 
                type="text" 
                className="w-full bg-transparent border border-[#797FF2] rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:bg-[#141640] transition-colors"
              />
            </div>

            {/* Input Senha */}
            <div className="flex flex-col gap-1">
              <label className="text-white font-bold text-sm">Sua Senha: *</label>
              <input 
                type="password" 
                className="w-full bg-transparent border border-[#797FF2] rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:bg-[#141640] transition-colors"
              />
            </div>

            {/* Botão Entrar */}
            <button className="w-full bg-[#797FF2] text-white font-bold rounded-full py-3 mt-4 hover:opacity-90 transition-opacity">
              Entrar
            </button>

            {/* Rodapé */}
            <div className="flex justify-between items-center mt-2">
              <Link to="/recuperar-senha" className="text-gray-400 text-xs hover:text-white underline decoration-transparent hover:decoration-white transition-all">
                Esqueci minha senha
              </Link>
              
              <Link to="/cadastro" className="border border-[#797FF2] text-white text-xs font-bold px-6 py-2 rounded-full hover:bg-[#797FF2] transition-colors">
                Cadastrar
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}