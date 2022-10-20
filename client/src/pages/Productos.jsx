import React, { useEffect, useState } from "react";
import Select from "react-select";
import SliderRange from "../components/SliderRange";
import Pagination from "../components/Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { getAll, getFiltered } from "../redux/actions";

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

  const productPerPage = 10;

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
  };
  if (productsFiltered.length === 0) {
    return <h1>Loading</h1>;
  }
  return (
    <div className="flex sm:flex-row flex-col">
      <section className="p-2 sm:px-5 border-b-2 sm:border-b-0 sm:border-r-2 rounded-xl w-full sm:w-2/6">
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
          <SliderRange />
        </div>
      </section>
      <section className="flex flex-col w-full p-5">
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
            className="flex w-full mt-5 rounded-lg flex-col sm:flex-row p-5 shadow-xl overflow-hidden"
          >
            {" "}
            <div className="flex items-center justify-center">
              <img
                src={e.image}
                alt=""
                className="h-36 w-36 shadow-lg object-contain rounded-md border-b-[2px] border-l-[2px] duration-200 hover:scale-105"
              />
            </div>
            <div className="m-2 ml-10">
              <h1 className="text-2xl font-semibold overflow-ellipsis overflow-hidden whitespace-nowrap">
                {e.name.slice(0, 35) + "..."}
              </h1>
              <div className="flex gap-5">
                <div className="flex items-center justify-center rounded-full text-xs bg-gray-100 w-20 px-3 py-1">
                  Stock:<p className="font-extrabold ml-1">{e.quantity}</p>
                </div>
                <span className="flex bg-gray-100 py-1 rounded-full items-center justify-center w-36">
                  Rating:{" "}
                  <p className="ml-1 text-lg">
                    {"★".repeat(e.calification).padEnd(5, "☆")}
                  </p>
                </span>
              </div>
              <div className="flex flex-col sm:flex-row gap-10 mt-5">
                <div className="flex gap-10 justify-center items-center">
                <button className="bg-gray-600 hover:bg-gray-800 duration-500 font-medium px-6 py-2 tracking-wider transition text-white rounded-md">
                  Añadir al carrito
                </button>
                <button className="flex justify-center items-center bg-gray-300/30 w-10 hover:bg-gray-300/90 transition rounded-md">
                  <img
                    src="https://cdn.pixabay.com/photo/2017/06/26/20/33/icon-2445095_960_720.png"
                    className="opacity-50 object-cover"
                    alt=""
                  />
                </button>
                </div>
                <p className="flex flex-col text-3xl font-bold text-center sm:text-start">
                ${e.price}
              </p>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Productos;
