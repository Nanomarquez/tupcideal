import React from "react";
import Logo from "../assets/logo.png";
import Search from "./Search";
import Signin from "./Signin";
import Carrito from "../assets/carrito.png";

function NavBar() {
  return (
    <nav className="h-auto flex flex-col sm:flex-row justify-around items-center p-2 bg-gradient-to-b from-gray-800 to bg-gray-600 rounded-b-md shadow-2xl">
      <img src={Logo} alt="logo" className="object-cover h-14" />
      <div className="flex gap-32">
        <Search />
        <Signin />
      <div className="flex">
        <img src={Carrito} alt="carrito" className="object-cover h-14 p-2" />
        <span className="bg-white rounded-full absolute w-6 h-6 text-center">
          2
        </span>
      </div>
      </div>
    </nav>
  );
}

export default NavBar;
