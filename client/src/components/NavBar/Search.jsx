import React from "react";
import { useEffect } from "react";
import "./Search.css";

function Search() {
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

  return (
    <div className="searchBox">
      <div className="search hover:animate-pulse">
        <ion-icon name="search-outline"></ion-icon>
      </div>
      <div className="searchInput">
        <input type="text" placeholder="Buscar componente..." />
      </div>
      <div className="close">
        <ion-icon name="close-outline"></ion-icon>
      </div>
    </div>
  );
}

export default Search;
