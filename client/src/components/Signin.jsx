import React from 'react'
import { Link } from 'react-router-dom'
import Avatar from '../assets/avatar.png'
import "./Signin.css"

function Signin() {
  return (
    <Link>
      <button className='btn-neon bg-white items-center rounded-tl-xl rounded-br-xl rounded-tr-md px-1 sm:pr-3 font-semibold flex relative overflow-hidden duration-300 delay-1000'>
        <span id='span1' className='bg-sky-300 absolute block top-0 left-[-100%] w-full h-[3px]'></span>
        <span id='span2' className='bg-sky-300 absolute block bottom-0 right-[-100%] w-full h-[3px]'></span>
        <span id='span3' className='bg-sky-300 absolute block top-[-100%] right-0 w-[3px] h-[100%]'></span>
        <span id='span4' className='bg-sky-300 absolute block top-[100%] left-0 w-[3px] h-[100%]'></span>
        <img src={Avatar} alt="avatar" className='object-cover h-10'/>
        <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-pink-400 to-blue-300 hidden sm:inline-block '>Iniciar sesion</span></button>
    </Link>
  )
}

export default Signin