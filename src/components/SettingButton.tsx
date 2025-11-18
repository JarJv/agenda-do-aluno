import type React from 'react'
import '../assets/style.css'

type ButtonProps = {
    children: React.ReactNode
}

export default function SettingButton({children}:ButtonProps){
    return(
        <section className='flex w-full flex-wrap gap-y-4'>
                        <div className='
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
                        active:bg-(--c5)'>
                            {children}
                        </div>
                    </section>
                    
    )
}