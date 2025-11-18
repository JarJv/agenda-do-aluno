import '../assets/style.css'
import {useRef, useState, useEffect} from 'react';
import {SquarePenIcon} from 'lucide-react'
import {CaretLeft, CaretRight} from '@phosphor-icons/react'

export default function Notas(){
    const [index, setIndex] = useState(0);
    const [slideSize, setSlideSize] = useState(0);
    const [currentSlide, setCurrentSlide] = useState(0);
    const slideRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(slideRef.current) {
            const size = slideRef.current.offsetWidth;
            setSlideSize(size);
        }
    }, []);

    const offset = index * -slideSize;

    function encreaseCarr(){
        if(currentSlide<3){
            setCurrentSlide(currentSlide+1)
            setIndex(index+1)
        }
    }
    function decreaseCarr(){
        if(currentSlide>0){
            setCurrentSlide(currentSlide-1)
            setIndex(index-1)
        }
    }

    return(
        <main className='px-10 py-8 flex flex-col gap-y-8'>
            <section className='flex text-white gap-x-2 font-extrabold items-end'>
                <h1 className='text-3xl'>NOTAS</h1>
                <SquarePenIcon size={32}/>
            </section>
            <section className='flex justify-between rounded-full text-white bg-(--c4) font-bold text-center'>
                <button onClick={()=>{decreaseCarr()}} className='rounded-full ml-0 p-1 flex justify-center items-center'>
                    <CaretLeft weight='fill' size={32}/>
                </button>
                <div className="w-1/3 rounded-full overflow-hidden">
                    <div
                    className={`h-full flex flex-row flex-nowrap transition-transform duration-300`}
                    style={{ transform: `translateX(${offset}px)` }}
                    >
                    <div ref={slideRef} className='w-full shrink-0 rounded-full px-3 py-1 text-sm text-nowrap text-white bg-(--c2) font-bold flex justify-center items-center'>
                        1 Bimestre
                    </div>
                    <div className='w-full shrink-0 rounded-full px-3 py-1 text-sm text-nowrap text-white bg-(--c2) font-bold flex justify-center items-center'>
                        2 Bimestre
                    </div>
                    <div className='w-full shrink-0 rounded-full px-3 py-1 text-sm text-nowrap text-white bg-(--c2) font-bold flex justify-center items-center'>
                        3 Bimestre
                    </div>
                    <div className='w-full shrink-0 rounded-full px-3 py-1 text-sm text-nowrap text-white bg-(--c2) font-bold flex justify-center items-center'>
                        4 Bimestre
                    </div>
                    </div>

                </div>
                <button onClick={()=>{encreaseCarr()}} className='rounded-full ml-0 p-1 flex justify-center items-center'>
                    <CaretRight weight='fill' size={32}/>
                </button>
            </section>
            <section>
                <div className='grid grid-flow-cols grid-cols-3 gap-2 text-white font-bold'>
                    <article className='col-span-2 bg-(--c4) p-4 rounded-md flex justify-center items-center'>
                        Integração e Entrega Contínua
                    </article>
                    <article className='col-span-1 bg-(--c4) p-4 rounded-md flex justify-center items-center text-xl'>
                        10.0
                    </article>
                </div>
            </section>
        </main>
    )
}