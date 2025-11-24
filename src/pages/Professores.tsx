import React, { useEffect, useState } from 'react'

import '../assets/style.css';

function Professores() {



  const[pesquisa,setPesquisa] = useState<string>('')


  type secondProfessores<T> = {
    nome:string,
    myimg:string,
    PatrickEstrelaEmail:string,
    disciplinas:T[]
  }

  const professores:secondProfessores<{name:string}>[] = [
    {
      nome: "Patrick estrela",
      myimg: 'https://i.pinimg.com/236x/79/7b/ef/797befcec4f2ad6bc26365c6adc33b62.jpg',
      PatrickEstrelaEmail: 'patrick@fatec.sp.gov.br',
      disciplinas: [
        { name: 'Algebra Linear' },
        { name: 'Cálculo 3' }
      ]
    }, {
      nome: "Hornet",
      myimg: 'https://preview.redd.it/can-someone-please-explain-the-hornet-shoes-meme-v0-73tk3o6bgjwf1.jpeg?width=640&crop=smart&auto=webp&s=590cdd4f03d288695a881f6514b618bc1b148c40',
      PatrickEstrelaEmail: 'guarana@fatec.sp.gov.br',
      disciplinas: [
        { name: 'Algebra Linear' },
        { name: 'Cálculo 3' }
      ]
    }
  ];


function BuscaProfessores():secondProfessores<{name:string}>[]{
    return professores.filter((e) => e.nome.toLocaleLowerCase().includes( pesquisa.toLowerCase()))
}


  const imgClasses = 'w-[120px] h-[120px] object-cover rounded-[15px] mr-5';
  
  return (
    <> 
      <section className='flex justify-center items-center pt-10 pb-20 px-5 flex-col'>
        
        <h1 className='text-4xl text-white mt-10 font-bold mb-5 ml-4'>PROFESSORES</h1>

        <form className='myform w-full max-w-lg'>
          <input 
            className='bg-[#323558] p-4 w-full rounded-lg text-white outline-none border-none mb-8'
            type="text"
            placeholder='Pesquisar...'
            onChange={(e) => setPesquisa(e.target.value)}
          />
        </form>

        <div className='w-full max-w-xl px-2.5'>


            {BuscaProfessores().length === 0 && (
            <p className="text-white text-center text-lg mt-5">Nenhum professor encontrado</p>
  )}

          { BuscaProfessores().map((professor) => (
            <div 
              key={professor.PatrickEstrelaEmail}
              className='flex bg-[#323558] rounded-[15px] mb-5 p-5'
            >
              <img 
                src={professor.myimg} 
                className={imgClasses}
                alt="Foto do Professor"
              />
              
              <div className='flex flex-col justify-center'>
                <h1 className='text-white text-xl mb-1'>{professor.nome}</h1>
                <p className='text-white mb-2.5'>{professor.PatrickEstrelaEmail}</p>

                <p className='text-white font-bold'>Disciplinas:</p>
                
                <ul className='text-white'>
                  {professor.disciplinas.map(({ name }) => (
                    <li className='text-white ml-4' key={name}>{name}</li>
                  ))}
                </ul>
              </div>

            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default Professores;
