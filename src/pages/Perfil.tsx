import '../assets/style.css'
import { CircleUserRound } from "lucide-react"
import { NotePencil } from "@phosphor-icons/react"
import BordedButton from '../components/BordedButton.tsx'

export default function Perfil() {
    return (
        <div className='p-7'>
            <div className='flex items-center gap-2 px-4'>
                <p className='text-white font-black text-3xl uppercase'>Perfil</p>
                <CircleUserRound size={32} color="#fff" />
            </div>

            <div className='mt-[15%] bg-(--c4) w-full p-4 rounded-lg'>
                <div>
                    <div className='flex'>
                        <img src='/public/imgTeste.jpg' 
                        className='rounded-lg w-[50%]'></img>
                        
                        <div className='flex-col px-4 gap-4'>
                            <p className='text-white font-black mt-[3%]'>Sportacus Ferreira Oliveira Júnior</p>
                            <p className='mt-[20%] text-white font-semibold'>26 anos</p>
                        </div>
                    </div>

                    <p className='text-white font-black mt-[5%]'>Email:</p>
                    <p className='text-white ml-[4%] font-semibold text-sm'>sportacus.ferreira@fatec.sp.gov.br</p>

                    <p className='text-white font-black mt-[5%]'>Curso:</p>
                    <p className='text-white ml-[4%] font-semibold text-sm'>Desenvolvimento de Software Multiplataforma</p>
                    
                    <div className='flex justify-between pr-4 mt-[5%]'>
                        <div>
                            <p className='text-white font-black'>Nível:</p>
                            <p className='text-white ml-[4%] font-semibold text-sm w-full'>4º Semestre</p>
                        </div>

                        <div>
                            <p className='text-white font-black'>Contato:</p>
                            <p className='text-white ml-[4%] font-semibold text-sm w-full'>(11) 94002-8922</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex justify-between mt-[8%]'>
                <NotePencil size={35} color="#ffffff" />
                <BordedButton>
                    Gravar
                </BordedButton>
            </div>
        </div>
    )
}