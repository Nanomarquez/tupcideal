import React, { useEffect, useState } from "react";
import Select from "react-select";
import SliderRange from "../components/SliderRange";
import Loading from "../components/Loading/Loading";
import Pagination from "../components/Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  getAll,
  getFiltered,
  orderProducts,
  addProductToShoppingCart,

  addFavoritesList,

} from "../redux/actions";
import { Link } from "react-router-dom";

function Productos() {
  const allProducts = useSelector((state) => state.products.allProducts);
  const productsFiltered = useSelector(
    (state) => state.products.productsFiltered
  );

  const { favorites } = useSelector((state) => state.products);

  const [loading, setLoading] = useState(true);


  const productNotNull = productsFiltered.filter(
    (p) => p.precio !== null && p.image !== null
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAll());
    setLoading(false)
  }, []);
  const [filters, setFilters] = useState({
    category: "",
    brand: "",
  });
  const [currentPage, setCurrentPage] = useState(1);

  const productPerPage = 35;

  const lastProductOfPage = currentPage * productPerPage;

  const firstProductOfPage = lastProductOfPage - productPerPage;

  const currentProducts = productNotNull.slice(
    firstProductOfPage,
    lastProductOfPage
  );

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const setBrand = new Set();
  const setCategory = new Set();

  if (filters.brand) {
    currentProducts?.map((e) => setCategory.add(e.Product.categories));
  } else {
    allProducts?.map((e) => setCategory.add(e.Product.categories));
  }

  if (filters.category) {
    currentProducts?.map((e) => setBrand.add(e.Product.name.split(" ")[0]));
  } else {
    allProducts?.map((e) => setBrand.add(e.Product.name.split(" ")[0]));
  }

  useEffect(() => {
    dispatch(getFiltered(filters.brand, filters.category));
    setLoading(false)
  }, [filters]);

  const handleChangeCategory = (e) => {
    if (e !== null) {
      setFilters({ ...filters, [e.name]: e.value });
    } else {
      setFilters({
        ...filters,
        category: "",
      });
    }
    setCurrentPage(1);
  };

  const handleChangeBrand = (e) => {
    if (e !== null) {
      setFilters({ ...filters, [e.name]: e.value });
    } else {
      setFilters({
        ...filters,
        brand: "",
      });
    }
    setCurrentPage(1);
  };
  const handleSort = (e) => {
    dispatch(orderProducts(e.target.value));
  };



  let handleFavoritesClick = (product) => {
    let favs = favorites.find((f) => f.id === product.id)
    if(!favs){
      dispatch(addFavoritesList(product));
   
    }  
  }
   
  if(loading || currentProducts.length === 0){
    return <Loading/>
  }
  return (
    <div className="flex items-center justify-center bg-gray-300">
      <div className="flex sm:flex-row flex-col w-full lg:w-[1050px] bg-white shadow-md">
        <section className="p-2 sm:px-5 border-b-2 sm:border-b-0 sm:border-r-2 rounded-xl w-full sm:w-2/6">
          <h1 className="text-xl sm:text-2xl mb-2">Filtrar por:</h1>
          <hr />
          <div className="flex flex-col gap-5 p-2">
            <Select
              placeholder="Categoria"
              isClearable
              options={Array.from(setCategory).map((item) => ({
                name: "category",
                label: item,
                value: item,
              }))}
              name="category"
              onChange={handleChangeCategory}
              className="z-50 cursor-pointer"
            />
            <Select
              placeholder="Marca"
              isClearable
              options={Array.from(setBrand).map((item) => ({
                name: "brand",
                label: item,
                value: item,
              }))}
              name="brand"
              onChange={handleChangeBrand}
              className="z-30 cursor-pointer"
            />
            <div className="flex flex-col gap-2 border p-2">
              <label>Ordenar por precio: </label>
              <select
                className="outline-none"
                name="Ordenar"
                onChange={handleSort}
              >
                <option value="Ascendente">Ascendente </option>
                <option value="Descendente">Descendente </option>
              </select>
            </div>
            <SliderRange setCurrentPage={setCurrentPage} />
          </div>
        </section>
        <section className="flex flex-col p-5">
          <div className="flex justify-center items-center">
            <Pagination
              productPerPage={productPerPage}
              allProducts={productsFiltered.length}
              pagination={pagination}
              currentPage={currentPage}
            />
          </div>
          {currentProducts.map((e, i) => (
            <div
              key={i}
              className="flex w-full mt-5 rounded-lg flex-col sm:flex-row p-5 items-center shadow-xl overflow-clip"
            >
              {" "}
              <div className="flex items-center justify-center">

                  <div onClick={()=>dispatch(addProductToShoppingCart(e))} className="text-white duration-500 rounded bg-gray-700/50 text-2xl flex hover:opacity-100 cursor-pointer opacity-0 justify-center items-center z-50 h-36 w-36 absolute text-center">
                    Añadir al carrito
                  </div>
                  <img
                    src={
                      e.Product.image !== null
                        ? e.Product.image
                        : "https://www.google.com/url?sa=i&url=https%3A%2F%2Ffreefrontend.com%2Fhtml-funny-404-pages%2F&psig=AOvVaw2uVY0F2x1P5v4BYUCQYcbR&ust=1666665878730000&source=images&cd=vfe&ved=0CA0QjRxqFwoTCNDRoq_s9_oCFQAAAAAdAAAAABAE"
                    }
                    alt=""
                    className="h-36 w-36 shadow-lg object-contain rounded-md border-b-[2px] border-l-[2px] duration-200 hover:scale-105"
                  />

              </div>
              <div className="sm:m-2 sm:ml-10 m-0">
                <h1 className="text-2xl font-semibold overflow-ellipsis overflow-hidden whitespace-nowrap">
                  {e.Product.name.slice(0, 20) + "..."}
                </h1>
                <div className="flex gap-5">
                  <div className="flex items-center justify-center rounded-full text-xs bg-gray-100 w-20 px-3 py-1">
                    Stock:
                    <p className="font-extrabold ml-1">
                      {e.cantidad}
                    </p>
                  </div>
                  <span className="flex bg-gray-100 py-1 rounded-full items-center justify-center w-36">
                    Rating:{" "}
                    <p className="ml-1 text-lg">
                      {"★".repeat(Math.round(e.ratingProm)).padEnd(5, "☆")}
                    </p>
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row gap-10 mt-5">
                  <div className="flex gap-10 justify-center items-center">
                    <Link to={`/productos/search/${e.id}`}>
                      <button className="bg-gray-600 hover:bg-gray-800 duration-500 font-medium px-6 py-2 tracking-wider transition text-white rounded-md">
                        Ver mas
                      </button>
                    </Link>
                    <button  onClick={() => handleFavoritesClick(e)} className="flex justify-center items-center bg-gray-300/30 w-10 hover:bg-gray-300/90 transition rounded-md">
                      <img
                        src="https://cdn.pixabay.com/photo/2017/06/26/20/33/icon-2445095_960_720.png"
                        className="opacity-50 object-cover"
                        alt=""
                      />
                    </button>
                  </div>
                  <p className="flex flex-col mb-8 sm:mb-0 text-3xl font-bold text-center sm:text-start">
                    ${e.precio}
                  </p>
                </div>
              </div>
              <div className="p-2 bg-gray-300 rounded text-center shadow-black shadow-sm font-bold">Vendido por {e.Seller.store_name}</div>
            </div>
          ))}
          <div className="flex justify-center items-center">
            <Pagination
              productPerPage={productPerPage}
              allProducts={productsFiltered.length}
              pagination={pagination}
              currentPage={currentPage}
            />
          </div>
        </section>
      </div>
    </div>
  );
}

export default Productos;
