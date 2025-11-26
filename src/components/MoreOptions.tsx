import { useEffect, useRef, useState } from "react";
import { MoreHorizontal } from "lucide-react";

export function MoreOptions() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fecha o dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      
      {/* Botão */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="p-2 hover:bg-white/10 rounded-full transition-colors">
        <MoreHorizontal size={24} />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-lg shadow-lg overflow-hidden border border-gray-200 z-50">
          <button
            className="w-full text-left px-4 py-2 hover:bg-gray-100 transition"
            onClick={() => alert("Ajuda")}>
            Ajuda
          </button>

          <button
            className="w-full text-left px-4 py-2 hover:bg-gray-100 transition"
            onClick={() => alert("Fale Conosco")}>
            Fale Conosco
          </button>
        </div>
      )}
    </div>
  );
}