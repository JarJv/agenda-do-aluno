import type React from 'react'
import '../assets/style.css'

type ButtonProps = {
    children: React.ReactNode,
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

//botão com fundo gradiente do azul escuro pro azul claro, n tem erro só usar igual um botão normal
//Na tela de início, ele vai ocupar todo o espaço do container, caso contrário vai ficar do tamanho que o texto ocupar
export default function BlueGradientButton({children}:ButtonProps){
    return(
        <button className={`${(location.pathname === '/inicio') && 'w-full'} rounded-full px-8 py-2 text-white bg-linear-to-r from-(--c3) to-(--c2) font-bold cursor-pointer`}>{children}</button>
    )
}