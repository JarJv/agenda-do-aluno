import { Link } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';

interface MenuItemProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  href?: string;
}

export function MenuItem({ icon: Icon, label, onClick, href }: MenuItemProps) {
  const content = (
    <div className="
      flex flex-col items-center justify-center gap-3 p-4 aspect-square
      bg-[#1e2038] rounded-2xl hover:bg-[#2a2d4d] transition-colors active:scale-95
    ">
      <div className="p-3 rounded-xl bg-[#323558] text-indigo-400 shadow-inner">
        <Icon size={32} strokeWidth={1.5} />
      </div>
      <span className="text-sm font-medium text-gray-200">
        {label}
      </span>
    </div>
  );

  if (href) {
    return <Link to={href}>{content}</Link>;
  }

  return <button onClick={onClick}>{content}</button>;
}