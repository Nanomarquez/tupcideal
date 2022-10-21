import { motion } from "framer-motion";
import Backdrop from "./Backdrop";
import {useAuth} from '../../context/authContext'
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

  const {usuario} = useAuth();
  console.log(usuario)

  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="rounded flex flex-col items-center justify-center"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <button onClick={handleClose}>Close</button>
        <h1>Welcome {usuario.displayName ? usuario.displayName : usuario.email}</h1>
      </motion.div>
    </Backdrop>
  );
}

export default Modal;
