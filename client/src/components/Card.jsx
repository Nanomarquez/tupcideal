import React from 'react'

function Card({title,img}) {
  return (
    <div className='bg-transparent cursor-pointer perspective group'>
      <h1 className='text-2xl text-center p-5'>{title}</h1>
      <div className='relative preserve-3d hover:my-rotate-y-180 w-full duration-1000'>
        <div className='relative backface-hidden w-full h-full border-2 p-5 rounded-tl-3xl rounded-br-3xl'>
          <img src={img} alt="" className='object-cover'/>
        </div>
        <div className='absolute w-full h-full backface-hidden my-rotate-yy-180 translate-y-[-100%] rounder rounded-tr-3xl rounded-bl-3xl bg-gradient-to-tr from-gray-800 via-gray-600 to-gray-300'>
          <h1>Hola</h1>
        </div>
      </div>
    </div>
  )
}

export default Card