import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import { useEffect } from "react";
function User() {
  const { usuario } = useAuth();

  const navigate = useNavigate();

  const [user, setUser] = useState({})

 useEffect(()=>{
  if(usuario){
    axios.get(`/users/${usuario.email}`)
    .then(res=>{
      setUser(res.data)
      if(res.data.error){
        navigate('/completarform')
      }
    })
  }
 },[usuario])

  const [input, setInput] = useState({
    name: user.name,
    last_name: user.last_name,
    adress: user.adress,
    phone_number: user.phone_number,
  });

  let handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  let onSubmit = (e) => {
    e.preventDefault();
    try {
      axios.put(`/users/${usuario.email}`,input)
      .then(res=>console.log(res))
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center gap-10">
           <h1 className="text-3xl text-center tracking-tighter font-bold">Quieres modificar algun dato?</h1>
           <form
        onSubmit={onSubmit}
        className="flex flex-col justify-center w-[400px] h-[400px] bg-gray-200 rounded-md shadow-black shadow-lg items-center gap-4"
      >
        <div className="flex flex-col">
        <label className="font-bold">Nombre</label>
        <input
          onChange={handleChange}
          type="text"
          name="name"
          value={input.name}
          className="outline-none p-1 rounded-md"
        />
        </div>
        <div className="flex flex-col">
        <label className="font-bold">Apellido</label>
        <input
          onChange={handleChange}
          type="text"
          name="last_name"
          value={input.last_name}
          className="outline-none p-1 rounded-md"
        />
        </div>
        <div className="flex flex-col">
        <label className="font-bold">Direccion</label>
        <input
          onChange={handleChange}
          type="text"
          name="adress"
          value={input.adress}
          className="outline-none p-1 rounded-md"
        />
        </div>
        <div className="flex flex-col">
        <label className="font-bold">Telefono</label>
        <input
          onChange={handleChange}
          type="number"
          name="phone_number"
          value={input.phone_number}
          className="outline-none p-1 rounded-md"
        />
        </div>
        <button className="bg-white px-10 py-2 rounded-md text-2xl hover:text-white hover:bg-black duration-300 shadow-black shadow" type="submit">Modificar</button>
      </form>
    </div>
  );
}

export default User;
