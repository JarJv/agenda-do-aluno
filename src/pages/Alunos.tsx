import React from 'react';
import '../assets/style.css' 

function Alunos() {

  const myImgNedStark = {
    myimg: 'https://oyster.ignimgs.com/mediawiki/apis.ign.com/game-of-thrones/c/c5/Eddard_stark_and_ice.jpg',
    width: '120px',
    height: '120px',
    objectFit: 'cover',
    borderRadius: '15px',
    marginRight: '20px'
  }

  const imgClasses = 'w-[120px] h-[120px] object-cover rounded-[15px] mr-5';

  return (
    <> 
      {/* Classe de espaçamento vertical aumentada: p-5 (original) -> py-10 e px-5 (novo) */}
      {/* py-10 dá um padding vertical de 2.5rem (40px) */}
      <section className='flex justify-center items-center py-10 px-5 flex-col'> 

        <form className='myform w-full max-w-lg'>
          <h1 className='text-4xl text-white mt-10 font-bold mb-5 ml-4'>ALUNOS</h1>
          
          <input 
            className='bg-[#323558] p-4 w-full rounded-lg text-white outline-none border-none mb-8'
            type="text"
            placeholder='Pesquisar...'
          />
        </form>

        {/* max-w-xl garante responsividade limitando a largura máxima */}
        <div className='w-full max-w-xl px-2.5'> 

          {/* O layout flexbox aqui já é responsivo */}
          <div className='flex bg-[#323558] rounded-[15px] mb-5 p-5'>
            <img 
              src={myImgNedStark.myimg} 
              className={imgClasses}
              alt="Imagem do Aluno"
            />
            
            <div className='flex flex-col justify-center'>
              <h1 className='text-white text-xl mb-1'>Sportacus Ferreira</h1>
              <p className='text-white mb-2.5'>shaolin@fatec.sp.gov.br</p>

              <p className='text-white font-bold'>Curso:</p>
              
              <ul className='text-white list-disc list-inside ml-2'>
                <li>Lorem Ipsum is simply</li>
              </ul>
            </div>
          </div>

          <div className='flex bg-[#323558] rounded-[15px] p-5'>
            <img 
              src={myImgNedStark.myimg}
              className={imgClasses}
              alt="Imagem do Aluno"
            />
            
            <div className='flex flex-col justify-center'>
              <h1 className='text-white text-xl mb-1'>Sportacus Ferreira</h1>
              <p className='text-white mb-2.5'>shaolin@fatec.sp.gov.br</p>

              <p className='text-white font-bold'>Curso:</p>
              
              <ul className='text-white list-disc list-inside ml-2'>
                <li>Lorem Ipsum is simply</li>
              </ul>
            </div>
          </div>

        </div>
      </section>
    </>
  )
}

export default Alunos;