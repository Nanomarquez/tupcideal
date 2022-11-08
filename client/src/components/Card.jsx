import React from 'react'
import {Link} from 'react-router-dom'

function Card({title,img,subtitle,detail,link}) {
  return (
    <div className='bg-transparent perspective group'>
      <h1 className='text-3xl underline text-center p-5'>{title}</h1>
      <div className='relative preserve-3d hover:my-rotate-y-180 w-full duration-1000'>
        <div className='relative backface-hidden w-full h-full border-2 p-5 rounded-tl-3xl rounded-br-3xl'>
          <img src={img} alt="" className='object-cover'/>
        </div>
        <div className='absolute w-full h-full backface-hidden my-rotate-yy-180 translate-y-[-100%] rounder rounded-tr-3xl rounded-bl-3xl bg-gradient-to-tr from-blue-800 via-purple-600 to-green-300 text-center flex flex-col justify-center items-center gap-5'>
          <h2 className='text-2xl'>{subtitle}</h2>
          <h2>{detail}</h2>
          <Link to={`/ArmaTuPc/${link}`}> <button className='cursor-pointer w-max px-5 py-2 bg-black text-white rounded hover:shadow-white hover:scale-110 duration-200 shadow-md'>Ver mas!</button></Link>
        </div>
      </div>
    </div>
  )
}

export default Card