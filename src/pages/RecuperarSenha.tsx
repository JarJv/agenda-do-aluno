import { Link } from 'react-router-dom';
import logoCps from '../assets/logo-cps.png';
import logoSite from '../assets/logo-site.jpg';

export default function RecuperarSenha() {
  return (
    <div className="min-h-screen w-full bg-[#010326] flex flex-col px-8 py-8 font-sans">
    
      <header className="w-full flex justify-between items-start mb-10">
         <img src={logoCps} alt="Logo CPS" className="w-19 h-auto object-contain" />
         <img src={logoSite} alt="Logo Site" className="w-22 h-auto rounded-md" />
      </header>

      <div className="w-full max-w-xs mx-auto">
        <h1 className="text-2xl font-black text-white uppercase mb-4 text-left">
          Recuperar Senha
        </h1>

        <p className="text-gray-300 text-sm mb-8">
            Digite o e-mail cadastrado.<br />
            Enviaremos um link para você redefinir sua senha.
        </p>

        <form className="flex flex-col gap-6">
          
          {/* Input E-mail */}
          <div className="flex flex-col gap-1">
            <label className="text-white font-bold text-sm">E-mail Cadastrado: *</label>
            <input 
              type="email" 
              placeholder="exemplo@email.com"
              className="w-full bg-transparent border border-[#797FF2] rounded-lg p-3 text-white placeholder-gray-600 focus:outline-none focus:bg-[#141640] transition-colors"
            />
          </div>

          {/* Botões */}
          <div className="flex flex-col gap-3 mt-2">
            <button className="w-full bg-[#797FF2] text-white font-bold rounded-full py-3 hover:opacity-90 transition-opacity">
              Enviar Link
            </button>

            <Link to="/login" className="w-full border border-gray-500 text-gray-300 text-center font-bold py-3 rounded-full hover:border-white hover:text-white transition-colors">
              Voltar para Login
            </Link>
          </div>

        </form>
      </div>
    </div>
  );
}