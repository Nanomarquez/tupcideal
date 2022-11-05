import { motion } from "framer-motion";
import Backdrop from "./Backdrop";
import { useAuth } from "../../context/authContext";
import { deleteProductToShoppingCart , addProductToShoppingCart  } from "../../redux/actions";
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

  console.log(productsCart);

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
              <span onClick={()=>dispatch(addProductToShoppingCart(p))} className="bg-white rounded-full absolute flex cursor-pointer justify-center items-center left-2  w-10 h-10 text-2xl text-center border-2"> <span className="absolute flex items-center justify-center text-5xl w-10 rounded-full h-10 bg-black text-white opacity-0 hover:opacity-100 duration-500">+</span>x{p.quantity} </span>
              <h3 className="text-2xl">Name {p.Product.name}</h3>
              <span className="text-center text-xl">Precio ${p.precio}</span>
              <div className="flex flex-col gap-8">
              <h1 className="px-3 py-1 border-b-2 shadow-black shadow drop-shadow-md border-black rounded-md">Vendedor {p.Seller.store_name}</h1>
              <button
                className="bg-gray-300 px-3 py-1 rounded-md shadow-md shadow-black"
                onClick={() => dispatch(deleteProductToShoppingCart(i))}
              >
                Eliminar
              </button>
              </div>
            </div>
          ))
        )}
        {productsCart.length ? (
          <div className="container text-right block">
            <div className="font-bold text-2xl">
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
