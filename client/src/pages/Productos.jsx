import React from 'react'

function Productos() {
  return (
    <div className='h-screen flex sm:flex-row flex-col'>
      <section className='p-2 sm:px-5 border-b-2 sm:border-r-2 rounded-xl w-full h-1/3 sm:h-screen sm:w-2/4'>
        <h1 className='text-xl sm:text-2xl mb-2'>Filtrar por:</h1>
        <hr/> 
      </section>
      <section className='w-full h-screen'></section>
    </div>
  )
}

export default Productos