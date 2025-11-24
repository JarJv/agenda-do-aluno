import '../assets/style.css'
import {XCircle} from '@phosphor-icons/react';

export default function ToastWrong(){
    return(
        <article className='bg-white w-60 flex justify-center items-center gap-x-2 p-4 rounded-md absolute bottom-30 end-5'>
            <XCircle size={48} color='#ff0000'/>
            <p className='2xl font-bold'>Erro ao salvar seu horário</p>
        </article>
    )
}