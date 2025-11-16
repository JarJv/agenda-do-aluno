import { useState } from 'react'
import freqIcon from '../assets/img/freq-icon.jpg'
import CirculoProgresso from '../components/circuloProgresso'

export default function Frequencia(){
    const [freq] = useState(75);

    return(
        <section>
            
            <div className="flex flex-row gap-1 p-4 w-full my-8 items-center justify-center">
                <h1 className="text-4xl text-white font-bold p-2">Frequência</h1>
                <img className="w-10 h-10" src={freqIcon} alt="Frequência" />
            </div>

            <div className="flex flex-row justify-self-center my-8 w-3/5 h-12 p-4 rounded-3xl bg-[#457B9D]">

            </div>
            
            <CirculoProgresso porcentagem={freq}/>


        </section>
    )
}