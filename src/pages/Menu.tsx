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
import EmptySection from "../components/EmptySection.tsx";

export default function Menu() {
  return (
    // Container com padding para não colar nas bordas
    <div className="flex flex-col w-full h-full px-6 py-4">

      {/* Grid de Botões */}
      <div className="grid grid-cols-2 gap-4">
        <MenuItem href="/calendario" icon={Calendar} label="Calendário"></MenuItem>
        <MenuItem href="/horario" icon={Clock} label="Horário" />
        <MenuItem href="/professores" icon={Users} label="Professores" />
        <MenuItem href="/alunos" icon={GraduationCap} label="Alunos" />
        <MenuItem href="/frequencia" icon={CheckSquare} label="Frequência" />
        <MenuItem href="/notas" icon={FileText} label="Notas" />
        <MenuItem href="/anotacoes" icon={NotebookPen} label="Anotações" />
        <MenuItem href="/perfil" icon={UserCircle} label="Perfil" />
        <MenuItem href="/configuracao" icon={Settings} label="Configurações"/>
      </div>
      
      <EmptySection/>
    </div>
  );
}
