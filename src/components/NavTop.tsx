import '../assets/style.css'
import { useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, CircleUserRound } from "lucide-react";
import { CalendarDots, ClockCountdown, ChalkboardTeacher } from "@phosphor-icons/react";
import { Student, CheckSquareOffset, NotePencil } from "@phosphor-icons/react";
import { Notepad, GearSix, House } from "@phosphor-icons/react";

const navItems = [
    { icon: House, label: "Menu", href: "/menu", isHome: true },
    { icon: CalendarDots, label: "Calendário", href: "/calendario" },
    { icon: ClockCountdown, label: "Horário", href: "/horario" },
    { icon: ChalkboardTeacher, label: "Professores", href: "/professores" },
    { icon: Student, label: "Alunos", href: "/alunos" },
    { icon: CheckSquareOffset, label: "Frequência", href: "/frequencia" },
    { icon: NotePencil, label: "Notas", href: "/notas" },
    { icon: Notepad, label: "Anotações", href: "/anotacoes" },
    { icon: CircleUserRound, label: "Perfil", href: "/perfil" },
    { icon: GearSix, label: "Configurações", href: "/configuracao" },
];

function NavTop() {
    const [open, setOpen] = useState(false);
    const location = useLocation();

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
                className={`fixed top-0 right-0 h-screen w-[50%] bg-(--c2) text-white shadow-lg transform transition-transform duration-300 z-50 ${open ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="flex justify-between items-center p-4 border-b border-white/20">
                    <h2 className="text-lg font-semibold">Menu</h2>
                    <button onClick={() => setOpen(false)}>
                        <X className="w-6 h-6 cursor-pointer" />
                    </button>
                </div>

                <ul className="flex flex-col gap-4 p-4 text-base">
                    {navItems.map((item) => {
                        const IconComponent = item.icon;
                        const isActive = location.pathname === item.href;
                        const iconColor = isActive ? "#797FF2" : "#ffffff";
                        const itemClass = isActive
                            ? 'has-checked:bg-indigo-50 has-checked:text-indigo-900 has-checked:ring-indigo-200 flex items-center py-1 gap-2 bg-white rounded-full px-4'
                            : 'flex items-center py-1 gap-2 px-4';

                        return (
                            <Link key={item.href} to={item.href} onClick={() => setOpen(false)}>
                                <div className={itemClass}>
                                    <IconComponent size={28} color={iconColor} />
                                    <li className={isActive ? "text-(--c2) font-medium" : "text-white font-medium"}>
                                        {item.label}
                                    </li>
                                </div>
                            </Link>
                        );
                    })}
                </ul>
            </div>

            {open && (
                <div
                    className="fixed inset-0 bg-black/50 z-40"
                    onClick={() => setOpen(false)}
                />
            )}
        </div>
    );
}

export default NavTop