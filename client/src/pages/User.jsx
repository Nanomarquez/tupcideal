import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import axios from "axios";
function User() {
  const { usuario } = useAuth();

  console.log(usuario);

  const [input, setInput] = useState({
    name: "",
    last_name: "",
    adress: "",
    phone_number: "",
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
      axios.put("/users",input);
      setInput({
        name: "",
        last_name: "",
        adress: "",
        phone_number: "",
      })
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
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

export default User;
