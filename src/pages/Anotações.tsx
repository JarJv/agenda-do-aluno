  /* PAGINA COMPLETAMENTE ALTERADA PARA CONSEGUIR INTEGRAR A API*/


import { useState, useEffect } from "react";
import { Pencil, Trash, Plus, NotebookPen } from "lucide-react";
import api from "../api/axios";

interface Card {
  id_anotacao: number;
  titulo: string;
  anotacao: string;
  dt_anotacao: string;
}

export default function Anotacoes() {
  const [cards, setCards] = useState<Card[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCardId, setEditingCardId] = useState<number | null>(null);
  const [formTitle, setFormTitle] = useState("");
  const [formContent, setFormContent] = useState("");

  /* Listar anotações */
  useEffect(() => {
    api.get("/anotacao/")
      .then(res => setCards(res.data.data || []))
      .catch(err => {
        console.error("Erro ao buscar anotações:", err);
        setCards([]);
      });
  }, []);

  /* Abrir modal para criar */
  function openCreateModal() {
    setEditingCardId(null);
    setFormTitle("");
    setFormContent("");
    setShowModal(true);
  }

  /* Abrir modal para editar */
  function openEditModal(id: number) {
    api.get(`/anotacao/${id}`)
      .then(res => {
        const card = res.data.data;
        setEditingCardId(id);
        setFormTitle(card.titulo);
        setFormContent(card.anotacao);
        setShowModal(true);
      })
      .catch(err => console.error("Erro ao obter anotação:", err));
  }

  /* Salvar anotação */
  function saveCard(e: React.FormEvent) {
    e.preventDefault();
    if (!formTitle.trim() || !formContent.trim()) return;

    const payload = { titulo: formTitle, anotacao: formContent };

    if (editingCardId === null) {
      // Criar nova anotação
      api.post("/anotacao/", payload)
        .then(res => {
          const newCard = res.data.data;
          if (newCard) setCards(prev => [newCard, ...prev]);
        })
        .catch(err => console.error("Erro ao criar anotação:", err))
        .finally(() => setShowModal(false));
    } else {
      // Editar 
      api.put(`/anotacao/${editingCardId}`, payload)
        .then(res => {
          const updatedCard = res.data.data;
          if (updatedCard) {
            setCards(prev => prev.map(c => (c.id_anotacao === editingCardId ? updatedCard : c)));
          }
        })
        .catch(err => console.error("Erro ao editar anotação:", err))
        .finally(() => setShowModal(false));
    }
  }

  /* Deletar anotação */
  function deleteCard(id: number) {
    if (!window.confirm("Tem certeza que deseja deletar esta anotação?")) return;

    api.delete(`/anotacao/${id}`)
      .then(() => setCards(prev => prev.filter(c => c.id_anotacao !== id)))
      .catch(err => console.error("Erro ao deletar anotação:", err));
  }

  return (
    <div className="min-h-screen bg-[#141640] flex flex-col">
      <div className="p-6 flex-1">
        <div className="flex items-center gap-2 mb-6">
          <h1 className="Titulo text-3xl font-bold text-white">Anotações</h1>
          <NotebookPen size={32} color="#fff" />
        </div>

        <div className="flex flex-col gap-4">
          {cards.length > 0 ? (
            cards.map(c => (
              <AnnotationCard
                key={c.id_anotacao}
                title={c.titulo}
                content={c.anotacao}
                date={c.dt_anotacao}
                onEdit={() => openEditModal(c.id_anotacao)}
                onDelete={() => deleteCard(c.id_anotacao)}
              />
            ))
          ) : (
            <p className="text-white opacity-75 mt-8 text-center">Nenhuma anotação encontrada.</p>
          )}
        </div>
      </div>

      <div className="fixed bottom-24 left-0 w-full px-8 flex justify-end items-center z-50">
        <button
          className="w-12 h-12 rounded-full border-2 border-white bg-[#46498C] text-white flex items-center justify-center shadow-lg hover:bg-[#56599C] transition-colors"
          onClick={openCreateModal}
        >
          <Plus size={28} />
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-6 z-50">
          <form
            onSubmit={saveCard}
            className="bg-[#46498C] w-full max-w-sm rounded-lg p-6 text-white shadow-xl"
          >
            <h2 className="text-2xl font-bold mb-6">
              {editingCardId === null ? "Criar Nova Anotação" : "Editar Anotação"}
            </h2>

            <div className="mb-4">
              <label htmlFor="formTitle" className="block font-medium mb-1">Título:</label>
              <input
                id="formTitle"
                className="w-full bg-[#141640] p-3 border-none rounded text-white focus:outline-none focus:ring-2 focus:ring-[#797FF2]"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="formContent" className="block font-medium mb-1">Anotação:</label>
              <textarea
                id="formContent"
                className="w-full bg-[#141640] p-3 border-none rounded text-white focus:outline-none focus:ring-2 focus:ring-[#797FF2]"
                value={formContent}
                onChange={(e) => setFormContent(e.target.value)}
                required
              />
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button
                type="button"
                className="px-4 py-2 rounded-full border-2 border-white text-white hover:bg-white/10 transition-colors"
                onClick={() => setShowModal(false)}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-white rounded-full font-bold text-[#141640] hover:bg-gray-200 transition-colors"
              >
                {editingCardId === null ? "Criar" : "Salvar"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

function AnnotationCard({
  title,
  content,
  date,
  onEdit,
  onDelete,
}: {
  title: string;
  content: string;
  date: string;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="bg-[#46498C] p-4 rounded-lg flex justify-between items-center text-white">
      <div className="flex items-center gap-4">
        <NotebookPen size={30} color="#fff" />
        <div>
          <p className="FontBold font-bold">{title}</p>
          <p className="FontePadrao text-sm opacity-80">{date}</p>
          <p className="text-sm opacity-70">{content}</p>
        </div>
      </div>
      <div className="flex gap-3">
        <Pencil
          size={22}
          color="#fff"
          className="cursor-pointer hover:opacity-80 transition-opacity"
          onClick={onEdit}
        />
        <Trash
          size={22}
          color="#fff"
          className="cursor-pointer hover:text-red-400 transition-colors"
          onClick={onDelete}
        />
      </div>
    </div>
  );
}
