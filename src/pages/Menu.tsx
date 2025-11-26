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
} from "lucide-react";
import "../assets/style.css";
import { MenuItem } from "../components/MenuItem";
import EmptySection from "../components/EmptySection.tsx";

const menuItems = [
  { href: "/calendario", icon: Calendar, label: "Calendário" },
  { href: "/horario", icon: Clock, label: "Horário" },
  { href: "/professores", icon: Users, label: "Professores" },
  { href: "/alunos", icon: GraduationCap, label: "Alunos" },
  { href: "/frequencia", icon: CheckSquare, label: "Frequência" },
  { href: "/notas", icon: FileText, label: "Notas" },
  { href: "/anotacoes", icon: NotebookPen, label: "Anotações" },
  { href: "/perfil", icon: UserCircle, label: "Perfil" },
  { href: "/configuracao", icon: Settings, label: "Configurações" },
];

export default function Menu() {
  return (
    <div className="flex flex-col w-full h-full px-6 py-4">
      <div className="grid grid-cols-2 gap-4">
        {menuItems.map((item) => (
          <MenuItem
            key={item.href}
            href={item.href}
            icon={item.icon}
            label={item.label}
          />
        ))}
      </div>
      <EmptySection />
    </div>
  );
}
