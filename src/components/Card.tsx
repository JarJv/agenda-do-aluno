import { Pencil, Trash, NotebookPen} from "lucide-react";
import type React from 'react'

export default function AnnotationCard({ title, date }: { title: string; date: string }) {
  return (
    <div className="bg-[#46498C] p-4 rounded-lg flex justify-between items-center">

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