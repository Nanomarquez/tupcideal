import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux"
import { useAuth } from "../context/authContext";
import { getFiltered2 } from "../redux/actions"

export default function Seller() {
  

    const dispatch = useDispatch()
    const filtered = useSelector(state => state.products.productsFiltered2)
    const { usuario } = useAuth();
    const [component, setComponent] = useState({});
    const [error, setError] = useState();
    const [seller, setSeller] = useState({});
    const [product, setProduct] = useState({
        precio: "",
        cantidad: "",
        id_vendedor: "",
        id_producto: "",
    });
   
   
    useEffect(() => {
      if(usuario){
      axios.get(`/sellers/${usuario.email}`).then((res) => {
        setSeller(res.data);
        setProduct({...product, id_vendedor : res.data.id})
      });
    }
    }, [usuario])
     
    let handleSelect = (e) => {
      const { value } = e.target;
      if(value) {
        const result = filtered.find((f) => f.id === value);
        setComponent(result);
        setProduct({...product, id_producto : result.id})
        console.log(result)
      }
    };

    let handleChange = (e) => {
      setProduct({
        ...product,
        [e.target.name]: e.target.value,
      });
    };

    let onSubmit = async (e) => {
      e.preventDefault();
      try {
       await axios
          .post("/warehouse", product)
          .then((res) => console.log(res));
          swal("Ok!", "Nuevo producto a la venta!", "success");
      } catch (error) {
        console.log(error);
      }
    };
   
    let disabled = true;

    if (product.precio !== "" && product.productId !== "" && product.cantidad !== "" &&
    product.sellerId !== ""){
      disabled = false
    }
  console.log(product)
  
  
    return (
       <div>
        <div>   
          <h1 className="p-4 text-2xl">Vender nuevo componente </h1>
          <button className="border-2 bg-gray-400 rounded p-1 justify-center" onClick={()=> dispatch(getFiltered2("CPU"))}>CPU</button>
          <button className="border-2 bg-gray-400 rounded p-1 justify-center" onClick={()=> dispatch(getFiltered2("Motherboard"))}>MOTHER BOARD</button>
          <button className="border-2 bg-gray-400 rounded p-1 justify-center" onClick={()=> dispatch(getFiltered2("Memory"))}>MEMORY CARD</button>
          <button className="border-2 bg-gray-400 rounded p-1 justify-center" onClick={()=> dispatch(getFiltered2("PowerSupply"))}>POWER SUPPLY</button>
          <button className="border-2 bg-gray-400 rounded p-1 justify-center" onClick={()=> dispatch(getFiltered2("InternalHardDrive"))}>INTERNAL HARD DRIVE</button>
          <button className="border-2 bg-gray-400 rounded p-1 justify-center" onClick={()=> dispatch(getFiltered2("Case"))}>CASES</button>
          <button className="border-2 bg-gray-400 rounded p-1 justify-center" onClick={()=> dispatch(getFiltered2("VideoCard"))}>VIDEO CARD</button>

          <select name={product.id} id={product.id} onChange={handleSelect}>
            <option value="">Elige el producto a vender</option>
            {filtered.map((f, i) => {
              return <option key={i} value={f.id}>{f.name} </option>;
            })}
          </select>
          <div>
            <h2>Name: {component?.name}</h2>
            <img
              src={component?.image}
              alt={component?.name}
              width="120"
            />
            <h3>Categoria {component?.categories}</h3>
            <h3>Rating {component?.rating}</h3>
            
            <form onSubmit={onSubmit}>
            <label>
              Precio
              <input
                type="number"
                name="precio"
                value={product.precio}
                onChange={handleChange}
                
              />
            </label>
            <label>
              Stock
              <input
                type="number"
                name="cantidad"
                value={product.cantidad}
                onChange={handleChange}
              />
            </label>
            <input className="border-2 bg-blue-400 rounded p-1 justify-center"disabled={disabled} type="submit" value="Agregar producto"  />
            </form>
          </div>
        </div>
    </div>
  )
}
