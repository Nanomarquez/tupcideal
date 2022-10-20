import React, { useEffect, useState } from "react";
import Select from "react-select";
import SliderRange from "../components/SliderRange";
import Pagination from "../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  getAll,
  getFiltered,
  orderProducts,
  addProductToShoppingCart,
} from "../redux/actions";
import { Link } from "react-router-dom";

function Productos() {
  const allProducts = useSelector((state) => state.products.allProducts);
  const productsFiltered = useSelector(
    (state) => state.products.productsFiltered
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAll());
  }, []);
  const [filters, setFilters] = useState({
    category: "",
    brand: "",
  });

  const [currentPage, setCurrentPage] = useState(1);

  const productPerPage = 6;

  const lastProductOfPage = currentPage * productPerPage;

  const firstProductOfPage = lastProductOfPage - productPerPage;

  const currentProducts = productsFiltered.slice(
    firstProductOfPage,
    lastProductOfPage
  );

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const setCategory = new Set();
  allProducts.map((e) => setCategory.add(e.categories[0]));

  const setBrand = new Set();
  allProducts.map((e) => setBrand.add(e.brand));

  // const handleChange = (e) =>{
  //   if(e !== null)
  //   setFilters({...filters,[e.name]:e.value})
  //   else{
  //     setFilters({
  //       category:"",
  //       brand:""
  //     })
  //   }
  // }

  useEffect(() => {
    dispatch(getFiltered(filters.brand, filters.category));
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

  return (
    <div className="flex sm:flex-row flex-col">
      <section className="p-2 sm:px-5 border-b-2 sm:border-b-0 sm:border-r-2 rounded-xl w-full sm:w-2/4">
        <h1 className="text-xl sm:text-2xl mb-2">Filtrar por:</h1>
        <hr />
        <div className="flex flex-col gap-5 p-5">
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
          <label>Ordenar por precio: </label>
          <select name="Ordenar" onChange={handleSort}>
            <option value="Ascendente">Ascendente: </option>
            <option value="Descendente">Descendente: </option>
          </select>
        </div>
      </section>
      <section className="grid grid-cols-3 w-full sm:my-10">
        {currentProducts.map((e, i) => (
          <div
            key={i}
            className="h-[200px] justify-center items-center text-center my-20 mx-5 border rounded-lg flex flex-col gap-5"
          >
            <img src={e.image} alt="" className="w-24 h-24 object-contain" />
            <h1>{e.name.slice(0, 30) + "..."}</h1>
            <p>${e.price}</p>
            <Link to={`/productos/search/${e.id}`}>
              <button className="bg-black p-5 text-white rounded-md">
                Ver mas
              </button>
              <br />
            </Link>
            <button
              className="bg-black p-1 text-white rounded-md"
              onClick={() => dispatch(addProductToShoppingCart(e))}
            >
              agregar al carrito
            </button>
          </div>
        ))}
      </section>
      <div className="flex justify-center items-center sm:absolute right-[12%]">
        <Pagination
          productPerPage={productPerPage}
          allProducts={productsFiltered.length}
          pagination={pagination}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}

export default Productos;
