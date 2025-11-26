import '../assets/style.css'
import { useState } from "react";
import { Menu, X, CircleUserRound } from "lucide-react";
import { CalendarDots, ClockCountdown, ChalkboardTeacher } from "@phosphor-icons/react";
import { Student, CheckSquareOffset, NotePencil} from "@phosphor-icons/react";
import { Notepad, GearSix, House } from "@phosphor-icons/react";

function NavTop() {

  const [open, setOpen] = useState(false);

    return (
       <div className="relative w-full">
            <nav className="bg-(--c2) w-full py-4 px-5 flex items-start rounded-none justify-between">
                <p className="text-white text-lg">Bem-vindo, {""}
                    <label id="nomeAluno" className="font-bold">
                        Fulana
                    </label>
                </p>
                <button onClick={() => setOpen(true)}>
                <Menu className="text-white w-6 h-6 cursor-pointer" />
                </button>
            </nav>

            <div
                className={`fixed top-0 right-0 h-screen w-[50%] bg-(--c2) text-white shadow-lg transform transition-transform duration-300 z-50 ${
                    open ? "translate-x-0" : "translate-x-full"
                }`}
                >

                <div className="flex justify-between items-center p-4 border-b border-white/20">
                    <h2 className="text-lg font-semibold">Menu</h2>
                    <button onClick={() => setOpen(false)}>
                    <X className="w-6 h-6 cursor-pointer" />
                    </button>
                </div>

                <ul className="flex flex-col gap-4 p-4 text-base">
                    {/*Exemplo de tela selecionada*/}
                    
                    <div className='has-checked:bg-indigo-50 has-checked:text-indigo-900 has-checked:ring-indigo-200 flex items-center py-1 gap-2 bg-white rounded-full px-4'>
                        <House size={28} color="#797FF2" />
                        <a href="/menu"><li className="text-(--c2) font-medium">Menu</li></a>
                    </div>

                    <div className='has-checked:bg-indigo-50 has-checked:text-indigo-900 has-checked:ring-indigo-200 flex items-center py-1 gap-2 px-4'>
                        <CalendarDots size={28} color="#ffffff" />
                        <a href="/calendario"><li className="text-white font-medium">Calendário</li></a> 
                    </div>
                    
                    <div className='flex items-center py-1 gap-2 px-4'>
                        <ClockCountdown size={28} color="#ffffff" />
                        <a href="/horario"><li className="text-white font-medium">Horário</li></a>
                    </div>
                    
                    <div className='flex items-center py-1 gap-2 px-4'>
                        <ChalkboardTeacher size={28} color="#ffffff" />
                        <a href="/professores"><li className="text-white font-medium">Professores</li></a>
                    </div>
                    
                    <div className='flex items-center py-1 gap-2 px-4'>
                        <Student size={28} color="#ffffff" />
                        <a href="/alunos"><li className="text-white font-medium">Alunos</li></a>
                    </div>
                    
                    <div className='flex items-center py-1 gap-2 px-4'>
                        <CheckSquareOffset size={28} color="#ffffff" />
                        <a href="/frequencia"><li className="text-white font-medium">Frequência</li></a>
                    </div>

                    <div className='flex items-center py-1 gap-2 px-4'>
                        <NotePencil size={28} color="#ffffff" />
                        <a href="/notas"><li className="text-white font-medium">Notas</li></a>
                    </div>
                    
                    <div className='flex items-center py-1 gap-2 px-4'>
                        <Notepad size={28} color="#ffffff" />
                        <a href="/anotacao"><li className="text-white font-medium">Anotações</li></a>
                    </div>
                    
                    <div className='flex items-center py-1 gap-2 px-4'>
                        <CircleUserRound size={28} color='#ffffff'/>
                        <a href="/perfil"><li className="text-white font-medium">Perfil</li></a>
                    </div>
                    
                    <div className='flex items-center py-1 gap-2 px-4'>
                        <GearSix size={28} color="#ffffff" />
                        <a href="/configuracao"><li className="text-white font-medium">Configurações</li></a>
                    </div>
                </ul>
                </div>

                {open && (
                <div
                    className="fixed inset-0 bg-black/50 z-40"
                    onClick={() => setOpen(false)}
                />
                )}
        </div>
    )
}

export default NavTop