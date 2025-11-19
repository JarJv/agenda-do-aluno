import { Pencil, Trash, Plus, NotebookPen} from "lucide-react";
import {Notepad} from "@phosphor-icons/react";
import BordedButton from "../components/BordedButton";

export default function Anotacoes() {
  return (
    <div className="min-h-screen bg-[#141640] flex flex-col">

      <div className="p-6 flex-1">
        {/* Título */}
        <div className="flex items-center gap-2 mb-6">
          <h1 className="Titulo">
            Anotações
          </h1>
          <Notepad size={32} weight="bold" className="Titulo"/>
        </div>

        <div className="flex flex-col gap-4">

          <AnnotationCard
            title="Teste"
            date="11/11/2025"
          />

          <AnnotationCard
            title="Teste 2"
            date="12/11/2025"
          />
          <AnnotationCard
            title="Teste 3"
            date="08/11/2025"
          />

        </div>

        <div className="flex justify-between items-center mt-10 px-8">
          <button className="w-12 h-12 rounded-full border-2 border-white text-white flex items-center justify-center">
            <Plus size={28} />
          </button>

        <BordedButton>
            Gravar
        </BordedButton>
        </div>
      </div>
    </div>
  );
}

/* --- COMPONENTE CARD --- */

function AnnotationCard({ title, date }: { title: string; date: string }) {
  return (
    <div className="bg-[#323558] p-4 rounded-lg flex justify-between items-center">

      <div className="ali flex items-center gap-4">
        <div>
           <NotebookPen size={30} color="#fff" />
        </div>
        <div>
            <p className="FontBold">{title}</p>
            <p className="FontePadrao">{date}</p>
        </div>
      </div>

      <div className="flex gap-3">
        <Pencil size={22} color="#fff" className="cursor-pointer" />
        <Trash size={22} color="#fff" className="cursor-pointer" />
      </div>
    </div>
  );
}

