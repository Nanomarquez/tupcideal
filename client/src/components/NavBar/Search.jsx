import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Search.css";

function Search() {
 
 const navigate = useNavigate()
 
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
 }

 let handleClose = () =>{
  setFilteredData([]);
  setWordEntered("")
 }
 const handleSubmit = () => {
  navigate(`/productos/search/${wordEntered}`)
 }

  return (
    <form onSubmit={handleSubmit}>
    <div className="searchBox">
      <div className="search hover:animate-pulse">
        <ion-icon name="search-outline"></ion-icon>
      </div>
      <div className="searchInput">
        <input type="text" placeholder="Buscar componente..." value={wordEntered} onChange={handleFilter}  />
      </div>
      <div className="close">
        <ion-icon name="close-outline" onClick={() => handleClose()}></ion-icon>
      </div>
      </div>
     
    
    </form>
  );
}

export default Search;
