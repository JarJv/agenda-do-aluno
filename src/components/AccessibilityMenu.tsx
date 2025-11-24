// AccessibilityMenu.tsx
import React, { useEffect, useRef, useState } from "react";
import {
  PersonArmsSpread,
  TextAUnderline,
  TextT,
  CircleHalf,
  HandPalm,
  SpeakerHigh,
} from "@phosphor-icons/react";

export default function AccessibilityMenu(): React.JSX.Element {

  const [open, setOpen] = useState(false);
  const [fontPercent, setFontPercent] = useState<number>(() => {
    try {
      const computed = typeof window !== "undefined"
        ? parseFloat(getComputedStyle(document.documentElement).fontSize) / 16 * 100
        : 100;
      return Number.isFinite(computed) ? Math.round(computed) : 100;
    } catch {
      return 100;
    }
  });

  const [highContrast, setHighContrast] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    try {
      document.documentElement.style.fontSize = `${fontPercent}%`;
    } catch {}
  }, [fontPercent]);

  // Alto contraste
  useEffect(() => {
    try {
      if (highContrast) document.documentElement.classList.add("high-contrast");
      else document.documentElement.classList.remove("high-contrast");
    } catch {}
  }, [highContrast]);

  const increaseFont = () => setFontPercent((p) => Math.min(200, p + 10));
  const decreaseFont = () => setFontPercent((p) => Math.max(60, p - 10));
  const toggleContrast = () => setHighContrast((c) => !c);

  // Carregar VLibras
 const loadVLibras = () => {
  if (typeof window === "undefined") return;

  if (document.getElementById("vlibras-script")) return;

  const script = document.createElement("script");
  script.id = "vlibras-script";
  script.src = "https://vlibras.gov.br/app/vlibras-plugin.js";
  script.async = true;

  script.onload = () => {
    // Cria um container para o widget, se não existir
    if (!document.getElementById("vlibras-widget-container")) {
      const div = document.createElement("div");
      div.id = "vlibras-widget-container";
      document.body.appendChild(div);
    }

    if (!(window as any).VLibrasWidget && (window as any).Vlibras) {
      (window as any).VLibrasWidget = new (window as any).Vlibras.Widget(
        "https://vlibras.gov.br/app"
      );
    }
  };

  document.body.appendChild(script);
};


  // Ler a página em voz alta
  const speakPage = () => {
    try {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) {
        console.warn("SpeechSynthesis não disponível neste ambiente.");
        return;
      }
      const text = document.body.innerText || "";
      if (!text.trim()) return;
      const utter = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utter);
    } catch (err) {
      console.error("Erro ao usar SpeechSynthesis:", err);
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="Abrir menu de acessibilidade"
        onClick={() => setOpen((v) => !v)}
        className="cursor-pointer transform duration-100 active:scale-110 p-1 focus:outline-none focus:ring-2 focus:ring-white/60 rounded-full"
      >
        <PersonArmsSpread size={32} color="#fff" weight="fill" aria-hidden="true" />
      </button>

      {open && (
        <div
          role="menu"
          aria-label="Opções de acessibilidade"
          className="absolute bottom-14 right-0 bg-[#46498C] text-white rounded-xl shadow-lg w-52 p-3 z-50"
        >
          <button
            role="menuitem"
            onClick={increaseFont}
            className="flex items-center gap-2 w-full px-2 py-2 rounded-full hover:bg-[#797FF2] transition-colors duration-150"
            aria-label="Aumentar fonte"
            type="button"
          >
            <TextAUnderline size={20} aria-hidden="true" weight="bold" /> 
            <span className="font-semibold">Aumentar fonte</span>
          </button>

          <button
            role="menuitem"
            onClick={decreaseFont}
            className="flex items-center gap-2 w-full px-2 py-2 rounded-full hover:bg-[#797FF2] transition-colors duration-150"
            aria-label="Diminuir fonte"
            type="button"
          >
            <TextT size={20} aria-hidden="true" weight="bold" /> 
            <span className="font-semibold">Diminuir fonte</span>
          </button>

          <button
            role="menuitem"
            onClick={toggleContrast}
            className="flex items-center gap-2 w-full px-2 py-2 rounded-full hover:bg-[#797FF2] transition-colors duration-150"
            aria-pressed={highContrast}
            aria-label="Ativar alto contraste"
            type="button"
          >
            <CircleHalf size={20} aria-hidden="true" weight="bold" /> 
            <span className="font-semibold">Alto contraste</span>
          </button>

          <button
            role="menuitem"
            onClick={loadVLibras}
            className="flex items-center gap-2 w-full px-2 py-2 rounded-full hover:bg-[#797FF2] transition-colors duration-150"
            aria-label="Ativar VLibras"
            type="button"
          >
            <HandPalm size={20} aria-hidden="true" weight="bold" /> 
            <span className="font-semibold">VLibras</span>
          </button>

          <button
            role="menuitem"
            onClick={speakPage}
            className="flex items-center gap-2 w-full px-2 py-2 rounded-full hover:bg-[#797FF2] transition-colors duration-150"
            aria-label="Ler página em voz alta"
            type="button"
          >
            <SpeakerHigh size={20} aria-hidden="true" weight="bold" /> 
            <span className="font-semibold">Ler texto</span>
          </button>
        </div>
      )}
    </div>
  );
}
