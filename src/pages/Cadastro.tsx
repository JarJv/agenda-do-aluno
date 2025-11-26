import { Link } from 'react-router-dom';
import logoCps from '../assets/logo-cps.png';
import logoSite from '../assets/logo-site.jpg';

export default function Cadastro() {
  return (
   
    <div className="min-h-screen w-full bg-[#010326] flex flex-col items-center px-6 py-8 font-sans overflow-y-auto">
      
      <header className="w-full max-w-2xl flex justify-between items-start mb-6">
         <img src={logoCps} alt="Logo CPS" className="w-19 h-auto object-contain" />
         <img src={logoSite} alt="Logo Site" className="w-22 h-auto rounded-md" />
      </header>

      
      <div className="w-full max-w-lg flex flex-col">
        <h1 className="text-5xl font-black text-white uppercase mb-6 text-center">
          CADASTRE-SE!
        </h1>

        <form className="flex flex-col gap-4 mb-8">
          
          {/* Nome Completo */}
          <div className="flex flex-col gap-1">
            <label className="text-white font-bold text-xs">Nome Completo: *</label>
            <input type="text" className="input-padrao" />
          </div>

          {/* E-mail */}
          <div className="flex flex-col gap-1">
            <label className="text-white font-bold text-xs">E-mail: *</label>
            <input type="email" className="input-padrao" />
          </div>

          {/* RA e Instituição */}
          <div className="flex gap-3">
            <div className="flex flex-col gap-1 w-1/2">
                <label className="text-white font-bold text-xs">RA: *</label>
                <input type="text" className="input-padrao" />
            </div>
            <div className="flex flex-col gap-1 w-1/2">
                <label className="text-white font-bold text-xs">Instituição: *</label>
                <input type="text" className="input-padrao" />
            </div>
          </div>

          {/* Seu Login */}
          <div className="flex flex-col gap-1">
            <label className="text-white font-bold text-xs">Seu Login: *</label>
            <input type="text" className="input-padrao" />
          </div>

          {/* Senha e Repetir Senha */}
          <div className="flex gap-3">
            <div className="flex flex-col gap-1 w-1/2">
                <label className="text-white font-bold text-xs">Senha: *</label>
                <input type="password" className="input-padrao" />
            </div>
            <div className="flex flex-col gap-1 w-1/2">
                <label className="text-white font-bold text-xs">Repetir Senha: *</label>
                <input type="password" className="input-padrao" />
            </div>
          </div>

          {/* Botões do Rodapé */}
          <div className="flex justify-between gap-20 items-center mt-6 gap-4">
            {/* Botão Sair */}
            <Link to="/login" className="w-[50%] border border-white text-white text-center font-bold py-3 rounded-full hover:bg-white hover:text-[#010326] transition-colors text-sm">
              Sair
            </Link>
            
            {/* Botão Cadastrar */}
            <button className="w-[50%] bg-[#797FF2] text-white font-bold py-3 rounded-full hover:opacity-90 transition-opacity text-sm">
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
  );
}