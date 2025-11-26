import type React from 'react'
import '../assets/style.css'

type ButtonProps = {
    children: React.ReactNode,
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
}

//botão com borda branca e fundo transparente que se repete praticamente no protótipo inteiro, n tem erro só usar igual um botão normal
export default function BordedButton({children}:ButtonProps){
    return(
        <button className='border-2 border-white rounded-full px-8 py-1.5 text-white font-bold cursor-pointer'>{children}</button>
    )
}
{/*Se tornou obsoleto
export default function BordedButton({ children, onClick, disabled }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
        className='border-2 border-white rounded-full px-8 py-1.5 text-white font-bold cursor-pointer'>{children}
      className="px-6 py-2 border-2 border-white rounded-lg hover:bg-white hover:text-black transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed">{children}
    </button>
  );
}*/}