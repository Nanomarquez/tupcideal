import React, { useEffect, useState } from "react";
import axios from "axios";
import { getFiltered} from "../redux/actions";
import {useDispatch, useSelector} from "react-redux";
function Admin() {
  const dispatch = useDispatch();
  const filtrados = useSelector(state => state.products.productsFiltered);
  console.log(filtrados);
  const [users, setUsers] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    categories: "",
    price_usd: "",
    rating: "",
    rating_count: "",
    image: "",
  });

 
  
  const productHandlerChange = (e) => {
    const  value  = {...product, [e.target.name]:e.target.value};

    console.log(value)
    setProduct(value);
  };
  

  
  
   const onSubmit = (e) => {
    e.preventDefault();
    axios.post("/products",  product )
    console.log("Soy el producto",product)
    axion();
    
  }
  
  





  function axion() {
    axios.get("/users").then((res) => {
      setUsers(res.data.filter((e) => e.isAdmin !== true));
    });
  }

  let handleDelete = async (e) => {
    await axios.delete(`/users/${e}`);
    axion();
  };

  let handleBan = async (e) => {
    await axios.put(`/users/${e}`, { ban: true });
    axion();
  };

  let handleDesBan = (e) => {
    axios.put(`/users/${e}`, { ban: false });
    axion();
  };

  useEffect(() => {
    axion();
  }, []);
  return (
    <div className="h-screen">
      <section className="w-[400px] bg-gray-300 h-auto sm:h-screen text-center">
        <h1 className="p-4 text-2xl">Tabla de usuarios</h1>
        {users &&
          users.map((e, i) => (
            <div
              key={i}
              className="border-2 flex gap-10 justify-center items-center rounded"
            >
              <p className="text-xl font-medium">{e.name} </p>
              <button
                className="border-2 bg-red-400 p-1 justify-center rounded"
                onClick={() => handleDelete(e.email)}
              >
                Eliminar
              </button>{" "}
              {e.isBanned && (
                <button
                  className="border-2 bg-green-400 rounded p-1 justify-center"
                  onClick={() => handleDesBan(e.email)}
                >
                  Desbanear
                </button>
              )}
              {!e.isBanned && (
                <button
                  className="border-2 rounded bg-red-400 p-1 justify-center"
                  onClick={() => handleBan(e.email)}
                >
                  Banear
                </button>
              )}
            </div>
          ))}
        <h1 className="p-4 text-2xl">Tabla de productos</h1>
        <form className="flex" onSubmit={onSubmit}>
          <h1 className="p-4 text-2xl">Crear producto</h1>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={productHandlerChange}
            />
          </label>
          <label>
            Categories:
            <input
              type="text"
              name="categories"
              value={product.categories}
              onChange={productHandlerChange}
            />
          </label>
          <label>
            Price_USD:
            <input
              type="text"
              name="price_usd"
              value={product.price_usd}
              onChange={productHandlerChange}
            />
          </label>
          <label>
            Rating:
            <input
              type="text"
              name="rating"
              value={product.rating}
              onChange={productHandlerChange}
            />
          </label>
          <label>
            Rating Count:
            <input
              type="text"
              name="rating_count"
              value={product.rating_count}
              onChange={productHandlerChange}
            />
          </label>
          <label>
            Image:
            <input
              type="text"
              name="image"
              value={product.image}
              onChange={productHandlerChange}
            />
          </label>
          <input type="submit" value="Submit" onClick={onSubmit} />
        </form>
        <form onSubmit={(e)=> {e.preventDefault()}}>
          <div>
            <h1>Buscar</h1>
            <button value="cpu" onClick={() => dispatch(getFiltered("cpu"))}>
              CPU
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Admin;
