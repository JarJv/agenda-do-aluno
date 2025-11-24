import { useState } from 'react'
import freqIcon from '../assets/img/freq-icon.png'
import matIcon from '../assets/img/materiaIcon.png'
import avanBtn from '../assets/img/avancarBtn.png'
import retroBtn from '../assets/img/retrocederBtn.png'
import CirculoProgresso from '../components/circuloProgresso'

export default function Frequencia(){

    // Trocar pelas matérias corretas depois
    
    const materias = [
        { nome: "Matemática", porcentagem: 75 },
        { nome: "Web 3", porcentagem: 60 },
        { nome: "Banco de Dados", porcentagem: 70 },
    ];

    const soma = materias.reduce((acc, materia) => acc + materia.porcentagem, 0);

    const global = Math.round(soma / materias.length);

    //Carrossel
    const [index, setIndex] = useState(0);

    const totalOpcoes = 1 + materias.length;

    const avancar = () => {
        setIndex((prev) => (prev + 1) % totalOpcoes);
    };

    const voltar = () => {
        setIndex((prev) => (prev - 1 + totalOpcoes) % totalOpcoes);
    };

    const nomeSelecionado = index === 0 
        ? "Global" 
        : materias[index - 1].nome;

    const porcentagemSelecionada = index === 0 
        ? global
        : materias[index - 1].porcentagem;


    return(
        <section className="flex flex-col items-center px-4 pb-10 min-h-screen">
            
            <div className="flex flex-row gap-1 p-4 w-full my-8 items-center justify-center">
                <h1 className="text-4xl text-white font-bold p-2">Frequência</h1>
                <img className="w-10 min-h-10 h-auto" src={freqIcon} alt="Frequência" />
            </div>

            <div className="flex flex-row justify-self-center items-center justify-between my-8 w-full max-w-2/6 min-h-12 h-auto px-4 rounded-3xl bg-(--c3)">

                {/* Botão voltar */}
                <button 
                    className="text-white text-3xl h-12 cursor-pointer"
                    onClick={voltar}
                >
                    <img className="w-10 min-h-10 h-auto" src={retroBtn} alt="Anterior" />
                </button>

                {/* Opção atual */}
                <div className="flex flex-row justify-self-center items-center justify-center m-0 min-w-2/6 min-h-12 h-auto py-2 rounded-3xl bg-(--c2)">
                    <p className="text-[16px] text-white center">
                        {nomeSelecionado}
                    </p>
                </div>

                {/* Botão avançar */}
                <button 
                    className="text-white text-3xl h-12 cursor-pointer"
                    onClick={avancar}
                >
                    <img className="w-10 min-h-10 h-auto" src={avanBtn} alt="Próximo" />
                </button>

            </div>

            {/* Progresso varia de acordo com a opção selecionada no carrossel */}
            <CirculoProgresso porcentagem={porcentagemSelecionada}/>

            <div className="my-20 flex flex-col gap-3 w-full max-w-2/5">
                <div className="bg-(--c3) flex flex-row p-3 w-full min-h-[72px] h-auto rounded-xl items-center justify-between">
                    <img className="w-10 min-h-10 h-auto" src={matIcon} alt="Calendário"/>
                    <ul className="text-white">
                        <li className="text-xl font-bold">Matéria</li>
                        <li>Data</li>
                    </ul>
                    <p className="text-white">Dia semana</p>
                </div>

                <div className="bg-(--c3) flex flex-row p-3 w-full min-h-[72px] h-auto rounded-xl items-center justify-between">
                    <img className="w-10 min-h-10 h-auto" src={matIcon} alt="Calendário"/>
                    <ul className="text-white">
                        <li className="text-xl font-bold">Matéria</li>
                        <li>Data</li>
                    </ul>
                    <p className="text-white">Dia semana</p>
                </div>

                <div className="bg-(--c3) flex flex-row p-3 w-full min-h-[72px] h-auto rounded-xl items-center justify-between">
                    <img className="w-10 min-h-10 h-auto" src={matIcon} alt="Calendário"/>
                    <ul className="text-white">
                        <li className="text-xl font-bold">Matéria</li>
                        <li>Data</li>
                    </ul>
                    <p className="text-white">Dia semana</p>
                </div>
            </div>

        </section>
    )
}