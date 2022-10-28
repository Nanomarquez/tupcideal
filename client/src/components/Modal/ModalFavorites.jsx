import { motion } from "framer-motion";
import Backdrop from "./Backdrop";
import { useAuth } from "../../context/authContext";
import { deleteFavoritesList,addProductToShoppingCart } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Carrito from "../../assets/carrito.png";

const dropIn = {
  hidden: {
    y: "-100vh",
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 100,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
  },
};

function ModalFavorites({ handleClose }) {
  const dispatch = useDispatch();
  const productsFavorites = useSelector((state) => state.products.favorites);
  let totalPrice = 0;
  productsFavorites.map((p) => (totalPrice = totalPrice + p.precio));
  const { usuario } = useAuth();
  console.log(productsFavorites);

  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="rounded flex items-center h-full w-full flex-col gap-4"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <button
          className="fixed left-0 w-min m-2 h-min bg-black text-white px-2 rounded-full"
          onClick={handleClose}
        >
          X
        </button>
        {usuario && (
          <h1 className="text-center text-2xl">
            Welcome {usuario.displayName ? usuario.displayName : usuario.email}
          </h1>
        )}
        <h2 className="text-xl ml-5 mt-5">Favoritos</h2>
        {productsFavorites.length === 0 ? (
          <h2 className="text-center">Lista de favoritos vacia</h2>
        ) : (
          productsFavorites.map((p, i) => (
            <div
              key={i}
              className="flex p-5 gap-5 justify-center items-center border-2 m-5 text-center shadow-md rounded-lg"
            >
              <img
                className="object-contain h-36 w-36"
                src={p.Product.image}
                alt={p.name}
              />
              <h3 className="text-2xl">Name {p.Product.name}</h3>
              <span className="text-center text-xl">Precio ${p.precio}</span>
             <div class="flex flex-col space-y-14 ...">
              <button className="bg-gray-300 px-3 py-1  rounded-md shadow-md shadow-black"
                onClick={() => dispatch(deleteFavoritesList(p.id))}
              >
                Eliminar
              </button>
              <button className="bg-gray-300 px-3 py-1  rounded-md shadow-md shadow-black"
                onClick={() => dispatch(addProductToShoppingCart(p))}
              >
                 <img
              src={Carrito}
              alt="carrito"
              className="object-cover h-12 p-1.5  "
            />
              </button>
              </div>
            </div>
          ))
        )}
       
       
      </motion.div>
    </Backdrop>
  );
}

export default ModalFavorites;


/*{(productsFavorites.length && usuario !== null) ? (
    <Link to="/mp">
      <button onClick={handleClose} className="p-5 bg-gray-400 text-3xl rounded-md shadow-md shadow-black mb-5 text-white">Comprar</button>
    </Link> ) :           <Link to="/login">
      <button onClick={handleClose} className="p-5 bg-gray-400 text-3xl rounded-md shadow-md shadow-black mb-5 text-white">Logeate para comprar</button>
    </Link>
  }*/


  /* {productsFavorites.length ? (
    <div className="container text-right block">
      <div className="font-bold">
        Total: <span>{totalPrice}</span>{" "}
      </div>
    </div>
  ) : null}*/