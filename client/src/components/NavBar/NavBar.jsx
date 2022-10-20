import './Menu.css'
import Search from "./Search";
import Signin from "./Signin";
import SignOut from "./SignOut";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Carrito from "../../assets/carrito.png";
import { useAuth } from '../../context/authContext'

function NavBar() {

  const [active, setActive] = useState("")
  const addCartLength = useSelector((state) => state.products.addProductToCart);

  function handleActive(){
    active?setActive(""):setActive("active")
  }

  const { usuario } = useAuth()


  return (
    <>
      <nav className="h-auto flex flex-col sm:flex-row justify-between items-center px-5 p-2 bg-gradient-to-b from-gray-800 to bg-gray-600 shadow-2xl z-50">
        <Link to="/">
          <span className="logo font-bold text-3xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-red-400 via-purple-400 to-green-400">
            TuPcIdeal
          </span>
        </Link>
        <div className="flex sm:gap-40 gap-10">
          <Search />
          {usuario ? <SignOut /> : <Signin />}
        </div>
        <div className="flex right-10 sm:relative absolute">
          <Link to={"/cart"}>
            <img
              src={Carrito}
              alt="carrito"
              className="object-cover h-14 p-2"
            />
          </Link>
          <span className="bg-white rounded-full absolute w-6 h-6 text-center">
            {addCartLength.length}
          </span>
        </div>
      </nav>
      <hr />
      <div className="z-10">
        <button
          onClick={() => handleActive()}
          className={`menu menu-${active} absolute top-5 left-8 sm:hidden`}
        >
          <div></div>
          <div></div>
          <div></div>
        </button>
        <ul
          className={`flex flex-col sm:flex-row items-center justify-center sm:gap-28 p-1 bg-gray-600 text-white w-full sm:relative absolute translate-x-[-300%] sm:translate-x-0 ${
            active ? "translate-x-0" : ""
          } w-full duration-1000 z-10 gap-5 overflow-hidden`}
        >
          <Link to="/armatupc">
            <li className="cursor-pointer hover:animate-bounce p-4">
              Te armamos tu PC
            </li>
          </Link>
          <Link to="/productos">
            <li className="cursor-pointer hover:animate-bounce p-4">
              Productos
            </li>
          </Link>
          <Link to="/equipo">
            <li className="cursor-pointer hover:animate-bounce p-4">
              Quienes somos
            </li>
          </Link>
          <Link to="/custompc">
            <li className="cursor-pointer hover:animate-bounce p-4">
              Customiza tu PC
            </li>
          </Link>
        </ul>
      </div>
    </>
  );
}

export default NavBar;
