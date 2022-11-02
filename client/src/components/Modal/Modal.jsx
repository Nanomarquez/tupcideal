import { motion } from "framer-motion";
import Backdrop from "./Backdrop";
import { useAuth } from "../../context/authContext";
import { deleteProductToShoppingCart } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
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

function Modal({ handleClose }) {
  const dispatch = useDispatch();
  const productsCart = useSelector((state) => state.products.cart);
  let totalPrice = 0;
  productsCart.map((p) => (totalPrice = totalPrice + p.precio * p.quantity));
  const { usuario } = useAuth();

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
        <h2 className="text-xl ml-5 mt-5">Productos</h2>
        {productsCart.length === 0 ? (
          <h2 className="text-center">Carrito de compras vacio</h2>
        ) : (
          productsCart.map((p, i) => (
            <div
              key={i}
              className="flex p-5 gap-5 justify-center items-center border-2 m-5 text-center shadow-md rounded-lg"
            >
              <img
                className="object-contain h-36 w-36"
                src={p.Product.image}
                alt={p.Product.name}
              
              />
              <span className="bg-white rounded-full absolute  left-2  w-9 h-9 text-2xl text-center"> X {p.quantity}</span>
              <h3 className="text-2xl">Name {p.Product.name}</h3>
              <span className="text-center text-xl">Precio ${p.precio}</span>
              
              <button
                className="bg-gray-300 px-3 py-1 rounded-md shadow-md shadow-black"
                onClick={() => dispatch(deleteProductToShoppingCart(i))}
              >
                Eliminar
              </button>
            </div>
          ))
        )}
        {productsCart.length ? (
          <div className="container text-right block">
            <div className="font-bold">
              Total: <span>{totalPrice}</span>{" "}
            </div>
          </div>
        ) : null}
        {productsCart.length && usuario !== null ? (
          <Link to="/mp">
            <button
              onClick={handleClose}
              className="p-5 bg-gray-400 text-3xl rounded-md shadow-md shadow-black mb-5 text-white"
            >
              Comprar
            </button>
          </Link>
        ) : (
          <Link to="/login">
            <button
              onClick={handleClose}
              className="p-5 bg-gray-400 text-3xl rounded-md shadow-md shadow-black mb-5 text-white"
            >
              Logeate para comprar
            </button>
          </Link>
        )}
      </motion.div>
    </Backdrop>
  );
}

export default Modal;
