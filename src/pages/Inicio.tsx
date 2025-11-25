import { Link } from 'react-router-dom';
import logoSite from '../assets/logo-site.jpg'; 
import logoCps from '../assets/logo-cps.png'; 
import imgLivros from '../assets/img-livros.png';

export function Inicio() {
  return (
    // ADICIONADO: 'overflow-hidden' para a imagem não criar barra de rolagem horizontal
    <div className="min-h-screen w-full bg-[#010326] flex flex-col items-center justify-center px-6 relative font-sans overflow-hidden">
      
      {/* LOGO 1 */}
      <div className="absolute top-6 left-6 z-10">
        <img 
          src={logoCps} 
          alt="Logo CPS" 
          className="w-16 h-auto object-contain" 
        />
      </div>

      {/* LOGO 2 */}
      <div className="absolute top-6 right-6 z-10">
        <img 
          src={logoSite} 
          alt="Logo do Site" 
          className="w-16 h-auto rounded-md" 
        />
      </div>

      <main className="flex-1 flex flex-col items-center justify-center w-full max-w-xs gap-8 mt-10">
        
        {/* ALTERADO AQUI:
            justify-end: Joga para a direita
            -mr-24: Margem negativa para "estourar" o limite da tela e colar na borda
        */}
        <div className="w-full flex justify-end -mr-24">
          <img 
            src={imgLivros} 
            alt="Estudante segurando livros" 
            // Aumentei um pouco a largura para 120% para dar o efeito de proximidade
            className="w-[120%] max-w-md h-auto object-cover translate-x-4" 
          />
        </div>

        {/* Adicionei z-10 para o texto ficar por cima da imagem se encostar */}
        <h1 className="text-3xl font-black text-white uppercase tracking-wide text-center leading-tight z-10">
          Agenda do<br />Aluno
        </h1>

        <div className="w-full flex flex-col gap-4 z-10">
          
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