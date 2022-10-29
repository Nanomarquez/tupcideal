import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux"
import { getFiltered2 } from "../redux/actions"
function Admin() {

  const dispatch = useDispatch()
  const filtered = useSelector(state => state.products.productsFiltered2)
  
  const [users, setUsers] = useState([]);
  const [sellers, setSellers] = useState([]);
  
  const [component, setComponent] = useState({});

  const [product, setProduct] = useState({
    name: "",
    categories: "",
    price_usd: "",
    rating: "",
    rating_count: "",
    image: "",
  });

  const [seller, setSeller] = useState({
    store_name: "",
    adress: "",
    email: "",
    phone_number: ""
  });

  function axion() {
    axios.get("/users").then((res) => {
      setUsers(res.data.filter((e) => e.isAdmin !== true));
    });
  }
 
  function axionSellers() {
    axios.get("/sellers").then((res) => {
      setSellers(res.data);
    });
  }

  let handleDelete = async (e) => {
    await axios.delete(`/users/${e}`);
    axion();
  };
  let handleDeleteSeller = async (e) => {
    await axios.delete(`/sellers/${e}`);
    axionSellers();
  };

  let handleBan = async (e) => {
    await axios.put(`/users/${e}`, { ban: true });
    axion();
  };

  let handleDesBan = (e) => {
    axios.put(`/users/${e}`, { ban: false });
    axion();
  };

  let handleBanSeller = async (e) => {
    await axios.put(`/sellers/${e}`, { ban: true });
    axionSellers();
  };

  let handleDesBanSeller = (e) => {
    axios.put(`/sellers/${e}`, { ban: false });
    axionSellers();
  };

  let handleSelect = (e) => {
    const { value } = e.target;
    if(value) {
      const result = filtered.find((f) => f.id === value);
      setComponent(result);
    }
  };

  const productHandlerChange = (e) => {
    const  value  = {...product, [e.target.name]:e.target.value};
    setProduct(value);
  };

  const sellerHandlerChange = (e) => {
    const  value2  = {...seller, [e.target.name]:e.target.value};
    setSeller(value2);
  };

  let onClickDel = async (e) => {
    await axios.delete(`/products/${component.id}`);
    axion();
  };

  let onClickEdit = async (e) => {
    await axios.put(`/products/${component.Product.id}`);
    axion();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axios.post("/products",  product )
    console.log("Soy el producto",product)
    axion();
    
  }
  const onSubmitSeller = (e) => {
    e.preventDefault();
    axios.post("/sellers", seller)
    console.log("Soy el seller",seller) 
  }

  useEffect(() => {
    axion();
    axionSellers();
  }, []);
  // console.log(filtered)
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

      <div>
        <h1 className="p-4 text-4xl">Tabla de productos</h1>
        <div>
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
            <input className="border-2 bg-gray-400 rounded p-1 justify-center" type="submit" value="Submit" onClick={onSubmit} />
          </form>
        </div>
   
        <div>   
          <h1 className="p-4 text-2xl">Editar o Eliminar Componente </h1>
          <button className="border-2 bg-gray-400 rounded p-1 justify-center" onClick={()=> dispatch(getFiltered2("CPU"))}>CPU</button>
          <button className="border-2 bg-gray-400 rounded p-1 justify-center" onClick={()=> dispatch(getFiltered2("Motherboard"))}>MOTHER BOARD</button>
          <button className="border-2 bg-gray-400 rounded p-1 justify-center" onClick={()=> dispatch(getFiltered2("Memory"))}>MEMORY CARD</button>
          <button className="border-2 bg-gray-400 rounded p-1 justify-center" onClick={()=> dispatch(getFiltered2("PowerSupply"))}>POWER SUPPLY</button>
          <button className="border-2 bg-gray-400 rounded p-1 justify-center" onClick={()=> dispatch(getFiltered2("InternalHardDrive"))}>INTERNAL HARD DRIVE</button>
          <button className="border-2 bg-gray-400 rounded p-1 justify-center" onClick={()=> dispatch(getFiltered2("Case"))}>CASES</button>
          <button className="border-2 bg-gray-400 rounded p-1 justify-center" onClick={()=> dispatch(getFiltered2("VideoCard"))}>VIDEO CARD</button>

          <select name="" id="" onChange={handleSelect}>
            <option value="">Elige tu producto</option>
            {filtered.map((f, i) => {
              return <option key={i} value={f.id}>{f.name}</option>;
            })}
          </select>
          <div>
            <h2>Name: {component?.name}</h2>
            <img
              src={component?.image}
              alt={component?.name}
              width="120"
            />
            <h3>Category {component?.categories}</h3>
            <h3>Rating {component?.rating}</h3>
            <button className="border-2 bg-gray-400 rounded p-1 justify-center" onClick={onClickDel}>Eliminar</button>
            <button className="border-2 bg-gray-400 rounded p-1 justify-center"onClick={onClickEdit}>Editar</button>
          </div>
        </div>
      </div>     

      <div>
      <h1 className="p-4 text-4xl">Tabla de vendedores</h1>
      {sellers &&
          sellers.map((e, i) => (
            <div
              key={i}
              className="border-2 flex gap-10 justify-center items-center rounded"
            >
              <p className="text-xl font-medium">{e.store_name} </p>
              <button
                className="border-2 bg-blue-400 p-1 justify-center rounded"
                onClick={() => handleDeleteSeller(e.email)}
              >
                Eliminar
              </button>{" "}
              {e.isBanned && (
                <button
                  className="border-2 bg-blue-400 rounded p-1 justify-center"
                  onClick={() => handleDesBanSeller(e.email)}
                >
                  Desbanear
                </button>
              )}
              {!e.isBanned && (
                <button
                  className="border-2 rounder-2 bg-blue-400 p-1 justify-center"
                  onClick={() => handleBanSeller(e.email)}
                >
                  Banear
                </button>
              )}
            </div>
          ))}
      <form className="flex" onSubmit={onSubmitSeller}>
            <h1 className="p-4 text-2xl">Crear Vendedor</h1>
            <label>
              Store Name:
              <input
                type="text"
                name="store_name"
                value={seller.store_name}
                onChange={sellerHandlerChange}
              />
            </label>
            <label>
              Adress:
              <input
                type="text"
                name="adress"
                value={seller.adress}
                onChange={sellerHandlerChange}
              />
            </label>
            <label>
              email:
              <input
                type="text"
                name="email"
                value={seller.email}
                onChange={sellerHandlerChange}
              />
            </label>
            <label>
              Phone Number:
              <input
                type="text"
                name="phone_number"
                value={seller.phone_number}
                onChange={sellerHandlerChange}
              />
            </label>
            
            <input className="border-2 bg-blue-400 rounded p-1 justify-center" type="submit" value="Submit" onClick={onSubmitSeller} />
      </form>
      </div>
    </section>
    </div>
  );
}

export default Admin;