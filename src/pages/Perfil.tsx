import '../assets/style.css'
import { CircleUserRound } from "lucide-react"
import { NotePencil } from "@phosphor-icons/react"
import EmptySection from '../components/EmptySection.tsx'
import { useAuth } from '../context/AuthContext'

export default function Perfil() {
    const { usuario } = useAuth();

    const calcularIdade = (dataNascimento: string | undefined) => {
        if (!dataNascimento) return null;
        const hoje = new Date();
        const nascimento = new Date(dataNascimento);
        let idade = hoje.getFullYear() - nascimento.getFullYear();
        const mes = hoje.getMonth() - nascimento.getMonth();
        if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
            idade--;
        }
        return idade;
    };

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
                            <p className='text-white font-black mt-[3%]'>{usuario?.nome || 'Nome não informado'}</p>
                            <p className='mt-[20%] text-white font-semibold'>
                                {calcularIdade(usuario?.dt_nascimento) ? `${calcularIdade(usuario?.dt_nascimento)} anos` : 'Idade não informada'}
                            </p>
                        </div>
                    </div>

                    <p className='text-white font-black mt-[5%]'>Email:</p>
                    <p className='text-white ml-[4%] font-semibold text-sm'>{usuario?.email || 'Email não informado'}</p>

                    <p className='text-white font-black mt-[5%]'>Curso:</p>
                    <p className='text-white ml-[4%] font-semibold text-sm'>{usuario?.nome_curso || 'Curso não informado'}</p>
                    
                    <div className='flex justify-between pr-4 mt-[5%]'>
                        <div>
                            <p className='text-white font-black'>Bimestre:</p>
                            <p className='text-white ml-[4%] font-semibold text-sm w-full'>
                                {usuario?.bimestre ? `${usuario.bimestre}º Bimestre` : 'Não informado'}
                            </p>
                        </div>

                        <div>
                            <p className='text-white font-black'>Contato:</p>
                            <p className='text-white ml-[4%] font-semibold text-sm w-full'>{usuario?.tel_celular || 'Não informado'}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex justify-between mt-[8%]'>
                <a href='/perfileditar'><NotePencil size={35} color="#ffffff" /></a>
            </div>
            <EmptySection/>
        </div>
    )
}