import '../assets/style.css'
import {CheckCircle} from '@phosphor-icons/react';

export default function ToastWrong(){
    return(
        <article className='bg-white w-60 flex justify-center items-center gap-x-2 p-4 rounded-md absolute bottom-30 end-5'>
            <CheckCircle size={48} color='#00ff00'/>
            <p className='2xl font-bold'>Seu horário foi salvo com sucesso!</p>
        </article>
    )
}