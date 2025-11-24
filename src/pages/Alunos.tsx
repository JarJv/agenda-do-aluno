import React, { useState } from 'react';
import '../assets/style.css';

type Aluno<T> = {
  nome: string;
  myimg: string;
  email: string;
  curso: T[];
};

const alunos: Aluno<string>[] = [
  {
    nome: "Sportacus Ferreira",
    myimg: "https://oyster.ignimgs.com/mediawiki/apis.ign.com/game-of-thrones/c/c5/Eddard_stark_and_ice.jpg",
    email: "shaolin@fatec.sp.gov.br",
    curso: ["Sistemas para Internet"]
  },
  {
    nome: "Ned Stark",
    myimg: "https://oyster.ignimgs.com/mediawiki/apis.ign.com/game-of-thrones/c/c5/Eddard_stark_and_ice.jpg",
    email: "ned@winterfell.gov",
    curso: ["Engenharia da Cerveja"]
  }
];

function Alunos() {

  const [pesquisa, setPesquisa] = useState("");

  function buscaAlunos(): Aluno<string>[] {
    return alunos.filter((a) =>
      a.nome.toLocaleLowerCase().includes(pesquisa.toLowerCase())
    );
  }

  const imgClasses = 'w-[120px] h-[120px] object-cover rounded-[15px] mr-5';

  const alunosFiltrados = buscaAlunos();

  return (
    <>
      <section className='flex justify-center items-center py-10 px-5 flex-col'>
        
        <form className='myform w-full max-w-lg'>
          <h1 className='text-4xl text-white mt-10 font-bold mb-5 ml-4'>
            ALUNOS
          </h1>

          <input
            className='bg-[#323558] p-4 w-full rounded-lg text-white outline-none border-none mb-8'
            type="text"
            placeholder='Pesquisar...'
            value={pesquisa}
            onChange={(e) => setPesquisa(e.target.value)}
          />
        </form>

        <div className='w-full max-w-xl px-2.5'>

          {alunosFiltrados.length === 0 && (
            <p className='text-white text-center'>Nenhum aluno encontrado.</p>
          )}

          {alunosFiltrados.map((aluno, index) => (
            <div key={index} className='flex bg-[#323558] rounded-[15px] mb-5 p-5'>
              
              <img 
                src={aluno.myimg}
                className={imgClasses}
                alt="Imagem do Aluno"
              />

              <div className='flex flex-col justify-center'>
                <h1 className='text-white text-xl mb-1'>{aluno.nome}</h1>
                <p className='text-white mb-2.5'>{aluno.email}</p>

                <p className='text-white font-bold'>Curso:</p>
                
                <ul className='text-white list-disc list-inside ml-2'>
                  {aluno.curso.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>

            </div>
          ))}

        </div>
      </section>
    </>
  );
}

export default Alunos;
