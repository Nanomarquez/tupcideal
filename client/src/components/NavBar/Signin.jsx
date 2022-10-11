import React from 'react'
import { Link } from 'react-router-dom'
import Avatar from '../../assets/avatar.png'
import "./Signin.css"

function Signin() {
  return (
    <Link>
      <button className='btn-neon bg-white items-center sm:rounded hover:shadow-neon px-1 h-10 sm:w-full w-10 sm:pr-3 font-semibold flex relative rounded-full overflow-hidden duration-300 delay-1000 border-white'>
        <span id='span1' className='bg-black absolute block top-0 left-[-100%] w-full h-[3px]'></span>
        <span id='span2' className='bg-black absolute block bottom-0 right-[-100%] w-full h-[3px]'></span>
        <span id='span3' className='bg-black absolute block top-[-100%] right-0 w-[3px] h-[100%]'></span>
        <span id='span4' className='bg-black absolute block top-[100%] left-0 w-[3px] h-[100%]'></span>
        <img src={Avatar} alt="avatar" className='object-contain pl-[2px] h-7'/>
        <span className='pl-2 hidden sm:inline-block '>Iniciar sesion</span></button>
    </Link>
  )
}

export default Signin