import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getFiltered2 } from "../redux/actions";
import { useAuth } from "../context/authContext";

function Admin() {
  const dispatch = useDispatch();
  const filtered = useSelector((state) => state.products.productsFiltered2);
  const { signUp } = useAuth();
  const [users, setUsers] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [error, setError] = useState();
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
    phone_number: "",
    password: "",
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

  let handleDesBan = async (e) => {
    await axios.put(`/users/${e}`, { ban: false });
    axion();
  };

  let handleBanSeller = async (e) => {
    await axios.put(`/sellers/${e}`, { ban: true });
    axionSellers();
  };

  let handleDesBanSeller = async (e) => {
    await axios.put(`/sellers/${e}`, { ban: false });
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
  };
  const onSubmitSeller = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signUp(seller.email, seller.password);
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

  const [disable, setDisable] = useState(true);

  useEffect(() => {
    if (
      seller.store_name !== "" &&
      seller.adress !== "" &&
      seller.email !== "" &&
      seller.password !== "" &&
      seller.phone_number !== ""
    ) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [seller]);

  useEffect(() => {
    axion();
    axionSellers();
  }, []);
  return (
    <div className="min-h-[100vh] bg-gray-700 flex flex-col gap-10">
      <section className="bg-gray-300 text-center shadow-lg shadow-white flex flex-col mt-10 rounded-md gap-10 mx-auto p-10">
        <article className="user">
          <h1 className="p-4 text-2xl">Tabla de usuarios</h1>
          <div className="flex flex-col gap-5">
            {users &&
              users.map((e, i) => (
                <div
                  key={i}
                  className="border-2 flex-col sm:flex-row w-min mx-auto px-10 flex gap-5 justify-center items-center rounded"
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
          </div>
        </article>
        <article class="seller">
          <h1 className="p-4 text-2xl">Tabla de vendedores</h1>
          <div className="flex flex-col gap-5">
            {sellers &&
              sellers.map((e, i) => (
                <div
                  key={i}
                  className="border-2 flex-col sm:flex-row w-min mx-auto px-10 flex gap-5 justify-center items-center rounded"
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
          </div>
        </article>
      </section>
      <section className="bg-gray-300 text-center">
        <article className="edit-delete-componente flex flex-col my-10">
          <div className="justify-center">
            <h1 className="p-4 text-2xl">Editar o Eliminar Componente </h1>
            <div className="grid gap-3 grid-cols-2">
              <div>
                <button
                  className="border-2 border-stone-400 bg-gray-200 hover:bg-zinc-400 rounded p-1 justify-center"
                  onClick={() => dispatch(getFiltered2("CPU"))}
                >
                  CPU
                </button>
              </div>
              <div>
                <button
                  className="border-2 border-stone-400 bg-gray-200 hover:bg-zinc-400 rounded p-1 justify-center"
                  onClick={() => dispatch(getFiltered2("Case"))}
                >
                  CASES
                </button>
              </div>
              <div>
                <button
                  className="border-2 border-stone-400 bg-gray-200 hover:bg-zinc-400 rounded p-1 justify-center"
                  onClick={() => dispatch(getFiltered2("VideoCard"))}
                >
                  VIDEO CARD
                </button>
              </div>
              <div>
                <button
                  className="border-2 border-stone-400 bg-gray-200 hover:bg-zinc-400 rounded p-1 justify-center"
                  onClick={() => dispatch(getFiltered2("Motherboard"))}
                >
                  MOTHER BOARD
                </button>
              </div>

              <div>
                <button
                  className="border-2 border-stone-400 bg-gray-200 hover:bg-zinc-400 rounded p-1 justify-center"
                  onClick={() => dispatch(getFiltered2("Memory"))}
                >
                  MEMORY CARD
                </button>
              </div>
              <div>
                <button
                  className="border-2 border-stone-400 bg-gray-200 hover:bg-zinc-400 rounded p-1 justify-center"
                  onClick={() => dispatch(getFiltered2("PowerSupply"))}
                >
                  POWER SUPPLY
                </button>
              </div>
              <div>
                <button
                  className="border-2 border-stone-400 bg-gray-200 hover:bg-zinc-400 rounded p-1 justify-center"
                  onClick={() => dispatch(getFiltered2("InternalHardDrive"))}
                >
                  INTERNAL HARD DRIVE
                </button>
              </div>
            </div>
            <div className="m-4 border-3">
              <select className="w-min" name="" id="" onChange={handleSelect}>
                <option value="">Elige tu producto</option>
                {filtered.map((f, i) => {
                  return (
                    <option key={i} value={f.id}>
                      {f.name.slice(0, 25)}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="border-2 w-max mx-auto bg-gray-100 rounded p-5 flex flex-col justify-center items-center">
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
          </div>
        </article>
        <article class="create-seller  bg-gray-700 py-5">
          <div className="w-min mx-auto bg-gray-300 px-20 rounded py-10 my-10">
            <h1 className="mb-6 text-2xl">Crear Vendedor</h1>
            <form
              className="flex justify-center items-center"
              onSubmit={onSubmitSeller}
            >
              <div className="flex flex-col justify-center items-center">
                <label className="flex flex-col justify-between">
                  Store Name:
                  <input
                    className="border-b-2 border-black rounded-md outline-none"
                    type="text"
                    name="store_name"
                    value={seller.store_name}
                    onChange={sellerHandlerChange}
                  />
                </label>
                <label className="flex flex-col justify-between">
                  Adress:
                  <input
                    className="border-b-2 border-black rounded-md outline-none"
                    type="text"
                    name="adress"
                    value={seller.adress}
                    onChange={sellerHandlerChange}
                  />
                </label>
                <label className="flex flex-col justify-between">
                  Email:
                  <input
                    className="border-b-2 border-black rounded-md outline-none"
                    Style="text-transform:lowercase"
                    type="text"
                    name="email"
                    value={seller.email}
                    onChange={sellerHandlerChange}
                  />
                </label>
                <label className="flex flex-col  justify-between">
                  Phone Number:
                  <input
                    className="border-b-2 border-black rounded-md outline-none"
                    type="text"
                    name="phone_number"
                    value={seller.phone_number}
                    onChange={sellerHandlerChange}
                  />
                </label>
                <label className="flex flex-col  justify-between">
                  Password:
                  <input
                    className="border-b-2 border-black rounded-md outline-none"
                    type="text"
                    name="password"
                    value={seller.password}
                    onChange={sellerHandlerChange}
                  />
                </label>

                <input
                  className={`border-2 bg-blue-400 rounded p-1 justify-center mt-4 ${
                    disable
                      ? "line-through"
                      : "cursor-pointer hover:bg-green-500"
                  } duration-200`}
                  type="submit"
                  value="Submit"
                  disabled={disable}
                  onClick={onSubmitSeller}
                />
              </div>
            </form>
          </div>
        </article>
      </section>
      <section className="bg-gray-300 text-center">
        <article className="py-5">
          <div className="w-min mx-auto bg-gray-700 px-20 rounded py-10 my-10">
            <h1 className="p-4 text-2xl text-white">Crear producto</h1>
            <form className="flex flex-col" onSubmit={onSubmit}>
              <div className="flex flex-col">
                <label className="text-white">
                  <span>Name:</span>
                  <input
                    className="border-b-2 border-black rounded-md outline-none"
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={productHandlerChange}
                  />
                </label>
                <label className="text-white">
                  Categories:
                  <input
                    className="border-b-2 border-black rounded-md outline-none"
                    type="text"
                    name="categories"
                    value={product.categories}
                    onChange={productHandlerChange}
                  />
                </label>
                <label className="text-white">
                  Price_USD:
                  <input
                    className="border-b-2 border-black rounded-md outline-none"
                    type="text"
                    name="price_usd"
                    value={product.price_usd}
                    onChange={productHandlerChange}
                  />
                </label>
                <label className="text-white">
                  Rating:
                  <input
                    className="border-b-2 border-black rounded-md outline-none"
                    type="text"
                    name="rating"
                    value={product.rating}
                    onChange={productHandlerChange}
                  />
                </label>
                <label className="text-white">
                  Rating Count:
                  <input
                    className="border-b-2 border-black rounded-md outline-none"
                    type="text"
                    name="rating_count"
                    value={product.rating_count}
                    onChange={productHandlerChange}
                  />
                </label>
                <label className="text-white">
                  Image:
                  <input
                    className="border-b-2 border-black rounded-md outline-none"
                    type="text"
                    name="image"
                    value={product.image}
                    onChange={productHandlerChange}
                  />
                </label>
                <input
                  className="border-b-2 cursor-pointer border-black bg-black text-white rounded-md outline-none mt-10"
                  type="submit"
                  value="Submit"
                  onClick={onSubmit}
                />
              </div>
            </form>
          </div>
        </article>
      </section>
    </div>
  );
}

export default Admin;
