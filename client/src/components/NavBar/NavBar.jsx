import "./Menu.css";
import Search from "./Search";
import Signin from "./Signin";
import SignOut from "./SignOut";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Carrito from "../../assets/carrito.png";
import { useAuth } from "../../context/authContext";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "../../components/Modal/Modal";
import Avatar from './Avatar'
import axios from "axios";
function NavBar() {
  const [modalOpen, setModalOpen] = useState(false);

  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);
  const { cart } = useSelector(state=>state.products)
  const [active, setActive] = useState("");
  const [admin, setAdmin] = useState(false);
  const [superAdmin, setSuperAdmin] = useState(false);
  function handleActive() {
    active ? setActive("") : setActive("active");
  }

  

  useEffect(()=>{
    !localStorage.hasOwnProperty('cart') ? localStorage.setItem("cart","[]") :
    localStorage.setItem("cart",JSON.stringify(cart))
  },[cart])
  
  const { usuario } = useAuth();

  useEffect(()=>{
    if(usuario){
      usuario.cart = cart
      axios.get(`/users/${usuario.email}`).then(res=>{
        setAdmin(res.data.isAdmin)
        setSuperAdmin(res.data.isSuperAdmin)
      })
      usuario.isAdmin = admin
      usuario.isSuperAdmin = superAdmin
    }
  },[cart,usuario])

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
          {usuario ? <Avatar/> : ""}
        </div>
        <div className="flex right-10 sm:relative absolute">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={()=>{modalOpen ? close() : open()}}
          >
            {/* <Link to={"/cart"}> */}
              <img
                src={Carrito}
                alt="carrito"
                className="object-cover h-14 p-2"
              />
            {/* </Link> */}
          </motion.button>

          <span className="bg-white rounded-full absolute w-6 h-6 text-center">
            {cart?.length}
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
          className={`flex flex-col sm:flex-row items-center justify-center sm:gap-28 p-1 bg-gray-600 text-white w-full sm:relative absolute z-[100000] translate-x-[-300%] sm:translate-x-0 ${
            active ? "translate-x-0" : ""
          } w-full duration-1000 z-10 gap-5 overflow-hidden`}
        >
          <Link to="/armatupc">
            <li onClick={() => handleActive()} className="cursor-pointer hover:animate-bounce p-4">
              Te armamos tu PC
            </li>
          </Link>
          <Link to="/productos">
            <li onClick={() => handleActive()} className="cursor-pointer hover:animate-bounce p-4">
              Productos
            </li>
          </Link>
          <Link to="/equipo">
            <li onClick={() => handleActive()} className="cursor-pointer hover:animate-bounce p-4">
              Quienes somos
            </li>
          </Link>
          <Link to="/custompc">
            <li onClick={() => handleActive()} className="cursor-pointer hover:animate-bounce p-4">
              Customiza tu PC
            </li>
          </Link>
          { admin &&
          <Link to='/admin'>
          <li onClick={() => handleActive()} className="cursor-pointer hover:animate-bounce p-4">
            Admin
          </li>
          </Link>
          }
        </ul>
      </div>
      <AnimatePresence
        initial={true}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        {modalOpen && <Modal modalOpen={modalOpen} handleClose={close} />}
      </AnimatePresence>
    </>
  );
}

export default NavBar;
