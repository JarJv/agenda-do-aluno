import '../assets/style.css'
import {useRef, useState, useEffect} from 'react';
import {Pencil, Trash} from "lucide-react";
import {SquarePenIcon} from 'lucide-react'
import {CaretLeft, CaretRight, Plus, X} from '@phosphor-icons/react'
import EmptySection from '../components/EmptySection.tsx';
import api from '../api/axios';

interface Nota {
  id_nota: number;
  disciplina: string;
  nota: string;
  bimestre: number;
}

interface CurrentNota {
  id_nota: number | null;
  disciplina: string;
  nota: string;
  bimestre: number;
}

export default function Notas() {
  const [index, setIndex] = useState(0);
  const [slideSize, setSlideSize] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef<HTMLDivElement>(null);

  const [notes, setNotes] = useState<Nota[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [currentNota, setCurrentNota] = useState<CurrentNota | null>(null);

  const bimestres = ['1 Bimestre', '2 Bimestre', '3 Bimestre', '4 Bimestre'];

  // --- FETCH NOTES
  async function fetchNotes() {
    try {
      setIsLoading(true);
      setError(null);
      const response = await api.get('/notas/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`
        }
      });
      const data = response.data?.data ?? response.data;
      const normalized: Nota[] = (data || []).map((n: any) => ({
        id_nota: n.id_nota ?? n.id,
        disciplina: n.disciplina ?? '',
        nota: (n.nota ?? '').toString(),
        bimestre: n.bimestre ?? 1
      }));
      setNotes(normalized);
    } catch (err) {
      console.error(err);
      setError('Falha ao carregar notas');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if(slideRef.current) setSlideSize(slideRef.current.offsetWidth);
    fetchNotes();
  }, []);

  const offset = index * -slideSize;

  function encreaseCarr() {
    if(currentSlide<3){
      setCurrentSlide(cs => cs+1);
      setIndex(i => i+1);
    }
  }
  function decreaseCarr() {
    if(currentSlide>0){
      setCurrentSlide(cs => cs-1);
      setIndex(i => i-1);
    }
  }

  const currentBimesterNotes = notes.filter(n => n.bimestre === currentSlide + 1);

  // --- Modal criar/editar
  function handleOpenCreateModal() {
    setCurrentNota({id_nota: null, disciplina:'', nota:'', bimestre: currentSlide+1});
    setShowModal(true);
  }

  async function handleOpenEditModal(id:number) {
    try {
      const response = await api.get(`/notas/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`
        }
      });
      const n = response.data?.data ?? response.data;
      setCurrentNota({
        id_nota: n.id_nota ?? n.id,
        disciplina: n.disciplina ?? '',
        nota: (n.nota ?? '').toString(),
        bimestre: n.bimestre ?? currentSlide+1
      });
      setShowModal(true);
    } catch(err) {
      console.error(err);
      alert('Erro ao carregar nota');
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if(!currentNota) return;

    const numeric = Number(currentNota.nota);
    if(currentNota.nota.trim()==='' || Number.isNaN(numeric) || numeric<0 || numeric>10){
      alert('A nota deve ser entre 0 e 10');
      return;
    }

    const payload: any = {};
    if(currentNota.disciplina.trim() !== '') payload.disciplina = currentNota.disciplina;
    if(currentNota.nota.trim() !== '') payload.nota = currentNota.nota.toString();
    if(currentNota.bimestre) payload.bimestre = currentNota.bimestre;

    try {
      if(currentNota.id_nota===null){
        await api.post('/notas/', payload, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token') || ''}` }
        });
      } else {
        await api.put(`/notas/${currentNota.id_nota}`, payload, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token') || ''}` }
        });
      }
      await fetchNotes();
      setShowModal(false);
      setCurrentNota(null);
    } catch(err:any) {
      console.error(err);
      const apiError = err?.response?.data ? JSON.stringify(err.response.data) : err?.message;
      alert(`Erro ao salvar nota: ${apiError}`);
    }
  }

  async function handleDeleteNota(id:number, disciplina:string){
    if(!confirm(`Deletar nota "${disciplina}"?`)) return;
    try{
      await api.delete(`/notas/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token') || ''}` }
      });
      await fetchNotes();
    } catch(err){
      console.error(err);
      alert('Erro ao deletar nota');
    }
  }

  return (
    <main className='px-10 py-8 flex flex-col gap-y-8'>
      <section className='flex text-white gap-x-2 font-extrabold items-end justify-left'>
        <SquarePenIcon size={32}/>
        <h1 className='text-3xl'>NOTAS</h1>
        

      </section>

      <section className='flex justify-between rounded-full text-white bg-(--c4) font-bold text-center'>
        <button onClick={decreaseCarr} className='rounded-full ml-0 p-1 flex justify-center items-center'>
          <CaretLeft weight='fill' size={32}/>
        </button>
        <div className="w-1/3 rounded-full overflow-hidden">
          <div className="h-full flex flex-row flex-nowrap transition-transform duration-300"
               style={{ transform: `translateX(${offset}px)` }}>
            {bimestres.map((b,i)=>(
              <div ref={i===0?slideRef:null} key={i}
                   className='w-full shrink-0 rounded-full px-3 py-1 text-sm text-nowrap text-white bg-(--c2) font-bold flex justify-center items-center'>
                {b}
              </div>
            ))}
          </div>
        </div>
        <button onClick={encreaseCarr} className='rounded-full ml-0 p-1 flex justify-center items-center'>
          <CaretRight weight='fill' size={32}/>
        </button>
      </section>

      <section>
        {isLoading && <p className='text-white text-center'>Carregando...</p>}
        {error && <p className='text-red-500 text-center'>{error}</p>}

        {!isLoading && currentBimesterNotes.length===0 && (
          <p className='text-white text-center opacity-75'>
            Nenhuma nota no {currentSlide+1}º bimestre
          </p>
        )}

        {!isLoading && currentBimesterNotes.length>0 && currentBimesterNotes.map(nota=>(
          <div key={nota.id_nota} className='grid grid-flow-cols grid-cols-3 gap-2 text-white font-bold mb-2'>
            <article className='col-span-2 bg-(--c4) p-4 rounded-xl flex justify-between items-center'>
              {nota.disciplina}
              <div className='flex gap-3'>
                <Pencil className='cursor-pointer' size={18} onClick={()=>handleOpenEditModal(nota.id_nota)} />
                <Trash className='cursor-pointer' size={18} onClick={()=>handleDeleteNota(nota.id_nota, nota.disciplina)} />
              </div>
            </article>
            <article className='col-span-1 bg-(--c4) p-4 rounded-xl flex justify-center items-center text-xl'>
              {Number(nota.nota).toFixed(1)}
            </article>
          </div>
        ))}
      </section>

      <section className='fixed bottom-30 left-0 w-full flex text-white gap-x-2 px-10 font-extrabold items-end justify-between'>
        <button className='border-2 border-white rounded-full p-1.5 text-white font-bold cursor-pointer'
                onClick={handleOpenCreateModal}>
          <Plus size={24} />
        </button>
      </section>
      <EmptySection/>

      {showModal && currentNota && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-6">
          <form onSubmit={handleSubmit} className="bg-[#46498C] w-full max-w-sm rounded-lg p-6 text-white">
            <div className="flex justify-between mb-6">
              <h2 className='text-2xl font-bold'>
                {currentNota.id_nota===null ? "Adicionar Nota" : "Editar Nota"}
              </h2>
              <X size={24} className='cursor-pointer' onClick={()=>setShowModal(false)}/>
            </div>

            <label>Disciplina:</label>
            <input className="w-full bg-[#141640] p-3 rounded mb-4"
                   value={currentNota.disciplina}
                   onChange={e=>setCurrentNota({...currentNota, disciplina:e.target.value})}
                   required />

            <label>Nota:</label>
            <input type="number" step="0.1" min="0" max="10"
                   className="w-full bg-[#141640] p-3 rounded mb-4"
                   value={currentNota.nota}
                   onChange={e=>setCurrentNota({...currentNota, nota:e.target.value})}
                   required />

            <label>Bimestre:</label>
            <select className="w-full bg-[#141640] p-3 rounded mb-6"
                    value={currentNota.bimestre}
                    onChange={e=>setCurrentNota({...currentNota, bimestre:Number(e.target.value)})}>
              <option value={1}>1º Bimestre</option>
              <option value={2}>2º Bimestre</option>
              <option value={3}>3º Bimestre</option>
              <option value={4}>4º Bimestre</option>
            </select>

            <div className="flex justify-end gap-3">
              <button type="button" className="px-4 py-2 border-2 rounded-full"
                      onClick={()=>setShowModal(false)}>Cancelar</button>
              <button type="submit" className="px-4 py-2 bg-white text-[#141640] rounded-full font-bold">
                {currentNota.id_nota===null?"Criar":"Salvar"}
              </button>
            </div>
          </form>
        </div>
      )}

    </main>
  )
}
