import axios from 'axios';
import React, { useState } from 'react'
import {useAuth} from '../context/authContext';
import {useSelector} from 'react-redux';
function Mp() {

  const {cart} = useSelector(state=>state.products)

  const {usuario} = useAuth();
  usuario.cart = cart
  const [input,setInput] = useState({
    pais: "",
    provincia: "",
    ciudad: "",
    direccion: "",
    email: usuario.email,
    cart: usuario.cart
  })

  let handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/purchase',input)
  }

  return (
    <div className='h-screen flex'>
        <form onSubmit={handleSubmit}>
          <label>Pais</label>
          <input type="text" onChange={handleChange} name='pais' value={input.pais}/>
          <label>Provincia</label>
          <input type="text"  onChange={handleChange} name='provincia' value={input.provincia}/>
          <label>Ciudad</label>
          <input type="text"  onChange={handleChange} name='ciudad' value={input.ciudad}/>
          <label>Direccion</label>
          <input type="text"  onChange={handleChange} name='direccion' value={input.direccion}/>
        </form>
    </div>
  )
}

export default Mp