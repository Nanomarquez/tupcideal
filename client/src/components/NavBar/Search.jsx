import React from "react";
import {useDispatch, useSelector} from "react-redux"
import { useEffect, useState } from "react";
import { jsonProducts } from "../../dbejemplo"
import "./Search.css";

function Search() {
 
 let dispatch = useDispatch();

 //const {allProducts} = useSelector(state => state.products) activar cuando este el endpoint
 
 const [filteredData, setFilteredData] = useState([]);
 const [wordEntered, setWordEntered] = useState("")
 
  useEffect(() => {
    let search = document.querySelector(".search");
    let close = document.querySelector(".close");
    let searchBox = document.querySelector(".searchBox");
    search.addEventListener("click", () => {
      searchBox.classList.add("active");
    });
    close.addEventListener("click", () => {
      searchBox.classList.remove("active");
     });

    close.addEventListener("mouseover", () => {
      close.style.transform = "rotate(180deg)";
    });
    close.addEventListener("mouseout", () => {
      close.style.transform = "rotate(-180deg)";
    });
  }, []);


 let handleFilter = (e) => {
  const searchword = e.target.value;
  setWordEntered(searchword);
  const newValue = jsonProducts.filter((product) => {
    return product.name.toLowerCase().includes(searchword.toLowerCase())
    //reemplazar jsonProducts por allProducts cunado el endpoint este listo
  })
  if (searchword === "") {
    setFilteredData([])
  }else{
    setFilteredData(newValue)
  }
 }

/* let handleSearch = (search) => {
  dispatch(getAllByName(search))
 }
 activar cuando este listo el endpoint y agregar onClick={() => handleSearch(p.name) 
  al <a classname "dataItem" 
 */  

 let handleClose = () =>{
  setFilteredData([]);
  setWordEntered("")
 }


  return (
    <div>
    <div className="searchBox">
      <div className="search hover:animate-pulse">
        <ion-icon name="search-outline"></ion-icon>
      </div>
      <div className="searchInput">
        <input type="text" placeholder="Buscar componente..." value={wordEntered} onChange={handleFilter} />
      </div>
      <div className="close">
        <ion-icon name="close-outline" onClick={() => handleClose()}></ion-icon>
      </div>
     
  
    </div>
    {filteredData.length != 0 && ( 
        <div className="searchResult">
           {filteredData.slice(0,7).map((p) => <a className="dataItem" key={p.name}> <p>{p.name}</p>

           </a>)}

        </div>)}
    </div>
  );
}

export default Search;
