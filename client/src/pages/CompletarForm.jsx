import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
function CompletarForm() {
  const { usuario } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (usuario !== null) {
      axios.get(`/users/${usuario.email}`).then((res) => {
        if (!res.data.error) {
          navigate("/");
        }
      });
    }
  });

  const [input, setInput] = useState({
    name: "",
    last_name: "",
    adress: "",
    phone_number: "",
    email: "",
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
      axios.post("/users", input);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center gap-10">
      <h1 className="text-3xl text-center tracking-tighter font-bold">
        Antes de proseguir deberas completar tus datos
      </h1>
      <form
        onSubmit={onSubmit}
        className="flex flex-col justify-center w-[400px] h-[400px] bg-gray-200 rounded-md shadow-black shadow-lg items-center gap-4"
      >
        {" "}
        <div className="flex flex-col">
          <label className="font-bold">
            Nombre<span className="text-red-600 text-xl">*</span>
          </label>
          <input
            onChange={handleChange}
            type="text"
            name="name"
            value={input.name}
            pattern="^[a-zA-Z]+$"
            placeholder="Ej: Emanuel"
            className="outline-none p-1 rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-bold">
            Apellido<span className="text-red-600 text-xl">*</span>
          </label>
          <input
            onChange={handleChange}
            type="text"
            name="last_name"
            pattern="^[a-zA-Z]+$"
            value={input.last_name}
            placeholder="Ej: Perez"
            className="outline-none p-1 rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-bold">
            Direccion<span className="text-red-600 text-xl">*</span>
          </label>
          <input
            onChange={handleChange}
            type="text"
            name="adress"
            placeholder="Ej: Penna 1773"
            pattern="^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$"
            className="outline-none p-1 rounded-md"
            value={input.adress}
          />
        </div>
        <div className="flex flex-col">
          <label className="font-bold">
            Telefono<span className="text-red-600 text-xl">*</span>
          </label>
          <input
            onChange={handleChange}
            type="text"
            name="phone_number"
            pattern="[0-9]+"
            placeholder="Ej: 1130823451"
            value={input.phone_number}
            className="outline-none p-1 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="bg-white px-10 py-2 rounded-md text-2xl hover:text-white hover:bg-black duration-300 shadow-black shadow"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}

export default CompletarForm;
