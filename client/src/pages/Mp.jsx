import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
function Mp() {
  const { cart } = useSelector((state) => state.products);
  const navigate = useNavigate()
  const { usuario } = useAuth();

  if (usuario) {
    usuario.cart = cart;
  }

  useEffect(() => {
    if(usuario){
      axios.get(`/sellers/${usuario.email}`).then(res=>{
        if(res.data !== `Dont found matches with the email: ${usuario.email}`){
          swal("Denegado", `Deberas ser un usuario para poder comprar`, "warning");
          navigate('/')
        }
      })
    }
  }, [usuario])
  

  let cartSum = 0;
  cart.map((c) => {
    cartSum = cartSum + c.quantity;
  });

  const [button, setButton] = useState("");

  const [input, setInput] = useState({
    pais: "",
    provincia: "",
    ciudad: "",
    zip_code: "",
    street_number: "",
    street_name: "",
    floor: "",
    apartment: "",
  });

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
    await axios
      .post("/payment", input)
      .then((response) => setButton(response.data));
  };
  let totalPrice = 0;
  cart?.map((e) => (totalPrice = totalPrice + e.precio * e.quantity));
  return (
    <div className="flex sm:flex-row flex-col min-h-screen items-center">
      <section className="w-full flex-col gap-5 sm:w-1/2 flex items-center justify-center">
        <h1 className="text-3xl">Direccion de envio</h1>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={handleChange}
            name="pais"
            placeholder="Pais"
            className="rounded-md border-b-2"
            value={input.pais}
          />
          <input
            type="text"
            onChange={handleChange}
            name="provincia"
            placeholder="Provincia"
            className="rounded-md border-b-2"
            value={input.provincia}
          />
          <input
            type="text"
            onChange={handleChange}
            placeholder="Ciudad"
            className="rounded-md border-b-2"
            name="ciudad"
            value={input.ciudad}
          />
          <input
            type="text"
            onChange={handleChange}
            name="zip_code"
            placeholder="Codigo Postal"
            className="rounded-md border-b-2"
            value={input.zip_code}
          />
          <input
            type="text"
            onChange={handleChange}
            placeholder="Calle"
            className="rounded-md border-b-2"
            name="street_name"
            value={input.street_name}
          />
          <input
            type="text"
            onChange={handleChange}
            placeholder="Numero"
            className="rounded-md border-b-2"
            name="street_number"
            value={input.street_number}
          />
          <input
            type="text"
            onChange={handleChange}
            className="rounded-md border-b-2"
            placeholder="Piso"
            name="floor"
            value={input.floor}
          />
          <input
            type="text"
            onChange={handleChange}
            placeholder="Departamento"
            className="rounded-md border-b-2"
            name="apartment"
            value={input.apartment}
          />
          {button && (
            <a
              target="_BLANK"
              className="h-[90px] w-[300px]"
              id="mp-button"
              href={button}
            ></a>
          )}
          <div className="text-center">
            <button
              type="submit"
              className="inline-block px-7 py-3 bg-gray-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-600 hover:shadow-lg focus:bg-blue-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out"
            >
              Generar boton de compra
            </button>
          </div>
        </form>
      </section>
      <section className="w-full sm:w-1/2">
        <div className="flex text-2xl items-center justify-center gap-10 mt-5">
          <h1>Productos: {cartSum}</h1>
          <h1>Total: {totalPrice}</h1>
        </div>
        <div className="overflow-y-scroll h-[400px] border mt-2">
          {cart?.map((e, i) => (
            <div
              key={i}
              className="flex flex-col p-5 gap-5 justify-center items-center border-2 m-5 text-center shadow-md rounded-lg"
            >
              {" "}
              <div className="flex flex-col items-center justify-center">
                <img
                  className="object-contain h-36 w-36"
                  src={e.Product.image}
                  alt={e.Product.name}
                />
                <Link to={`/productos/search/${e.id}`}>
                  <div className="bg-gray-300 px-4 py-2 rounded-md hover:text-white duration-300">
                    Ver más
                  </div>
                </Link>
              </div>
              <h3 className="text-2xl">Name {e.Product.name}</h3>
              <span className="text-center text-xl">Precio ${e.precio}</span>
              <span className="text-center text-xl"> X {e.quantity}</span>
              <p className="px-3 py-1 border-b-2 shadow-black shadow drop-shadow-md border-black rounded-md">
                Vendedor {e.Seller.store_name}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Mp;
