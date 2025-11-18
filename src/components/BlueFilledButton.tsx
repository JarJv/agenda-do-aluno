import type React from 'react'
import '../assets/style.css'

type ButtonProps = {
    children: React.ReactNode
}

//botão com fundo azul estilo aquele de "entrar" na tela de login do Figma, n tem erro só usar igual um botão normal
export default function BlueFilledButton({children}:ButtonProps){
    return(
        <button className='rounded-full px-8 py-2 text-white bg-(--c2) font-bold'>{children}</button>
    )
} 