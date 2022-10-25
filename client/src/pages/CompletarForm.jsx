import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
function CompletarForm() {
  const { usuario } = useAuth();
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    if (usuario !== null) {
      axios.get(`/users/${usuario.email}`).then((res) => {
        if (!res.data.error) {
          navigate("/");
        }
      });
    }
  });
  


  const [number, setNumber] = useState({
    area: "",
    nro: ""
  });
  const [input, setInput] = useState({
    name: "",
    last_name: "",
    adress: "",
    phone_number: "",
    email: "",
  });

  useEffect(() => {
    if (
      input.name !== "" &&
      input.last_name !== "" &&
      input.adress !== "" &&
      number.area !== "" &&
      number.nro !== ""
    ) {
      setDisabled(false);
    }
  }, [input, disabled]);
  
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
      input.phone_number = number.area + number.nro;
      axios.post("/users", input);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  
  let onChangeNumber = (e) => {
    setNumber({
      ...number,
      [e.target.name]: e.target.value
    })
  }

  console.log(input)
  console.log(number)
  console.log(disabled)
  

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
          <label className="font-bold ml-9">
            Telefono<span className="text-red-600 text-xl">*</span>
          </label>
          <div className="flex gap-2 items-center">
            <label className="font-bold">+</label>
            <input
              type="text"
              pattern="[0-9]+"
              onChange={onChangeNumber}
              className="w-[50px] outline-none p-1 rounded-md"
              placeholder="Ej: 11"
              value={number.area}
              name="area"
            />
            <input
              onChange={onChangeNumber}
              type="text"
              name="nro"
              pattern="[0-9]+"
              placeholder="Ej: 30823451"
              value={number.nro}
              className="outline-none p-1 rounded-md"
            />
          </div>
        </div>
        <button
          type="submit"
          className={`bg-white px-10 py-2 rounded-md text-2xl duration-300 shadow-black shadow ${
            disabled ? "bg-gray-300" : ""
          }`}
          disabled={disabled}
        >
          Enviar
        </button>
      </form>
    </div>
  );
}

export default CompletarForm;
