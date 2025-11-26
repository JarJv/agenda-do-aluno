import '../assets/style.css'
import { CircleUserRound } from "lucide-react"
import BordedButton from '../components/BordedButton.tsx'
import EmptySection from '../components/EmptySection.tsx'

export default function PerfilEditar() {
    return (
        <div className='p-7'>
            <div className='flex items-center gap-2 px-4'>
                <p className='text-white font-black text-3xl uppercase'>Perfil</p>
                <CircleUserRound size={32} color="#fff" />
            </div>

            <div className='mt-[15%] bg-(--c4) w-full p-4 rounded-lg'>
                <div>
                    <div className='flex justify-center'>
                        <img src='/public/imgTeste.jpg' 
                        className='rounded-lg w-[50%]'></img>
                    </div>
                    
                    <p className='text-white font-black mt-[5%]'>Nome:</p>
                    <input id='nomeInput' className='text-white font-semibold text-sm p-2
                    w-full rounded-lg bg-(--c1) border-transparent
                    focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50'
                    placeholder='Digite o seu nome'></input>

                    <div className='flex gap-5 justify-between'>
                        <div>
                            <p className='text-white font-black mt-[5%]'>Idade:</p>
                            <input id='idadeInput' className='text-white font-semibold text-sm p-2
                            w-full rounded-lg bg-(--c1) border-transparent
                            focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50'
                            placeholder='Idade'></input>
                        </div>

                        <div>
                            <p className='text-white font-black mt-[5%]'>Contato:</p>
                            <input id='contatoInput' className='text-white font-semibold text-sm p-2
                            w-full rounded-lg bg-(--c1) border-transparent
                            focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50'
                            placeholder='Contato'></input>
                        </div>
                    </div>

                    <p className='text-white font-black mt-[5%]'>Email:</p>
                    <input id='emailInput' className='text-white font-semibold text-sm p-2
                    w-full rounded-lg bg-(--c1) border-transparent
                    focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50'
                    placeholder='Digite o seu email'></input>

                    <p className='text-white font-black mt-[5%]'>Curso:</p>
                    <input id='cursoInput' className='text-white font-semibold text-sm p-2
                    w-full rounded-lg bg-(--c1) border-transparent
                    focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50'
                    placeholder='Digite o seu curso'></input>
                    

                    <p className='text-white font-black mt-[5%]'>Nível:</p>
                    <input id='nivelInput' className='text-white font-semibold text-sm p-2
                    w-[45%] rounded-lg bg-(--c1) border-transparent
                    focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50'
                    placeholder='Nível do curso'></input>

                </div>
            </div>
            <div className='flex justify-between mt-[8%]'>
                <a href='/perfil'><BordedButton>
                    Voltar
                </BordedButton></a>
                <BordedButton>
                    Gravar
                </BordedButton>
            </div>
            <EmptySection/>
        </div>
    )
}