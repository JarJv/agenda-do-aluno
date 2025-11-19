import React from 'react';
import '../assets/style.css' 


function Professores() {

  const myImgNedStark = {
    myimg: 'https://i.pinimg.com/236x/79/7b/ef/797befcec4f2ad6bc26365c6adc33b62.jpg',
    width: '120px',
    height: '120px',
    objectFit: 'cover',
    borderRadius: '15px',
    marginRight: '20px',
    PatrickEstrelaEmail: 'patrick@fatec.sp.gov.br',
    disciplinas: [{
      name: 'Algebra Linear'
    }, {
      name: 'Calcúlo 3'
    }]
  }

  const imgClasses = 'w-[120px] h-[120px] object-cover rounded-[15px] mr-5';
  
  return (

    <> 
      {/* Alterado de py-10 para pt-10 (padding-top) e pb-20 (padding-bottom de 5rem/80px) */}
      <section className='flex justify-center items-center pt-10 pb-20 px-5 flex-col'>
        
        <h1 className='text-4xl text-white mt-10 font-bold mb-5 ml-4'>PROFESSORES</h1>

        <form className='myform w-full max-w-lg'>
          <input 
            className='bg-[#323558] p-4 w-full rounded-lg text-white outline-none border-none mb-8'
            type="text"
            placeholder='Pesquisar...'
          />
        </form>

        <div className='w-full max-w-xl px-2.5'>

          <div className='flex bg-[#323558] rounded-[15px] mb-5 p-5'>
            <img 
              src={myImgNedStark.myimg} 
              className={imgClasses}
              alt="Imagem do Professor"
            />
            
            <div className='flex flex-col justify-center'>
              <h1 className='text-white text-xl mb-1'>Sportacus Ferreira</h1>
              <p className='text-white mb-2.5'>{myImgNedStark.PatrickEstrelaEmail}</p>

              <p className='text-white font-bold'>Disciplina:</p>
              
              <ul className='text-white'>
                {myImgNedStark.disciplinas.map(({name})=>{
                    return <p className='text-white ml-4' key={name}>{name}</p>
                })}
              </ul>
            </div>
          </div>

          <div className='flex bg-[#323558] rounded-[15px] p-5'>
            <img 
              src={myImgNedStark.myimg}
              className={imgClasses}
              alt="Imagem do Professor"
            />
            
            <div className='flex flex-col justify-center'>
              <h1 className='text-white text-xl mb-1'>Sportacus Ferreira</h1>
              <p className='text-white mb-2.5'>{myImgNedStark.PatrickEstrelaEmail}</p>

              <p className='text-white font-bold'>Disciplina:</p>
              
              <ul className='text-white'>
                {myImgNedStark.disciplinas.map(({name})=>{
                    return <p className='text-white ml-4' key={name}>{name}</p>
                })}
              </ul>
            </div>
          </div>

        </div>
      </section>
    </>
  )
}

export default Professores;