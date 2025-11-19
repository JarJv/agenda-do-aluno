import type { LucideIcon } from 'lucide-react';

interface MenuItemProps {
  icon: LucideIcon; 
  label: string;
  onClick?: () => void;
}

export function MenuItem({ icon: Icon, label, onClick }: MenuItemProps) {
  return (
    <button 
      onClick={onClick}
      className="flex flex-col items-center justify-center gap-3 p-4 aspect-square bg-[#1e2038] rounded-2xl hover:bg-[#2a2d4d] transition-colors active:scale-95"
    >
      {/* Container do Ícone com gradiente simulado via texto/cor */}
      <div className="p-3 rounded-xl bg-[#323558] text-indigo-400 shadow-inner">
        <Icon size={32} strokeWidth={1.5} />
      </div>
      
      <span className="text-sm font-medium text-gray-200">
        {label}
      </span>
    </button>
  );
}