import { Link } from 'react-router-dom';
import logoCps from '../assets/logo-cps.png';
import logoSite from '../assets/logo-site.jpg';

export default function Cadastro() {
  return (
    <div className="min-h-screen w-full bg-[#010326] flex flex-col items-center px-6 py-8 font-sans overflow-y-auto">
      
      {/* Cabeçalho */}
      <header className="w-full max-w-2xl flex justify-between items-start mb-6">
         <img src={logoCps} alt="Logo CPS" className="w-16 h-auto object-contain" />
         <img src={logoSite} alt="Logo Site" className="w-16 h-auto rounded-md" />
      </header>
      
      <div className="w-full max-w-lg flex flex-col">
        <h1 className="text-4xl font-black text-white uppercase mb-8 text-center">
          CADASTRE-SE!
        </h1>

        <form className="flex flex-col gap-4 mb-8">
          
          {/* --- GRUPO 1: DADOS PESSOAIS (Inputs Escuros) --- */}
          
          <div className="flex flex-col gap-1">
            <label className="text-white font-bold text-xs">Nome Completo: *</label>
            <input type="text" className="input-padrao input-escuro" />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-white font-bold text-xs">E-mail: *</label>
            <input type="email" className="input-padrao input-escuro" />
          </div>

          <div className="flex gap-3">
            <div className="flex flex-col gap-1 w-1/2">
                <label className="text-white font-bold text-xs">RA: *</label>
                <input type="text" className="input-padrao input-escuro" />
            </div>
            <div className="flex flex-col gap-1 w-1/2">
                <label className="text-white font-bold text-xs">Instituição: *</label>
                <input type="text" className="input-padrao input-escuro" />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-white font-bold text-xs">Curso: *</label>
            <input type="text" className="input-padrao input-escuro" />
          </div>

          {/* --- GRUPO 2: DADOS DE CONTA (Inputs Claros/Roxos) --- */}
          
          <div className="flex flex-col gap-1 mt-2">
            <label className="text-white font-bold text-xs">Seu Login: *</label>
            <input type="text" className="input-padrao input-claro" />
          </div>

          <div className="flex gap-3">
            <div className="flex flex-col gap-1 w-1/2">
                <label className="text-white font-bold text-xs">Senha: *</label>
                <input type="password" className="input-padrao input-claro" />
            </div>
            <div className="flex flex-col gap-1 w-1/2">
                <label className="text-white font-bold text-xs">Repetir Senha: *</label>
                <input type="password" className="input-padrao input-claro" />
            </div>
          </div>

          {/* BOTÕES */}
          <div className="flex justify-between items-center mt-6 gap-4">
            
            {/* Botão Sair */}
            <Link to="/login" className="w-1/3 border border-white text-white text-center font-bold py-3 rounded-full hover:bg-white hover:text-[#010326] transition-colors text-sm">
              Sair
            </Link>
            
            {/* Botão Cadastrar com Gradiente */}
            <button className="w-2/3 bg-gradient-to-r from-[#797FF2] to-indigo-600 text-white font-bold py-3 rounded-full hover:opacity-90 transition-opacity text-sm border-none">
              Cadastrar
            </button>
          </div>

        </form>
      </div>

      <style>{`
        .input-padrao {
          width: 100%;
          border-radius: 8px;
          padding: 12px;
          color: white;
          outline: none;
          font-size: 14px;
          transition: all 0.2s;
        }
        
        /* Estilo Escuro (Para dados pessoais) */
        .input-escuro {
          background-color: #141640;
          border: 1px solid #797FF2;
        }
        .input-escuro:focus {
          border-color: white;
        }

        /* Estilo Claro (Para login/senha - Roxo preenchido) */
        .input-claro {
          background-color: #797FF2;
          border: 1px solid #797FF2;
          color: white;
        }
        .input-claro:focus {
          background-color: #6366f1;
          border-color: white;
        }
      `}</style>
    </div>
  );
}