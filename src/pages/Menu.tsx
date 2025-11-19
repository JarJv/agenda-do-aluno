import "../assets/style.css";
import {
  Calendar,
  Clock,
  Users,
  GraduationCap,
  CheckSquare,
  FileText,
  NotebookPen,
  UserCircle,
  Settings,
  MoreHorizontal,
} from "lucide-react";
import { MenuItem } from "../components/MenuItem";
import  BordedButton from '../components/BordedButton';

export default function Menu() {
  return (
    // Container com padding para não colar nas bordas
    <div className="flex flex-col w-full h-full px-6 py-4">
      {/* 1. Barra de ícones superior (Config e 3 pontos) 
          Eles ficam DENTRO da página, logo abaixo do Header roxo */}
      <div className="flex justify-between items-center mb-6 text-white">
        <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <Settings size={24} />
        </button>
        <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <MoreHorizontal size={24} />
        </button>
      </div>

      {/* 2. Grid de Botões */}
      <div className="grid grid-cols-2 gap-4">
        <MenuItem icon={Calendar} label="Calendário" />
        <MenuItem icon={Clock} label="Horário" />
        <MenuItem icon={Users} label="Professores" />
        <MenuItem icon={GraduationCap} label="Alunos" />
        <MenuItem icon={CheckSquare} label="Frequência" />
        <MenuItem icon={FileText} label="Notas" />
        <MenuItem icon={NotebookPen} label="Anotações" />
        <MenuItem icon={UserCircle} label="Perfil" />
      </div>

    <div className="flex justify-end mt-8"> 
        <BordedButton>
          Sair
        </BordedButton>
      </div>
    </div>
  );
}
