import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllById, addProductToShoppingCart } from "../redux/actions";
function ProductosSearch() {
  const { id } = useParams();
  
  const dispatch = useDispatch();
  const { productsFilterById } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(getAllById(id));
 
  }, [productsFilterById]);

  

  return (
    <>
      {productsFilterById.hasOwnProperty("precio") && (
        <div className="w-full h-[120%] flex flex-col sm:flex-row items-center">
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
                {"★".repeat(productsFilterById.Product.rating).padEnd(5, "☆")}
              </p>
              <h2 className="text-2xl">
                Marca: {productsFilterById.Product.name?.split(" ")[0]}
              </h2>
              <div className="flex gap-10 items-center">
              <h2 className="text-2xl">Precio: ${productsFilterById.precio}</h2>
              <h2 className="text-2xl">Vendido por <span className="bg-gray-300 px-2 py-1 rounded-md shadow-lg">{productsFilterById.Seller.store_name}</span></h2>
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
          </section>
        </div>
      )}
    </>
  );
}

export default ProductosSearch;
