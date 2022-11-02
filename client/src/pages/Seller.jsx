import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux"
import { useAuth } from "../context/authContext";
import { getFiltered2 } from "../redux/actions"

export default function Seller() {
  

    const dispatch = useDispatch()
    const filtered = useSelector(state => state.products.productsFiltered2)
    const { usuario } = useAuth();
    const[refresh, setRefresh] = useState("")
    const [component, setComponent] = useState({});
    const[filters, setFilters] = useState([]);
    const [allSelled, setAllSelled] = useState([]);
    const [editSelled, setEditSelled] = useState({
      precio: "",
      cantidad: "",
      })
    const[idProduct, setIdProduct]=useState("")
    const [error, setError] = useState(true);
    const [seller, setSeller] = useState({});
    const [product, setProduct] = useState({
        precio: "",
        cantidad: "",
        id_vendedor: "",
        id_producto: "",
    });
   
   
   async function getSeller (){
    await axios.get(`/sellers/${usuario.email}`).then((res) => {
      setSeller(res.data);
      setProduct({...product, id_vendedor : res.data.id})
      axios.get(`warehouse/seller/${res.data.id}`).then((res =>{
        setAllSelled(res.data);
        setFilters(res.data)
       }))
    });
   }

    
    useEffect(() => {
      if(usuario ){
     getSeller();
      }
      
    }, [usuario, error])

       
    let handleSelect = (e) => {
      const { value } = e.target;
      if(value) {
        const result = filtered.find((f) => f.id === value);
        setComponent(result);
        setProduct({...product, id_producto : result.id})
       // console.log(result)
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
          setProduct({...product, 
          precio: "", cantidad:""})
      } catch (error) {
        console.log(error);
      }
    };
   
    let filterCategory = (category) =>  {
    
     if(category === ""){
      setFilters(allSelled)
     }
     else{
     const filter =  allSelled.filter((c) => c.Product.categories === category);
     setFilters(filter);
     }
    }

    let handleChangeSale = (e) => {
      setEditSelled({
        ...editSelled,
       [e.target.name]: e.target.value,
      });
      setIdProduct(e.target.id);
    };


    let disabled = true;
    let form= false 
    let disabledPut = true;
    
    let handleClickForm = (id) =>{
      setEditSelled({});
      if (refresh === "") {
        setRefresh(id)
      }
      if (refresh === id) {
        setRefresh("")
      }
      else{
        setRefresh(id)
      }
      console.log(form);
    }

    let onSubmitPut = async (e) => {
      e.preventDefault();
      try {
       await axios
          .put(`/warehouse/${idProduct}`, editSelled)
          .then((res) => console.log(res));
          swal("Ok!", "Producto modificado!", "success");
          setEditSelled({});
          setError(!error);
          setRefresh("")
      } catch (error) {
        console.log(error);
      }
    };


    if (product.precio !== "" && product.productId !== "" && product.cantidad !== "" &&
    product.sellerId !== ""){
      disabled = false
    }

    if (editSelled.precio !== "" && idProduct !== "" && editSelled.cantidad !== "")
    {
      disabledPut = false
    }

    
 // console.log(product)
  //console.log(seller)
  console.log(editSelled);
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
            <p className="text-x2">
                Rating:{" "}
                {"★"
                  .repeat(Math.round(component?.rating))
                  .padEnd(5, "☆")}
              </p>
            
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
        <div>   
          <h1 className="p-4 text-2xl">Editar componente vendido </h1>
          <button className="border-2 bg-gray-400 rounded p-1 justify-center" onClick={()=> filterCategory("")}>TODOS</button>
          <button className="border-2 bg-gray-400 rounded p-1 justify-center" onClick={()=> filterCategory("CPU")}>CPU</button>
          <button className="border-2 bg-gray-400 rounded p-1 justify-center" onClick={()=> filterCategory("Motherboard")}>MOTHER BOARD</button>
          <button className="border-2 bg-gray-400 rounded p-1 justify-center" onClick={()=> filterCategory("Memory")}>MEMORY CARD</button>
          <button className="border-2 bg-gray-400 rounded p-1 justify-center" onClick={()=> filterCategory("PowerSupply")}>POWER SUPPLY</button>
          <button className="border-2 bg-gray-400 rounded p-1 justify-center" onClick={()=> filterCategory("InternalHardDrive")}>INTERNAL HARD DRIVE</button>
          <button className="border-2 bg-gray-400 rounded p-1 justify-center" onClick={()=> filterCategory("Case")}>CASES</button>
          <button className="border-2 bg-gray-400 rounded p-1 justify-center" onClick={()=> filterCategory("VideoCard")}>VIDEO CARD</button>

         
         {filters && filters.map((f) => <div className="mt-6 mb-4 border-b-4 border-grey-500 ..." >
           <div>
            <h2>Name: {f.Product.name}</h2>
            <img
              src={f.Product.image}
              alt={f.Product.name}
              width="120"
            />
            </div>
            <h3>Categoria {f.Product.categories}</h3>
            <p >
                Rating:{" "}
                {"★"
                  .repeat(Math.round(f.Product.ratingProm))
                  .padEnd(5, "☆")}
              </p>

              <p> Precio Actual = $ {f.precio}</p>
              <p> Stock Actual =  {f.cantidad} unidades</p>
            <button className="flex justify-center items-center bg-gray-300/30 w-22 hover:bg-gray-300/90 transition rounded-md" onClick={() =>handleClickForm(f.id)}>Modificar</button>
           {  refresh  === f.id &&  <form onSubmit={onSubmitPut}>
            <label>
              Precio
              <input className="left-5 w-55"
                placeholder={` ${f.precio}`}
                id={f.id}
                type="number"
                name="precio"
                value={editSelled.precio}
                onChange={handleChangeSale}
                
              />
            </label>
            <label>
              Stock
              <input
                 placeholder={` ${parseInt(f.cantidad) }`}
                id={f.id}
                type="number"
                name="cantidad"
                value={editSelled.cantidad}
                onChange={handleChangeSale}
              />
            </label>
            <input className="border-2 bg-blue-400 rounded p-1 justify-center"disabled={disabledPut} type="submit" value="Editar producto"  />
            </form> } 
          </div>)}

          
        </div>
   
   
    </div>
  )
}

/*<select name={product.id} id={product.id} onChange={handleSelect}>
<option value="">Elige el producto a vender</option>
{filters.map((f, i) => {
  return <option key={i} value={f.id}>{f.Product.name} </option>;
})}
</select>*/