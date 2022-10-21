import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./Search.css";
import { getAll, getAllById } from "../../redux/actions";

function Search() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [wordEntered, setWordEntered] = useState("");

  const [filteredData, setFilteredData] = useState([]);

  const { allProducts } = useSelector((state) => state.products);

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

  //  let handleFilter = (e) => {
  //   const searchword = e.target.value;
  //   setWordEntered(searchword);
  //  }

  useEffect(() => {
    dispatch(getAll());
  }, []);

  let handleFilter = (e) => {
    const searchword = e.target.value;
    setWordEntered(searchword);
    const newValue = allProducts.filter((product) => {
      return product.name.toLowerCase().includes(searchword.toLowerCase());
      //reemplazar jsonProducts por allProducts cunado el endpoint este listo
    });
    if (searchword === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newValue);
    }
  };

  let handleClose = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <form>
      <div className="searchBox">
        <div className="search hover:animate-pulse">
          <ion-icon name="search-outline"></ion-icon>
        </div>
        <div className="searchInput">
          <input
            type="text"
            placeholder="Buscar componente..."
            value={wordEntered}
            onChange={handleFilter}
          />
        </div>
        <div className="close">
          <ion-icon
            name="close-outline"
            onClick={() => handleClose()}
          ></ion-icon>
        </div>
      </div>
      {filteredData.length != 0 && (
        <div className="searchResult z-[1000000000]">
          {filteredData.slice(0, 10).map((p) =>
            import.meta.env.MODE === "development" ? (
              <a href={`http://localhost:3000/productos/search/${p.id}`}>
                <p className="hover:bg-blue-200">{p.name.slice(0, 25)}</p>
              </a>
            ) : (
              <a href={`https://tupcideal.vercel.app//productos/search/${p.id}`}>
                <p className="hover:bg-blue-200">{p.name.slice(0, 25)}</p>
              </a>
            )
          )}
        </div>
      )}
    </form>
  );
}

export default Search;
