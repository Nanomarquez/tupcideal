import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function CompletarForm() {
  const { usuario } = useAuth();

  const navigate = useNavigate();
  
  const [input, setInput] = useState({
    name: "",
    last_name: "",
    adress: "",
    phone_number: "",
    email: ""
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
      input.email = usuario.email;
      axios.post("/users",input);
      navigate('/login')
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-10">
      <h1 className="text-2xl text-center">Antes de proseguir deberas completar tus datos</h1>
      <form
        onSubmit={onSubmit}
        className="flex flex-col justify-center w-80 h-80 bg-gray-200 items-center"
      >
        <label>Nombre</label>
        <input
          onChange={handleChange}
          type="text"
          name="name"
          value={input.name}
        />
        <label>Apellido</label>
        <input
          onChange={handleChange}
          type="text"
          name="last_name"
          value={input.last_name}
        />
        <label>Direccion</label>
        <input
          onChange={handleChange}
          type="text"
          name="adress"
          className="text-center"
          value={input.adress}
        />
        <label>Telefono</label>
        <input
          onChange={handleChange}
          type="number"
          name="phone_number"
          value={input.phone_number}
          className="text-center"
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default CompletarForm;
