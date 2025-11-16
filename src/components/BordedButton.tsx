import type React from 'react'
import '../assets/style.css'

type ButtonProps = {
    children: React.ReactNode
}

//botão com borda branca e fundo transparente que se repete praticamente no protótipo inteiro, n tem erro só usar igual um botão normal
export default function BordedButton({children}:ButtonProps){
    return(
        <button className='border-2 border-white rounded-full px-8 py-1.5 text-white font-bold cursor-pointer'>{children}</button>
    )
}