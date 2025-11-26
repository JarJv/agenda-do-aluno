import { Link } from 'react-router-dom';
import logoSite from '../assets/logo-site.jpg'; 
import logoCps from '../assets/logo-cps.png'; 
import imgLivros from '../assets/img-livros.png';

export function Inicio() {
  return (
    <div className="min-h-screen w-full bg-[#010326] flex flex-col items-center justify-center px-6 relative font-sans">
      
      {/* LOGO 1 */}
      <div className="absolute top-6 left-6">
        <img 
          src={logoCps} 
          alt="Logo CPS" 
          className="w-19 h-auto object-contain" 
        />
      </div>

      {/* LOGO 2 */}
      <div className="absolute top-6 right-6">
        <img 
          src={logoSite} 
          alt="Logo do Site" 
          className="w-22 h-auto rounded-md" 
        />
      </div>

      <main className="flex-1 flex flex-col items-center justify-center w-full max-w-xs gap-8 mt-10">
        <div className="w-full fixed right-0 top-50 flex justify-end">
          <img 
            src={imgLivros} 
            alt="Estudante segurando livros" 
            className="w-full max-w-[280px] h-auto" 
          />
        </div>

        <h1 className="text-3xl font-black mt-100 text-white uppercase tracking-wide text-center leading-tight">
          Agenda do<br />Aluno
        </h1>

        <div className="w-full flex flex-col gap-4">
          
          {/* Botão Cadastre-se */}
          <Link 
            to="/cadastro" 
            className="w-full py-4 rounded-full bg-[#797FF2] text-white font-bold text-lg hover:opacity-90 transition-opacity text-center block"
          >
            Cadastre-se
          </Link>

          {/* Botão Login */}
          <Link 
            to="/login" 
            className="w-full py-4 rounded-full bg-white text-[#010326] font-bold text-lg hover:bg-gray-100 transition-colors text-center block"
          >
            Faça Login
          </Link>
        </div>
      </main>
    </div>
  );
}