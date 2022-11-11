import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getFiltered2 } from "../redux/actions";
import { useAuth } from "../context/authContext";
import swal from 'sweetalert';
import "../components/NavBar/Signin.css"
import { useNavigate } from "react-router-dom";
import UploadWidgetProduct from "../components/UploadWidgetProduct";
function Admin() {
  const dispatch = useDispatch();
  const filtered = useSelector((state) => state.products.productsFiltered2);
  const {allProducts} = useSelector(state=>state.products)
  const { signUpTwo , usuario } = useAuth();
  const [users, setUsers] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [error, setError] = useState();
  const [component, setComponent] = useState({});
  const navigate = useNavigate()
  function isAdmin(){
      axios.get(`/users/${usuario.email}`).then(res=>{
        if(!res.data.isAdmin){
          navigate('/')
        };
      }) 
  }

  const setCategory = new Set();
  allProducts?.map((e) => setCategory.add(e.Product.categories))


  useEffect(()=>{
    if(!usuario){
      navigate('/')
    }else if(usuario){
      isAdmin()
    }
  },[usuario])
  const [image,setImage] = useState("");
  const [product, setProduct] = useState({
    name: "",
    categories: "PowerSupply",
    image
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
      let filtrados=(res.data.filter((e) => e.isAdmin !== true));
      filtrados.sort(function (a, b) {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
      setUsers(filtrados)
    });
  }

  function axionSellers() {
    axios.get("/sellers").then((res) => {
      res.data.sort(function (a, b) {
        if (a.store_name > b.store_name) {
          return 1;
        }
        if (a.store_name < b.store_name) {
          return -1;
        }
        
        return 0;
      });
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
    const answer= await axios.delete(`/products/${component.id}`);
    if(answer.data.resp===1){
      swal("Great",answer.data.message,"success");
    }else{
      swal("Sorry",answer.data.message,"error");
    }
    axion();
  };

  // let onClickEdit = async (e) => {
  //   await axios.put(`/products/${component.Product.id}`);
  //   axion();
  // };
  
  const onSubmit = async (e) => {
    e.preventDefault();
    const resp = await axios.post("/products", product);
    if(resp.data.resp===0){
      swal("Warning",resp.data.message,"error");
      setProduct({
        name: "",
        categories: "",
        image: "",
      })
    }else{
      swal("Great","The product was created successfully","success");
      setProduct({
        name: "",
        categories: "",
        image: "",
      })
    }
  };

  const onSubmitSeller = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signUpTwo(seller.email, seller.password,usuario.email)
      await axios
        .post("/sellers", seller)
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
    setSeller({
      store_name: "",
      adress: "",
      email: "",
      phone_number: "",
      password: "",
    })
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
  useEffect(() => {
    setProduct({...product,image})
  }, [image])
  
  console.log(image);
  console.log(product);
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
        <article className="seller">
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
            <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
                {Array.from(setCategory).map((item,key)=>(
                  <button key={key} className="border-2 border-stone-400 bg-gray-200 hover:bg-zinc-400 rounded p-1 justify-center"
                  onClick={() => dispatch(getFiltered2(item))}>
                    {item}
                  </button>
                ))}
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
              {/* <button
                className="border-2 bg-gray-400 rounded p-1 justify-center"
                onClick={onClickEdit}
              >
                Editar
              </button> */}
            </div>
          </div>
        </article>
        <article className="create-seller  bg-gray-700 py-5">
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
                    className="border-b-2 border-black lowercase rounded-md outline-none"
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
                    type="password"
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
            <form className="flex flex-col">
              <div className="flex flex-col">
                <label className="">
                  <span>Name:</span>
                  <input
                    className="border-b-2 border-black rounded-md outline-none"
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={productHandlerChange}
                  />
                </label>
                <label className="">
                  Categories:
                  <select name="categories" className="text-center  border-b-2 border-black rounded-md outline-none" onChange={productHandlerChange}>
                    {Array.from(setCategory).map((item,key)=>(
                      <option key={key} value={item}>{item}</option>
                    ))}
                  </select>
                </label>
                <div className="flex justify-center items-center">

                <img src={image} className="w-20" />

                </div>
              </div>
            </form><div className="flex flex-col">
                  <UploadWidgetProduct setImage={setImage}/>
                <input
                  className="border-b-2 cursor-pointer border-black bg-black text-white rounded-md outline-none mt-10"
                  type="submit"
                  value="Submit"
                  onClick={onSubmit}
                  />
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}

export default Admin;
