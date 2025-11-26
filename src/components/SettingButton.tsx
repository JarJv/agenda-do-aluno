import type React from 'react'
import '../assets/style.css'

// Propriedades props padrão de um botão HTML (assim ele aceita onClick, disabled, etc.)
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
}

export default function SettingButton({children, ...props}: ButtonProps){
    return(
        <button 
            className='
                w-full 
                bg-(--c4) 
                p-4 
                rounded-md
                flex 
                items-center 
                text-xl 
                gap-x-2 
                text-white 
                font-bold 
                transition 
                duration-200 
                active:scale-102
                active:bg-(--c5)
                cursor-pointer
                disabled:opacity-70 
                disabled:cursor-not-allowed'
            {...props} // O onClick que vem do pai é aplicado aqui
        >
            {children}
        </button>
    )
}