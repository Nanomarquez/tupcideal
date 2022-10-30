import { motion } from "framer-motion";
import Backdrop from "./Backdrop";
import { useAuth } from "../../context/authContext";
import { useEffect, useState } from 'react';
import axios from "axios";
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

function ModalReview({ handleClose, ProductId }) {
  const { usuario } = useAuth();
  const [userId, setUserId] = useState("")

  async function getUserId (){
    return await axios.get(`/users/${usuario.email}`).then(res=>setUserId(res.data.id))
  }

  useEffect(() => {
    getUserId()
    setReviewUser({
      ...reviewUser,
      UserId: userId
    })
  }, [userId])
  

  const [reviewUser, setReviewUser] = useState({
    ProductId,
    UserId: userId,
    comment: "",
    rating: 0,
  })


  let handleChange = (e) => {
    setReviewUser({
      ...reviewUser,
      [e.target.name]: e.target.value
    })
  }


  let handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`/review`,reviewUser)
  }

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
          <h1 className="text-2xl mt-5">
            Welcome {usuario.displayName ? usuario.displayName : usuario.email}
          </h1>
        )}
        <h1 className="text-xl">
          Quieren agregar comentarios y rating al producto?
        </h1>
        <form onSubmit={handleSubmit} className="flex gap-10 flex-col justify-center items-center">
          <textarea
            className="p-2 bg-gray-300 rounded-md"
            name="comment"
            id="comment"
            cols="30"
            rows="5"
            onChange={handleChange}
            placeholder="Escribe tu comentario aqui"
          >
            
          </textarea>
          <p>Selecciona tu rating del 0 al 5</p>
          <select name="rating" id="rating" onChange={handleChange}>
            <option value={0}>0</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          <button type="submit" className="px-5 py-2 bg-gray-300 rounded-md">Enviar</button>
        </form>
      </motion.div>
    </Backdrop>
  );
}

export default ModalReview;
