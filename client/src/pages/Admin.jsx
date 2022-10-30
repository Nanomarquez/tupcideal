import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux"
import { getFiltered2 } from "../redux/actions"
import { useAuth } from "../context/authContext";
function Admin() {
  const dispatch = useDispatch();
  const filtered = useSelector((state) => state.products.productsFiltered2);


  const dispatch = useDispatch()
  const filtered = useSelector(state => state.products.productsFiltered2)
  const { signUp } = useAuth();
  const [users, setUsers] = useState([]);
  const [sellers, setSellers] = useState([]);

  const [component, setComponent] = useState({});
  const [error, setError] = useState();
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
    phone_number: "",

    password:"",

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
    if (value) {
      const result = filtered.find((f) => f.id === value);
      setComponent(result);
    }
  };

  const productHandlerChange = (e) => {
    const value = { ...product, [e.target.name]: e.target.value };
    setProduct(value);
  };

  const sellerHandlerChange = (e) => {
    const value2 = { ...seller, [e.target.name]: e.target.value };
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
    axios.post("/products", product);
    console.log("Soy el producto", product);
    axion();

    
  }
  const  onSubmitSeller = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signUp(seller.email,seller.password)
      await axios
        .post("/sellers", seller)
        .then((res) => console.log(res.data))
        .catch((e) => console.log(e));
     // navigate("/login");
      swal("Ok!", "Vendedor creado exitosamente", "success");
    } catch (error) {
      if (error.code === "auth/missing-email")
        setError("Especifique un correo");
      if (error.code === "auth/weak-password")
        setError("La contraseña debe tener mas de 6 caracteres");
      if (error.code === "auth/invalid-email")
        setError("Ingrese un correo valido");
      if (error.code === "auth/email-already-in-use")
        setError("Usuario ya existente");
      if (error.code === "auth/internal-error") setError("Contraseña invalida");
    }
  };

    
    
    
    console.log("Soy el seller",seller) 
  


  useEffect(() => {
    axion();
    axionSellers();
  }, []);
  // console.log(filtered)
  return (
    <div className="min-h-[100vh] flex ">
      <section className="w-2/5 min-w-[28%] bg-gray-300 h-auto sm:h-screen text-center">
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
          <h1 className="p-4 text-2xl">Tabla de vendedores</h1>
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
          <form className="flex justify-center" onSubmit={onSubmitSeller}>
            <div className="flex flex-col">
              <h1 className="p-4 text-2xl">Crear Vendedor</h1>
              <label className="flex justify-between">
                Store Name:
                <input
                  className=" border-2 border-black h-8 ml-4"
                  type="text"
                  name="store_name"
                  value={seller.store_name}
                  onChange={sellerHandlerChange}
                />
              </label>
              <label className="flex justify-between">
                Adress:
                <input
                  className=" border-2 border-black h-8 ml-4"
                  type="text"
                  name="adress"
                  value={seller.adress}
                  onChange={sellerHandlerChange}
                />
              </label>
              <label className="flex justify-between">
                email:
                <input
                  className=" border-2 border-black h-8 ml-4"
                  type="text"
                  name="email"
                  value={seller.email}
                  onChange={sellerHandlerChange}
                />
              </label>
              <label className="flex justify-between">
                Phone Number:
                <input
                  className=" border-2 border-black h-8 ml-4"
                  type="text"
                  name="phone_number"
                  value={seller.phone_number}
                  onChange={sellerHandlerChange}
                />
              </label>

              <input

                type="text" 
                name="image"
                value={product.image}
                onChange={productHandlerChange}
                className="border-2 bg-blue-400 rounded p-1 justify-center self-end mt-4"
                type="submit"
                value="Submit"
                onClick={onSubmitSeller}

              />
            </div>
          </form>
        </div>
      </section>
      <section className="flex">
        {/* ------------------------------------------ */}
        <section className="flex">
          <div className="ml-4">
            <h1 className="p-4 text-2xl">Editar o Eliminar Componente </h1>
            <button
              className="border-2 bg-gray-400 rounded p-1 justify-center"
              onClick={() => dispatch(getFiltered2("CPU"))}
            >
              CPU
            </button>
            <button
              className="border-2 bg-gray-400 rounded p-1 justify-center"
              onClick={() => dispatch(getFiltered2("Motherboard"))}
            >
              MOTHER BOARD
            </button>
            <button
              className="border-2 bg-gray-400 rounded p-1 justify-center"
              onClick={() => dispatch(getFiltered2("Memory"))}
            >
              MEMORY CARD
            </button>
            <button
              className="border-2 bg-gray-400 rounded p-1 justify-center"
              onClick={() => dispatch(getFiltered2("PowerSupply"))}
            >
              POWER SUPPLY
            </button>
            <button
              className="border-2 bg-gray-400 rounded p-1 justify-center"
              onClick={() => dispatch(getFiltered2("InternalHardDrive"))}
            >
              INTERNAL HARD DRIVE
            </button>
            <button
              className="border-2 bg-gray-400 rounded p-1 justify-center"
              onClick={() => dispatch(getFiltered2("Case"))}
            >
              CASES
            </button>
            <button
              className="border-2 bg-gray-400 rounded p-1 justify-center"
              onClick={() => dispatch(getFiltered2("VideoCard"))}
            >
              VIDEO CARD
            </button>

            <select name="" id="" onChange={handleSelect}>
              <option value="">Elige tu producto</option>
              {filtered.map((f, i) => {
                return (
                  <option key={i} value={f.id}>
                    {f.name}
                  </option>
                );
              })}
            </select>
            <div>
              <h2>Name: {component?.name}</h2>
              <img src={component?.image} alt={component?.name} width="120" />
              <h3>Category {component?.categories}</h3>
              <h3>Rating {component?.rating}</h3>
              <button
                className="border-2 bg-gray-400 rounded p-1 justify-center"
                onClick={onClickDel}
              >
                Eliminar
              </button>
              <button
                className="border-2 bg-gray-400 rounded p-1 justify-center"
                onClick={onClickEdit}
              >
                Editar
              </button>
            </div>

          ))}
      <form className="flex" onSubmit={onSubmitSeller}>
      {error && (
                <p className="bg-red-300 rounded-lg text-center mx-auto mb-7 w-max m-2 p-2">
                  {error}
                </p>
              )}
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
            <label>
              Password:
              <input
                type="text"
                name="password"
                value={seller.password}
                onChange={sellerHandlerChange}
              />
            </label>
            
            <input className="border-2 bg-blue-400 rounded p-1 justify-center" type="submit" value="Submit" onClick={onSubmitSeller} />
      </form>
      </div>
    </section>
          </div>
          {/* ------------------------------------------ */}
          <div>
            <h1 className="p-4 text-2xl">Tabla de productos</h1>
            <div>
              <form className="flex" onSubmit={onSubmit}>
                <div className="flex">
                  <h1 className="p-4 text-2xl">Crear producto</h1>
                  <div className="flex flex-wrap flex-row-reverse mr-10">
                    <label>
                      <span>Name:</span>
                      <input
                        className=" border-2 border-black h-8 ml-4"
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={productHandlerChange}
                      />
                    </label>
                    <label>
                      Categories:
                      <input
                        className=" border-2 border-black h-8 ml-4"
                        type="text"
                        name="categories"
                        value={product.categories}
                        onChange={productHandlerChange}
                      />
                    </label>
                    <label>
                      Price_USD:
                      <input
                        className=" border-2 border-black h-8 ml-4"
                        type="text"
                        name="price_usd"
                        value={product.price_usd}
                        onChange={productHandlerChange}
                      />
                    </label>
                    <label>
                      Rating:
                      <input
                        className=" border-2 border-black h-8 ml-4"
                        type="text"
                        name="rating"
                        value={product.rating}
                        onChange={productHandlerChange}
                      />
                    </label>
                    <label>
                      Rating Count:
                      <input
                        className=" border-2 border-black h-8 ml-4"
                        type="text"
                        name="rating_count"
                        value={product.rating_count}
                        onChange={productHandlerChange}
                      />
                    </label>
                    <label>
                      Image:
                      <input
                        className=" border-2 border-black h-8 ml-4"
                        type="text"
                        name="image"
                        value={product.image}
                        onChange={productHandlerChange}
                      />
                    </label>
                    <input
                      className="border-2 bg-gray-400 rounded p-1 justify-center mr-4"
                      type="submit"
                      value="Submit"
                      onClick={onSubmit}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}

export default Admin;