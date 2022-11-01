import "./Menu.css";
import Search from "./Search";
import Signin from "./Signin";
import SignOut from "./SignOut";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Carrito from "../../assets/carrito.png";
import { useAuth } from "../../context/authContext";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "../../components/Modal/Modal";
import ModalFavorites from "../../components/Modal/ModalFavorites";
import Avatar from './Avatar'
import axios from "axios";
import iconFavorites from "../../assets/iconFavorites.png";
function NavBar() {
  
  const [modalOpen, setModalOpen] = useState(false);
  const [modalFavoritesOpen, setModalFavoritesOpen] = useState(false);

  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);

  const closeFav = () => setModalFavoritesOpen(false);
  const openFav = () => setModalFavoritesOpen(true);
  
  
  
  const { cart } = useSelector(state=>state.products)
  const { favorites } = useSelector(state=>state.products)
  
  const [active, setActive] = useState("");
  const [admin, setAdmin] = useState(false);
  const [superAdmin, setSuperAdmin] = useState(false);
  function handleActive() {
    active ? setActive("") : setActive("active");
  }

    

  useEffect(()=>{
    !localStorage.hasOwnProperty('cart') ? localStorage.setItem("cart","[]") :
    localStorage.setItem("cart",JSON.stringify(cart))
    !localStorage.hasOwnProperty('favorites') ? localStorage.setItem("favorites","[]") :
    localStorage.setItem("favorites",JSON.stringify(favorites))
  },[cart, favorites])
  
  const { usuario } = useAuth();

  useEffect(()=>{
    if(usuario){
      usuario.cart = cart
      usuario.favorites = favorites
      axios.get(`/users/${usuario.email}`).then(res=>{
        setAdmin(res.data.isAdmin)
        setSuperAdmin(res.data.isSuperAdmin)
      })
      usuario.isAdmin = admin
      usuario.isSuperAdmin = superAdmin
    }else{
      setAdmin(false)
    }
  },[cart,favorites, usuario])

  return (
    <>
      <nav className="h-auto flex flex-col sm:flex-row justify-between items-center px-5 pt-2 bg-gradient-to-b from-gray-800 to bg-gray-600 shadow-2xl z-50">
        <Link to="/">
          <span className="logo font-bold text-3xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-red-400 via-purple-400 to-green-400">
            TuPcIdeal
          </span>
        </Link>
        <div className="flex sm:gap-40 gap-10 pt-2 sm:pt-0">
          <Search />
          {usuario ? <SignOut /> : <Signin />}
            <Avatar /> 
        </div>
        <div className="flex relative gap-3 items-center">
        <span className="bg-white rounded-full absolute w-6 h-6 right-1 text-center">
            {favorites?.length}
          </span>
          <span className="bg-white rounded-full absolute w-6 h-6 text-center">
            {cart?.length}
          </span>
          <motion.button
            whileHover={{ scale: 1.5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              modalOpen ? close() : open();
              modalFavoritesOpen ? closeFav() : null;
            }}
          >
            {/* <Link to={"/cart"}> */}
            <img
              src={Carrito}
              alt="carrito"
              className="object-cover h-14 p-2"
            />
            {/* </Link> */}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              modalFavoritesOpen ? closeFav() : openFav();
              modalOpen ? close() : null;
            
            }}
          >
            {/* <Link to={"/cart"}> */}
            <img
              src={
                favorites.length > 0
                  ? iconFavorites
                  : "https://cdn.pixabay.com/photo/2017/06/26/20/33/icon-2445095_960_720.png"
              }
              className="object-cover h-16 p-0"
              alt="favorites"
              width={60}
            />
            {/* </Link> */}
          </motion.button>

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
          className={`ul flex flex-col sm:flex-row items-center justify-center sm:gap-28 p-1 bg-gray-600 text-white w-full sm:relative absolute z-[100000] translate-x-[-300%] sm:translate-x-0 ${
            active ? "translate-x-0" : ""
          } w-full duration-1000 z-10 gap-5 overflow-hidden`}
        >
          <Link to="/armatupc">
            <li
              onClick={() => handleActive()}
              className="cursor-pointer hover:animate-bounce p-4"
            >
              Te armamos tu PC
            </li>
          </Link>
          <Link to="/productos">
            <li
              onClick={() => handleActive()}
              className="cursor-pointer hover:animate-bounce p-4"
            >
              Productos
            </li>
          </Link>
          <Link to="/equipo">
            <li
              onClick={() => handleActive()}
              className="cursor-pointer hover:animate-bounce p-4"
            >
              Quienes somos
            </li>
          </Link>
          <Link to="/custompc">
            <li
              onClick={() => handleActive()}
              className="cursor-pointer hover:animate-bounce p-4"
            >
              Customiza tu PC
            </li>
          </Link>
          
        </ul>
      </div>
      <AnimatePresence
        initial={true}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        {modalOpen && <Modal modalOpen={modalOpen} handleClose={close} />}
      </AnimatePresence>
      <AnimatePresence
        initial={true}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        {modalFavoritesOpen && (
          <ModalFavorites
            modalOpen={modalFavoritesOpen}
            handleClose={closeFav}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default NavBar;


/*<button className="flex justify-center items-center bg-yellow-100/30 w-10 hover:bg-gray-300/90 transition rounded-md">
<Link to={"/favorites"}>
  <img
    src="https://cdn.pixabay.com/photo/2017/06/26/20/33/icon-2445095_960_720.png"
    className="opacity-50 object-cover"
    alt=""
  />
</Link>
</button>
linea 78

 <span className="bg-white rounded-full absolute w-6 h-6 text-right">
            {favorites?.length}
          </span>


*/
/*{usuario && usuario.isAdmin ? <Avatar /> : ""}*/


/*{admin && (
  <Link to="/admin">
    <li
      onClick={() => handleActive()}
      className="cursor-pointer hover:animate-bounce p-4"
    >
      Admin
    </li>
  </Link>
)}*/