import type React from 'react'
import '../assets/style.css'

type ButtonProps = {
    children: React.ReactNode,
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

//botão com fundo branco que ocupa todo o espaço do container, n tem erro só usar igual um botão normal
export default function WhiteFilledButton({children}:ButtonProps){
    return(
        <button className='w-full rounded-full px-8 py-2 text-(--c1) bg-white font-bold'>{children}</button>
    )
}