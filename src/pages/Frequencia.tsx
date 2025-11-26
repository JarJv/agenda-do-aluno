import freqIcon from '../assets/img/freq-icon.png'
import matIcon from '../assets/img/materiaIcon.png'
import CirculoProgresso from '../components/circuloProgresso'
import EmptySection from '../components/EmptySection.tsx';
import { useEffect } from "react";
import { useFrequencia } from "../context/FrequenciaContext";

export default function Frequencia() {
    const { faltas, atualizarFaltas } = useFrequencia();

    useEffect(() => {
        atualizarFaltas();  // força atualização ao abrir a tela
    }, []);

    const diasLetivos = 50;
    const porcentagem = Math.round(((diasLetivos - faltas) / diasLetivos) * 100);

    const nomeSelecionado = "Global";

    return(
        <section className="flex flex-col items-center px-4 pb-10 min-h-screen">
            
            <div className="flex flex-row flex-wrap gap-x-2 p-4 w-full my-10 items-center justify-center text-center">
                <h1 className="flex text-white font-extrabold items-end justify-center text-5xl">Frequência</h1>
                <img className="w-10 min-h-10 h-auto" src={freqIcon} alt="Frequência" />
            </div>

            <div className="flex flex-row justify-self-center mt-0 mb-10 items-center justify-center m-0 min-w-1/6 min-h-12 h-auto py-2 rounded-3xl bg-(--c2)">
                <p className="text-xl text-white center">
                    {nomeSelecionado}
                </p>
            </div>

            <CirculoProgresso 
                className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56"
                porcentagem={porcentagem}
            />

            <div className="my-20 flex flex-col gap-3 w-full max-w-full sm:max-w-[90%] md:max-w-2/3 lg:max-w-2/5 mx-auto">
                <div className="bg-(--c3) flex flex-row p-3 w-full min-h-[72px] h-auto rounded-xl gap-3 items-center flex-nowrap">
                    <img className="w-10 min-h-10 h-auto" src={matIcon} alt="Calendário"/>
                    <ul className="text-white ">
                        <li className="text-xl font-bold">Terça</li>
                        <li>25/11/2025</li>
                    </ul>
                    
                </div>

                <div className="bg-(--c3) flex flex-row p-3 w-full min-h-[72px] h-auto rounded-xl gap-3 items-center flex-nowrap">
                    <img className="w-10 min-h-10 h-auto" src={matIcon} alt="Calendário"/>
                    <ul className="text-white">
                        <li className="text-xl font-bold">Quarta</li>
                        <li>26/11/2025</li>
                    </ul>
                    
                </div>

                <div className="bg-(--c3) flex flex-row p-3 w-full min-h-[72px] h-auto rounded-xl gap-3 items-center flex-nowrap">
                    <img className="w-10 min-h-10 h-auto" src={matIcon} alt="Calendário"/>
                    <ul className="text-white">
                        <li className="text-xl font-bold">Quinta</li>
                        <li>27/11/2025</li>
                    </ul>
                </div>
            </div>
            <EmptySection/>
        </section>
    )
}