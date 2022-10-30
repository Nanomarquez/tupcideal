import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Loading from "../components/Loading/Loading";
import {
  getAllById,
  addProductToShoppingCart,
  listReviews,
  addFavoritesList,
} from "../redux/actions";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import ModalReview from "../components/Modal/ModalReview";
function ProductosSearch() {
  const { favorites } = useSelector((state) => state.products);
  const [modalOpen, setModalOpen] = useState(false);
  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { productsFilterById } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(getAllById(id));
    setLoading(false);
  }, [id]);
  const [review, setReview] = useState([]);
  async function getReview() {
    return await axios
      .get(`/review/product/${id}`)
      .then((res) => setReview(res.data));
  }
  useEffect(() => {
    if (id) {
      getReview();
    }
  }, [id]);

  let handleFavoritesClick = (product) => {
    console.log(product);
    let favs = favorites.find((f) => f.id === product.id)
    if(!favs){
      dispatch(addFavoritesList(product));
    }  
  }

  if (loading || productsFilterById.Seller === undefined) {
    return <Loading />;
  }
  return (
    <>
      {productsFilterById.hasOwnProperty("precio") && (
        <div className="w-full flex flex-col sm:flex-row items-center">
          <section className="flex p-10 sm:w-2/5 justify-center w-full">
            <img
              src={productsFilterById.Product.image}
              className="object-contain"
              alt=""
            />
          </section>
          <section className="sm:w-3/5 w-full flex flex-col gap-5 justify-center p-10">
            <h1 className="bg-gradient-to-tr p-2 rounded-md text-2xl shadow-md from-gray-100 to-gray-200">
              {productsFilterById.Product.name?.slice(0, 40)}
            </h1>
            <div className="flex gap-10 text-xl">
              <p className="bg-gray-500 px-3 rounded-md text-xl text-white">
                Categoria:{" "}
                {productsFilterById.Product.categories
                  .toString()[0]
                  .toUpperCase() +
                  productsFilterById.Product.categories.toString().slice(1)}
              </p>
              {productsFilterById.cantidad > 0 ? (
                <p className="bg-green-500 px-3 rounded-md text-white text-xl">
                  Stock: {productsFilterById.cantidad}
                </p>
              ) : (
                <p className="bg-red-500 px-3 rounded-md text-white text-xl">
                  Stock: {productsFilterById.cantidad}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-5">
              <p className="text-xl">
                Rating:{" "}
                {"★".repeat(Math.round(productsFilterById.ratingProm)).padEnd(5, "☆")}
              </p>
              <h2 className="text-2xl">
                Marca: {productsFilterById.Product.name?.split(" ")[0]}
              </h2>
              <div className="flex gap-10 items-center">
                <h2 className="text-2xl">
                  Precio: ${productsFilterById.precio}
                </h2>
                <h2 className="text-2xl">
                  Vendido por{" "}
                  <span className="bg-gray-300 px-2 py-1 rounded-md shadow-lg">
                    {productsFilterById.Seller.store_name}
                  </span>
                </h2>
                <button onClick={() => handleFavoritesClick(productsFilterById)} className="flex justify-center z-50 items-center bg-gray-300/30 w-10 hover:bg-gray-300/90 transition rounded-md">
                  <img
                    src="https://cdn.pixabay.com/photo/2017/06/26/20/33/icon-2445095_960_720.png"
                    className="opacity-50 object-cover"
                    alt=""
                  />
                </button>
              </div>
            </div>
            <button
              className="bg-yellow-300 text-black rounded-md text-2xl p-2 shadow-lg hover:text-white hover:bg-yellow-500 duration-500"
              onClick={() =>
                dispatch(addProductToShoppingCart(productsFilterById))
              }
            >
              Agregar al carrito
            </button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                modalOpen ? close() : open();
              }}
              className="bg-gray-300 text-black rounded-md text-2xl p-2 shadow-lg hover:text-white hover:bg-gray- 500 duration-500"
            >
              Agregar comentario
            </motion.button>
          </section>
        </div>
      )}
      <div>
        <h2>Detalles:</h2>
        <ul>
          {
            productsFilterById.hasOwnProperty('componentData') && 
            Object.keys(productsFilterById.componentData).map(k=><li key={k}>{k}: {productsFilterById.componentData[k] ? productsFilterById.componentData[k] : 'No'}</li>)
          }
        </ul>
      </div>
      <div className="w-full h-[250px] overflow-y-scroll px-10 py-5 gap-5">
        {review?.map((e, i) => (
          <div
            key={i}
            className="flex flex-col justify-center rounded-md items-center border-2"
          >
            <p>Anonimo</p>
            <p>Comentario: {e.comment}</p>
            <p>Rating: {e.rating}</p>
          </div>
        ))}
      </div>
      <AnimatePresence
        initial={true}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        {modalOpen && <ModalReview ProductId={id} modalOpen={modalOpen} handleClose={close} />}
      </AnimatePresence>
    </>
  );
}

export default ProductosSearch;
