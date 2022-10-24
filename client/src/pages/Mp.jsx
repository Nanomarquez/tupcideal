import axios from 'axios';
import React, { useState } from 'react'
import {useAuth} from '../context/authContext';
import {useSelector} from 'react-redux';


function Mp() {

  const {cart} = useSelector(state=>state.products)

  const {usuario} = useAuth();

  if(usuario){
    usuario.cart = cart;
  }
  
  
  const[button, setButton] = useState("")
 
  const [input,setInput] = useState({
    pais: "",
    provincia: "",
    ciudad: "",
    zip_code: "",
    street_number: "",
    street_name: "",
    floor: "",
    apartment: "",
    

  })

  let handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

 
  let handleSubmit = async (e) => {
    e.preventDefault();
    input.email = usuario.email;
    input.cart = usuario.cart;
    await axios.post("/payment", input)
    .then(response => setButton(response.data) )
    
  }
  console.log(button);
  return (
    <div className='h-screen flex'>
        <form onSubmit={handleSubmit}>
          <label>Pais</label>
          <input type="text" onChange={handleChange} name='pais' value={input.pais}/>
          <label>Provincia</label>
          <input type="text"  onChange={handleChange} name='provincia' value={input.provincia}/>
          <label>Ciudad</label>
          <input type="text"  onChange={handleChange} name='ciudad' value={input.ciudad}/>
          <label>Codigo Postal</label>
          <input type="text"  onChange={handleChange} name='zip_code' value={input.zip_code}/>
          <label>Calle</label>
          <input type="text"  onChange={handleChange} name='street_name' value={input.street_name}/>
          <label>Numero</label>
          <input type="text"  onChange={handleChange} name='street_number' value={input.street_number}/>
          <label>Piso</label>
          <input type="text"  onChange={handleChange} name='floor' value={input.floor}/>
          <label>Departamento</label>
          <input type="text"  onChange={handleChange} name='apartment' value={input.apartment}/>
         
          <div className="text-center lg:text-left">
           
                <button
                  type="submit"
                  className="inline-block px-7 py-3 bg-gray-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                  Comprar
                </button>
               
          </div>     
        </form>
        {button.length && <a href={button} > PAGAR CON MERCADOPAGO</a>}
    </div>
  )
}

export default Mp