import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductToShoppingCart,
  addFavoritesList,
  deleteFavoritesList,
} from "../redux/actions";
import { Link } from "react-router-dom";

function CustomPc() {
  const dispatch = useDispatch();
  const [array, setArray] = useState([]);
  const [step, setStep] = useState(0);
  const [step1, setStep1] = useState([]);
  const [step2, setStep2] = useState([]);
  const [step3, setStep3] = useState([]);
  const [step4, setStep4] = useState([]);
  const [step5, setStep5] = useState([]);
  const [step6, setStep6] = useState([]);
  const [step7, setStep7] = useState([]);
  const [step8, setStep8] = useState([]);
  const [step9, setStep9] = useState([]);
  const [step10, setStep10] = useState([]);
  const { favorites } = useSelector((state) => state.products);
  async function getBrand(brand) {
    setStep(step + 1);
    return await axios
      .get(`/warehouse?brand=${brand}&?category=CPU`)
      .then((res) => setStep1(res.data));
  }
  const cpu = (e) => {
    setArray([...array,e]);
    setStep(step + 1);
    axios
      .get(`/warehouse?category=Motherboard`)
      .then((res) => setStep2(res.data));
  };
  const mother = (e) => {
    setArray([...array, e]);
    setStep(step + 1);
    axios.get(`/warehouse?category=Memory`).then((res) => setStep3(res.data));
  };
  const memory = (e) => {
    setArray([...array, e]);
    setStep(step + 1);
    axios
      .get(`/warehouse?category=InternalHardDrive`)
      .then((res) => setStep4(res.data));
  };
  const internal = (e) => {
    setArray([...array, e]);
    setStep(step + 1);
    axios
      .get(`/warehouse?category=VideoCard`)
      .then((res) => setStep5(res.data));
  };
  const gpu = (e) => {
    if (!e) {
      setStep(step + 1);
      axios
        .get(`/warehouse?category=PowerSupply`)
        .then((res) => setStep6(res.data));
    }
    else{
      setArray([...array, e]);
      setStep(step + 1);
      axios
        .get(`/warehouse?category=PowerSupply`)
        .then((res) => setStep6(res.data));
    }
  };
  const powerSupply = (e) => {
    setArray([...array, e]);
    setStep(step + 1);
    axios.get(`/warehouse?category=Case`).then((res) => setStep7(res.data));
  };
  const eCase = (e) => {
    setArray([...array, e]);
    setStep(step + 1);
    axios.get(`/warehouse?category=Monitor`).then((res) => setStep8(res.data));
  };
  const monitor = (e) => {
    if (!e) {
      setStep(step + 1);
      axios
        .get(`/warehouse?category=Keyboard`)
        .then((res) => setStep9(res.data));
    }
    else{
      setArray([...array, e]);
      setStep(step + 1);
      axios.get(`/warehouse?category=Keyboard`).then((res) => setStep9(res.data));
    }
  };
  const keyboard = (e) => {
    if (!e) {
      setStep(step + 1);
      axios
        .get(`/warehouse?category=Mouse`)
        .then((res) => setStep10(res.data));
    }
    else{
      setArray([...array, e]);
      setStep(step + 1);
      axios.get(`/warehouse?category=Mouse`).then((res) => setStep10(res.data));
    }
  };
  const mouse = (e) => {
    if(!e){
      setStep(step + 1);
    }
    else{
      setArray([...array, e]);
      setStep(step + 1);
    }
  };

  let sumTotal = 0;

  array.map((e) => {
    sumTotal += e.precio;
  });

  const handleCart = () => {
    array.map((e) => {
      dispatch(addProductToShoppingCart(e));
    });
  };
  let handleFavoritesClick = (product) => {
    let favs = favorites.find((f) => f.id === product.id);
    if (!favs) {
      dispatch(addFavoritesList(product));
    } else {
      dispatch(deleteFavoritesList(product.id));
    }
  };

  const handleBack = () => {
    if(step === 0) return;
    const arrAux = array;
    arrAux.pop()
    setArray([...arrAux])
    setStep(step-1)
  }

  return (
    <div className="">
      <div className="text-center text-3xl flex flex-col gap-5 pt-5">
        <h1>Armemos tu pc en 11 pasos</h1>
        <p>Paso {step} de 11</p>
        {step > 1 && <button className="px-4 mb-7 py-2 mt-4 duration-300 mx-auto rounded-md bg-gray-300 hover:bg-gray-400 hover:text-white" onClick={handleBack}>Volver atras</button>}
        
      </div>
      <section>
        {step === 0 && (
          <div className="text-center text-5xl mt-5 flex flex-col justify-center items-center">
            <div className="text-base flex text-left w-[300px] sm:w-[600px] p-5 border-2 border-yellow-300 rounded-md font-bold">
              <img
                src="https://www.venex.com.ar/images/ALERTAICON.png"
                alt="icono"
                className="object-contain w-20"
              />
              Para solicitar el armado de tu PC deberás contar con estos
              componentes básicos: mother, fuente, gabinete, ram, procesador y
              disco. Tené en cuenta que el resto de componentes que estén en el
              pedido pero fuera del configurador no son considerados para el
              armado de tu PC y podras omitirlos.
            </div>
            <h1 className="py-10">Elije tu marca</h1>
            <div className="py-10 flex flex-col sm:flex-row items-center justify-center gap-24">
              <button
                className="hover:shadow-2xl shadow-black duration-500"
                onClick={() => getBrand("Intel")}
              >
                {" "}
                <img
                  src="https://d1io3yog0oux5.cloudfront.net/_bf0b00d6b16de1da5ce58f3ee8bc313f/intel/db/878/6995/social_image_resized.jpg"
                  className="h-40 rounded-lg w-60 object-cover"
                  alt="intel"
                />{" "}
              </button>
              <button
                className="hover:shadow-2xl shadow-black duration-500"
                onClick={() => getBrand("AMD")}
              >
                {" "}
                <img
                  src="https://www.amd.com/system/files/2020-06/amd-default-social-image-1200x628.jpg"
                  alt="amd"
                  className="h-40 rounded-lg w-60 object-cover"
                />{" "}
              </button>
            </div>
          </div>
        )}
        {step === 1 && (
          <div className="flex flex-col items-center justify-center">
            <div className="text-base flex-col sm:flex-row gap-5 flex text-left w-[300px] sm:w-[600px] p-5 border-2 border-yellow-300 rounded-md font-bold">
              <img
                src="https://www.venex.com.ar/images/configurador_pc/micro.png"
                alt="icono"
                className="object-contain w-20"
              />
              Microprocesador: Tu procesador es la pieza central del rendimiento
              de los programas. Lo ideal es que elijas el tuyo en base a los
              requisitos que recomiende el creador de las aplicaciones, juegos
              y/o programas que más te gusten
            </div>
            <h1 className="text-2xl py-5">Elije tu Microprocesador</h1>
            <div className="flex flex-col gap-5">
              {step1?.map((e, i) => (
                <div
                  key={i}
                  className={`flex w-full mt-5 rounded-lg flex-col sm:flex-row p-5 items-center shadow-xl overflow-clip ${
                    e.cantidad === 0 ? "bg-gray-300/50 line-through" : ""
                  }`}
                >
                  {" "}
                  <div className="flex items-center justify-center">
                    <div
                      className="text-white duration-500 rounded bg-gray-700/50 text-2xl flex hover:opacity-100 cursor-pointer opacity-0 justify-center items-center z-50 h-36 w-36 absolute text-center"
                      onClick={() => cpu(e)}
                    >
                      Elejir producto
                    </div>
                    <img
                      src={
                        e.Product.image !== null
                          ? e.Product.image
                          : "https://www.google.com/url?sa=i&url=https%3A%2F%2Ffreefrontend.com%2Fhtml-funny-404-pages%2F&psig=AOvVaw2uVY0F2x1P5v4BYUCQYcbR&ust=1666665878730000&source=images&cd=vfe&ved=0CA0QjRxqFwoTCNDRoq_s9_oCFQAAAAAdAAAAABAE"
                      }
                      alt=""
                      className="h-36 w-36 shadow-lg object-contain rounded-md border-b-[2px] border-l-[2px] duration-200 hover:scale-105"
                    />
                  </div>
                  <div className="sm:m-2 sm:ml-10 m-0">
                    <h1 className="text-2xl font-semibold overflow-ellipsis overflow-hidden whitespace-nowrap">
                      {e.Product.name.slice(0, 20) + "..."}
                    </h1>
                    <div className="flex gap-5">
                      <div className="flex items-center justify-center rounded-full text-xs bg-gray-100 w-20 px-3 py-1">
                        Stock:
                        <p className="font-extrabold ml-1">{e.cantidad}</p>
                      </div>
                      <span className="flex bg-gray-100 py-1 rounded-full items-center justify-center w-36">
                        Rating:{" "}
                        <p className="ml-1 text-lg">
                          {"★".repeat(Math.round(e.ratingProm)).padEnd(5, "☆")}
                        </p>
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-10 mt-5">
                      <div className="flex gap-10 justify-center items-center">
                        <Link to={`/productos/search/${e.id}`}>
                          <button className="bg-gray-600 hover:bg-gray-800 duration-500 font-medium px-6 py-2 tracking-wider transition text-white rounded-md">
                            Ver mas
                          </button>
                        </Link>
                        <button
                          className="flex justify-center items-center bg-gray-300/30 w-10 hover:bg-gray-300/90 transition rounded-md"
                          onClick={() => handleFavoritesClick(e)}
                        >
                          <img
                            src="https://cdn.pixabay.com/photo/2017/06/26/20/33/icon-2445095_960_720.png"
                            className="opacity-50 object-cover"
                            alt=""
                          />
                        </button>
                      </div>
                      <p className="flex flex-col mb-8 sm:mb-0 text-3xl font-bold text-center sm:text-start">
                        ${e.precio}
                      </p>
                    </div>
                  </div>
                  <div className="p-2 bg-gray-300 rounded text-center shadow-black shadow-sm font-bold">
                    Vendido por {e.Seller.store_name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="flex flex-col items-center justify-center">
            <div className="text-base flex-col sm:flex-row items-center gap-5 flex text-left w-[300px] sm:w-[600px] p-5 border-2 border-yellow-300 rounded-md font-bold">
              <img
                src="https://www.venex.com.ar/images/configurador_pc/motherboard.png"
                alt="icono"
                className="object-contain w-20"
              />
              Motherboard: Aquí encontrarás los modelos de placas madre aptas
              para procesadores Intel o AMD según tu elección. Podrás verificar
              la compatibilidad en la sección socket del modelo que te interese
              o consultar la lista de procesadores compatibles en la página web
              del fabricante.
            </div>
            <h1 className="text-2xl py-5">Elije tu mother</h1>
            <div className="flex flex-col gap-5">
              {step2?.map((e, i) => (
                <div
                  key={i}
                  className={`flex w-full mt-5 rounded-lg flex-col sm:flex-row p-5 items-center shadow-xl overflow-clip ${
                    e.cantidad === 0 ? "bg-gray-300/50 line-through" : ""
                  }`}
                >
                  {" "}
                  <div className="flex items-center justify-center">
                    <div
                      className="text-white duration-500 rounded bg-gray-700/50 text-2xl flex hover:opacity-100 cursor-pointer opacity-0 justify-center items-center z-50 h-36 w-36 absolute text-center"
                      onClick={() => mother(e)}
                    >
                      Elejir producto
                    </div>
                    <img
                      src={
                        e.Product.image !== null
                          ? e.Product.image
                          : "https://www.google.com/url?sa=i&url=https%3A%2F%2Ffreefrontend.com%2Fhtml-funny-404-pages%2F&psig=AOvVaw2uVY0F2x1P5v4BYUCQYcbR&ust=1666665878730000&source=images&cd=vfe&ved=0CA0QjRxqFwoTCNDRoq_s9_oCFQAAAAAdAAAAABAE"
                      }
                      alt=""
                      className="h-36 w-36 shadow-lg object-contain rounded-md border-b-[2px] border-l-[2px] duration-200 hover:scale-105"
                    />
                  </div>
                  <div className="sm:m-2 sm:ml-10 m-0">
                    <h1 className="text-2xl font-semibold overflow-ellipsis overflow-hidden whitespace-nowrap">
                      {e.Product.name.slice(0, 20) + "..."}
                    </h1>
                    <div className="flex gap-5">
                      <div className="flex items-center justify-center rounded-full text-xs bg-gray-100 w-20 px-3 py-1">
                        Stock:
                        <p className="font-extrabold ml-1">{e.cantidad}</p>
                      </div>
                      <span className="flex bg-gray-100 py-1 rounded-full items-center justify-center w-36">
                        Rating:{" "}
                        <p className="ml-1 text-lg">
                          {"★".repeat(Math.round(e.ratingProm)).padEnd(5, "☆")}
                        </p>
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-10 mt-5">
                      <div className="flex gap-10 justify-center items-center">
                        <Link to={`/productos/search/${e.id}`}>
                          <button className="bg-gray-600 hover:bg-gray-800 duration-500 font-medium px-6 py-2 tracking-wider transition text-white rounded-md">
                            Ver mas
                          </button>
                        </Link>
                        <button
                          className="flex justify-center items-center bg-gray-300/30 w-10 hover:bg-gray-300/90 transition rounded-md"
                          onClick={() => handleFavoritesClick(e)}
                        >
                          <img
                            src="https://cdn.pixabay.com/photo/2017/06/26/20/33/icon-2445095_960_720.png"
                            className="opacity-50 object-cover"
                            alt=""
                          />
                        </button>
                      </div>
                      <p className="flex flex-col mb-8 sm:mb-0 text-3xl font-bold text-center sm:text-start">
                        ${e.precio}
                      </p>
                    </div>
                  </div>
                  <div className="p-2 bg-gray-300 rounded text-center shadow-black shadow-sm font-bold">
                    Vendido por {e.Seller.store_name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="flex flex-col items-center justify-center">
            <div className="text-base flex-col sm:flex-row items-center gap-5 flex text-left w-[300px] sm:w-[600px] p-5 border-2 border-yellow-300 rounded-md font-bold">
              <img
                src="https://www.venex.com.ar/images/configurador_pc/ram.png"
                alt="icono"
                className="object-contain w-20"
              />
              Memorias Ram: Tamaño, cantidad y frecuencia serán los factores que
              a considerar en esta sección. Nuevamente estos dependerán de tu
              uso. Memorias de mayor tamaño suelen ser utilizadas en entornos
              profesionales exigentes. Mayores frecuencias y mayor cantidad de
              módulos generalmente son aprovechados por gamers, gracias a la
              tecnología DualChannel. Para un uso doméstico, los módulos únicos
              de 8GB son una buena opción.
            </div>
            <h1 className="text-2xl py-5">Elije tu memoria ram</h1>
            <div className="flex flex-col gap-5">
              {step3?.map((e, i) => (
                <div
                  key={i}
                  className={`flex w-full mt-5 rounded-lg flex-col sm:flex-row p-5 items-center shadow-xl overflow-clip ${
                    e.cantidad === 0 ? "bg-gray-300/50 line-through" : ""
                  }`}
                >
                  {" "}
                  <div className="flex items-center justify-center">
                    <div
                      className="text-white duration-500 rounded bg-gray-700/50 text-2xl flex hover:opacity-100 cursor-pointer opacity-0 justify-center items-center z-50 h-36 w-36 absolute text-center"
                      onClick={() => memory(e)}
                    >
                      Elejir producto
                    </div>
                    <img
                      src={
                        e.Product.image !== null
                          ? e.Product.image
                          : "https://www.google.com/url?sa=i&url=https%3A%2F%2Ffreefrontend.com%2Fhtml-funny-404-pages%2F&psig=AOvVaw2uVY0F2x1P5v4BYUCQYcbR&ust=1666665878730000&source=images&cd=vfe&ved=0CA0QjRxqFwoTCNDRoq_s9_oCFQAAAAAdAAAAABAE"
                      }
                      alt=""
                      className="h-36 w-36 shadow-lg object-contain rounded-md border-b-[2px] border-l-[2px] duration-200 hover:scale-105"
                    />
                  </div>
                  <div className="sm:m-2 sm:ml-10 m-0">
                    <h1 className="text-2xl font-semibold overflow-ellipsis overflow-hidden whitespace-nowrap">
                      {e.Product.name.slice(0, 20) + "..."}
                    </h1>
                    <div className="flex gap-5">
                      <div className="flex items-center justify-center rounded-full text-xs bg-gray-100 w-20 px-3 py-1">
                        Stock:
                        <p className="font-extrabold ml-1">{e.cantidad}</p>
                      </div>
                      <span className="flex bg-gray-100 py-1 rounded-full items-center justify-center w-36">
                        Rating:{" "}
                        <p className="ml-1 text-lg">
                          {"★".repeat(Math.round(e.ratingProm)).padEnd(5, "☆")}
                        </p>
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-10 mt-5">
                      <div className="flex gap-10 justify-center items-center">
                        <Link to={`/productos/search/${e.id}`}>
                          <button className="bg-gray-600 hover:bg-gray-800 duration-500 font-medium px-6 py-2 tracking-wider transition text-white rounded-md">
                            Ver mas
                          </button>
                        </Link>
                        <button
                          className="flex justify-center items-center bg-gray-300/30 w-10 hover:bg-gray-300/90 transition rounded-md"
                          onClick={() => handleFavoritesClick(e)}
                        >
                          <img
                            src="https://cdn.pixabay.com/photo/2017/06/26/20/33/icon-2445095_960_720.png"
                            className="opacity-50 object-cover"
                            alt=""
                          />
                        </button>
                      </div>
                      <p className="flex flex-col mb-8 sm:mb-0 text-3xl font-bold text-center sm:text-start">
                        ${e.precio}
                      </p>
                    </div>
                  </div>
                  <div className="p-2 bg-gray-300 rounded text-center shadow-black shadow-sm font-bold">
                    Vendido por {e.Seller.store_name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {step === 4 && (
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl py-5">Elije tu almacenamiento</h1>

            <div className="text-base flex-col sm:flex-row items-center gap-5 flex text-left w-[300px] sm:w-[600px] p-5 border-2 border-yellow-300 rounded-md font-bold">
              <img
                src="https://www.venex.com.ar/images/configurador_pc/ssd.png"
                alt="icono"
                className="object-contain w-20"
              />
              Disco Duro: Mayor capacidad de almacenamiento a un costo moderado.
              Estas unidades tradicionales son la alternativa apropiada para
              desktops personales, CCTVs y hasta servidores, gracias a la
              tecnología de los modelos NAS. <br />
              Disco SSD: La unidad SSD te permite trabajar a velocidades mucho
              mayores que su contraparte tradicional (HDD). Pueden utilizarse de
              forma complementaria o como unidad principal de almacenamiento.
              Por ejemplo, un disco de 240GB sería apropiado por sí mismo para
              un uso doméstico. Pero si lo combinamos con una unidad tradicional
              de 1TB, mejoramos el rendimiento de las aplicaciones principales y
              además nos permite separar los archivos más pesados que solo se
              guardan en el equipo.
            </div>
            <div className="flex flex-col gap-5">
              {step4?.map((e, i) => (
                <div
                  key={i}
                  className={`flex w-full mt-5 rounded-lg flex-col sm:flex-row p-5 items-center shadow-xl overflow-clip ${
                    e.cantidad === 0 ? "bg-gray-300/50 line-through" : ""
                  }`}
                >
                  {" "}
                  <div className="flex items-center justify-center">
                    <div
                      className="text-white duration-500 rounded bg-gray-700/50 text-2xl flex hover:opacity-100 cursor-pointer opacity-0 justify-center items-center z-50 h-36 w-36 absolute text-center"
                      onClick={() => internal(e)}
                    >
                      Elejir producto
                    </div>
                    <img
                      src={
                        e.Product.image !== null
                          ? e.Product.image
                          : "https://www.google.com/url?sa=i&url=https%3A%2F%2Ffreefrontend.com%2Fhtml-funny-404-pages%2F&psig=AOvVaw2uVY0F2x1P5v4BYUCQYcbR&ust=1666665878730000&source=images&cd=vfe&ved=0CA0QjRxqFwoTCNDRoq_s9_oCFQAAAAAdAAAAABAE"
                      }
                      alt=""
                      className="h-36 w-36 shadow-lg object-contain rounded-md border-b-[2px] border-l-[2px] duration-200 hover:scale-105"
                    />
                  </div>
                  <div className="sm:m-2 sm:ml-10 m-0">
                    <h1 className="text-2xl font-semibold overflow-ellipsis overflow-hidden whitespace-nowrap">
                      {e.Product.name.slice(0, 20) + "..."}
                    </h1>
                    <div className="flex gap-5">
                      <div className="flex items-center justify-center rounded-full text-xs bg-gray-100 w-20 px-3 py-1">
                        Stock:
                        <p className="font-extrabold ml-1">{e.cantidad}</p>
                      </div>
                      <span className="flex bg-gray-100 py-1 rounded-full items-center justify-center w-36">
                        Rating:{" "}
                        <p className="ml-1 text-lg">
                          {"★".repeat(Math.round(e.ratingProm)).padEnd(5, "☆")}
                        </p>
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-10 mt-5">
                      <div className="flex gap-10 justify-center items-center">
                        <Link to={`/productos/search/${e.id}`}>
                          <button className="bg-gray-600 hover:bg-gray-800 duration-500 font-medium px-6 py-2 tracking-wider transition text-white rounded-md">
                            Ver mas
                          </button>
                        </Link>
                        <button
                          className="flex justify-center items-center bg-gray-300/30 w-10 hover:bg-gray-300/90 transition rounded-md"
                          onClick={() => handleFavoritesClick(e)}
                        >
                          <img
                            src="https://cdn.pixabay.com/photo/2017/06/26/20/33/icon-2445095_960_720.png"
                            className="opacity-50 object-cover"
                            alt=""
                          />
                        </button>
                      </div>
                      <p className="flex flex-col mb-8 sm:mb-0 text-3xl font-bold text-center sm:text-start">
                        ${e.precio}
                      </p>
                    </div>
                  </div>
                  <div className="p-2 bg-gray-300 rounded text-center shadow-black shadow-sm font-bold">
                    Vendido por {e.Seller.store_name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {step === 5 && (
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl py-5">Elije tu Placa de Video</h1>
            <div className="text-base flex-col sm:flex-row items-center gap-5 flex text-left w-[300px] sm:w-[600px] p-5 border-2 border-yellow-300 rounded-md font-bold">
              <img
                src="https://www.venex.com.ar/images/configurador_pc/gpu.png"
                alt="icono"
                className="object-contain w-20"
              />
              Placa de video: Las tarjetas de video están orientadas a gamers y
              profesionales gráficos. Podés determinar cuál es el modelo que
              mejor se adapta a tu necesidad a través de Benchmarks o pruebas de
              rendimiento. Generalmente se muestran como documentos o videos en
              donde se realiza una prueba del modelo sobre programas y juegos,
              concretos o los más populares.
            </div>
            <button
              onClick={() => gpu()}
              className="px-4 py-2 mt-4 duration-300 mx-auto rounded-md bg-gray-300 hover:bg-gray-400 hover:text-white"
            >
              Omitir este paso
            </button>
            <div className="flex flex-col gap-5">
              {step5?.map((e, i) => (
                <div
                  key={i}
                  className={`flex w-full mt-5 rounded-lg flex-col sm:flex-row p-5 items-center shadow-xl overflow-clip ${
                    e.cantidad === 0 ? "bg-gray-300/50 line-through" : ""
                  }`}
                >
                  {" "}
                  <div className="flex items-center justify-center">
                    <div
                      className="text-white duration-500 rounded bg-gray-700/50 text-2xl flex hover:opacity-100 cursor-pointer opacity-0 justify-center items-center z-50 h-36 w-36 absolute text-center"
                      onClick={() => gpu(e)}
                    >
                      Elejir producto
                    </div>
                    <img
                      src={
                        e.Product.image !== null
                          ? e.Product.image
                          : "https://www.google.com/url?sa=i&url=https%3A%2F%2Ffreefrontend.com%2Fhtml-funny-404-pages%2F&psig=AOvVaw2uVY0F2x1P5v4BYUCQYcbR&ust=1666665878730000&source=images&cd=vfe&ved=0CA0QjRxqFwoTCNDRoq_s9_oCFQAAAAAdAAAAABAE"
                      }
                      alt=""
                      className="h-36 w-36 shadow-lg object-contain rounded-md border-b-[2px] border-l-[2px] duration-200 hover:scale-105"
                    />
                  </div>
                  <div className="sm:m-2 sm:ml-10 m-0">
                    <h1 className="text-2xl font-semibold overflow-ellipsis overflow-hidden whitespace-nowrap">
                      {e.Product.name.slice(0, 20) + "..."}
                    </h1>
                    <div className="flex gap-5">
                      <div className="flex items-center justify-center rounded-full text-xs bg-gray-100 w-20 px-3 py-1">
                        Stock:
                        <p className="font-extrabold ml-1">{e.cantidad}</p>
                      </div>
                      <span className="flex bg-gray-100 py-1 rounded-full items-center justify-center w-36">
                        Rating:{" "}
                        <p className="ml-1 text-lg">
                          {"★".repeat(Math.round(e.ratingProm)).padEnd(5, "☆")}
                        </p>
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-10 mt-5">
                      <div className="flex gap-10 justify-center items-center">
                        <Link to={`/productos/search/${e.id}`}>
                          <button className="bg-gray-600 hover:bg-gray-800 duration-500 font-medium px-6 py-2 tracking-wider transition text-white rounded-md">
                            Ver mas
                          </button>
                        </Link>
                        <button
                          className="flex justify-center items-center bg-gray-300/30 w-10 hover:bg-gray-300/90 transition rounded-md"
                          onClick={() => handleFavoritesClick(e)}
                        >
                          <img
                            src="https://cdn.pixabay.com/photo/2017/06/26/20/33/icon-2445095_960_720.png"
                            className="opacity-50 object-cover"
                            alt=""
                          />
                        </button>
                      </div>
                      <p className="flex flex-col mb-8 sm:mb-0 text-3xl font-bold text-center sm:text-start">
                        ${e.precio}
                      </p>
                    </div>
                  </div>
                  <div className="p-2 bg-gray-300 rounded text-center shadow-black shadow-sm font-bold">
                    Vendido por {e.Seller.store_name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {step === 6 && (
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl py-5">Elije tu Fuente</h1>
            <div className="text-base flex-col sm:flex-row items-center gap-5 flex text-left w-[300px] sm:w-[600px] p-5 border-2 border-yellow-300 rounded-md font-bold">
              <img
                src="https://www.venex.com.ar/images/configurador_pc/fuente.png"
                alt="icono"
                className="object-contain w-20"
              />
              Fuente: Las fuentes estándares de +-500W son comúnmente utilizadas
              en equipos domésticos y ofimáticos sin mucha demanda energética.
              Los modelos certificados de 500W o +, habitualmente se utilizan en
              equipos con tarjeta de video dedicada. Para verificar la
              compatibilidad entre una tarjeta de video y una fuente, deberás
              determinar si la primera posee el conector y consumo acorde a la
              segunda.
            </div>
            <div className="flex flex-col gap-5">
              {step6?.map((e, i) => (
                <div
                  key={i}
                  className={`flex w-full mt-5 rounded-lg flex-col sm:flex-row p-5 items-center shadow-xl overflow-clip ${
                    e.cantidad === 0 ? "bg-gray-300/50 line-through" : ""
                  }`}
                >
                  {" "}
                  <div className="flex items-center justify-center">
                    <div
                      className="text-white duration-500 rounded bg-gray-700/50 text-2xl flex hover:opacity-100 cursor-pointer opacity-0 justify-center items-center z-50 h-36 w-36 absolute text-center"
                      onClick={() => powerSupply(e)}
                    >
                      Elejir producto
                    </div>
                    <img
                      src={
                        e.Product.image !== null
                          ? e.Product.image
                          : "https://www.google.com/url?sa=i&url=https%3A%2F%2Ffreefrontend.com%2Fhtml-funny-404-pages%2F&psig=AOvVaw2uVY0F2x1P5v4BYUCQYcbR&ust=1666665878730000&source=images&cd=vfe&ved=0CA0QjRxqFwoTCNDRoq_s9_oCFQAAAAAdAAAAABAE"
                      }
                      alt=""
                      className="h-36 w-36 shadow-lg object-contain rounded-md border-b-[2px] border-l-[2px] duration-200 hover:scale-105"
                    />
                  </div>
                  <div className="sm:m-2 sm:ml-10 m-0">
                    <h1 className="text-2xl font-semibold overflow-ellipsis overflow-hidden whitespace-nowrap">
                      {e.Product.name.slice(0, 20) + "..."}
                    </h1>
                    <div className="flex gap-5">
                      <div className="flex items-center justify-center rounded-full text-xs bg-gray-100 w-20 px-3 py-1">
                        Stock:
                        <p className="font-extrabold ml-1">{e.cantidad}</p>
                      </div>
                      <span className="flex bg-gray-100 py-1 rounded-full items-center justify-center w-36">
                        Rating:{" "}
                        <p className="ml-1 text-lg">
                          {"★".repeat(Math.round(e.ratingProm)).padEnd(5, "☆")}
                        </p>
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-10 mt-5">
                      <div className="flex gap-10 justify-center items-center">
                        <Link to={`/productos/search/${e.id}`}>
                          <button className="bg-gray-600 hover:bg-gray-800 duration-500 font-medium px-6 py-2 tracking-wider transition text-white rounded-md">
                            Ver mas
                          </button>
                        </Link>
                        <button
                          className="flex justify-center items-center bg-gray-300/30 w-10 hover:bg-gray-300/90 transition rounded-md"
                          onClick={() => handleFavoritesClick(e)}
                        >
                          <img
                            src="https://cdn.pixabay.com/photo/2017/06/26/20/33/icon-2445095_960_720.png"
                            className="opacity-50 object-cover"
                            alt=""
                          />
                        </button>
                      </div>
                      <p className="flex flex-col mb-8 sm:mb-0 text-3xl font-bold text-center sm:text-start">
                        ${e.precio}
                      </p>
                    </div>
                  </div>
                  <div className="p-2 bg-gray-300 rounded text-center shadow-black shadow-sm font-bold">
                    Vendido por {e.Seller.store_name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {step === 7 && (
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl py-5">Elije tu Gabinete</h1>
            <div className="text-base flex-col sm:flex-row items-center gap-5 flex text-left w-[300px] sm:w-[600px] p-5 border-2 border-yellow-300 rounded-md font-bold">
              <img
                src="https://www.venex.com.ar/images/configurador_pc/gabinete.png"
                alt="icono"
                className="object-contain w-20"
              />
              Gabinete: Un gabinete Slim o de bajo perfil tiene como objetivo la
              portabilidad, por lo que son más pequeños. En los demás casos,
              gabinetes Mid-tower o Full-tower, te sugerimos repasar
              fundamentalmente las dimensiones de la motherboard, placa de video
              y refrigeración escogida para determinar si son compatibles con el
              gabinete que te interese.
            </div>
            <div className="flex flex-col gap-5">
              {step7?.map((e, i) => (
                <div
                  key={i}
                  className={`flex w-full mt-5 rounded-lg flex-col sm:flex-row p-5 items-center shadow-xl overflow-clip ${
                    e.cantidad === 0 ? "bg-gray-300/50 line-through" : ""
                  }`}
                >
                  {" "}
                  <div className="flex items-center justify-center">
                    <div
                      className="text-white duration-500 rounded bg-gray-700/50 text-2xl flex hover:opacity-100 cursor-pointer opacity-0 justify-center items-center z-50 h-36 w-36 absolute text-center"
                      onClick={() => eCase(e)}
                    >
                      Elejir producto
                    </div>
                    <img
                      src={
                        e.Product.image !== null
                          ? e.Product.image
                          : "https://www.google.com/url?sa=i&url=https%3A%2F%2Ffreefrontend.com%2Fhtml-funny-404-pages%2F&psig=AOvVaw2uVY0F2x1P5v4BYUCQYcbR&ust=1666665878730000&source=images&cd=vfe&ved=0CA0QjRxqFwoTCNDRoq_s9_oCFQAAAAAdAAAAABAE"
                      }
                      alt=""
                      className="h-36 w-36 shadow-lg object-contain rounded-md border-b-[2px] border-l-[2px] duration-200 hover:scale-105"
                    />
                  </div>
                  <div className="sm:m-2 sm:ml-10 m-0">
                    <h1 className="text-2xl font-semibold overflow-ellipsis overflow-hidden whitespace-nowrap">
                      {e.Product.name.slice(0, 20) + "..."}
                    </h1>
                    <div className="flex gap-5">
                      <div className="flex items-center justify-center rounded-full text-xs bg-gray-100 w-20 px-3 py-1">
                        Stock:
                        <p className="font-extrabold ml-1">{e.cantidad}</p>
                      </div>
                      <span className="flex bg-gray-100 py-1 rounded-full items-center justify-center w-36">
                        Rating:{" "}
                        <p className="ml-1 text-lg">
                          {"★".repeat(Math.round(e.ratingProm)).padEnd(5, "☆")}
                        </p>
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-10 mt-5">
                      <div className="flex gap-10 justify-center items-center">
                        <Link to={`/productos/search/${e.id}`}>
                          <button className="bg-gray-600 hover:bg-gray-800 duration-500 font-medium px-6 py-2 tracking-wider transition text-white rounded-md">
                            Ver mas
                          </button>
                        </Link>
                        <button
                          className="flex justify-center items-center bg-gray-300/30 w-10 hover:bg-gray-300/90 transition rounded-md"
                          onClick={() => handleFavoritesClick(e)}
                        >
                          <img
                            src="https://cdn.pixabay.com/photo/2017/06/26/20/33/icon-2445095_960_720.png"
                            className="opacity-50 object-cover"
                            alt=""
                          />
                        </button>
                      </div>
                      <p className="flex flex-col mb-8 sm:mb-0 text-3xl font-bold text-center sm:text-start">
                        ${e.precio}
                      </p>
                    </div>
                  </div>
                  <div className="p-2 bg-gray-300 rounded text-center shadow-black shadow-sm font-bold">
                    Vendido por {e.Seller.store_name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {step === 8 && (
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl py-5">Elije tu Monitor</h1>
            <div className="text-base flex-col sm:flex-row items-center gap-5 flex text-left w-[300px] sm:w-[600px] p-5 border-2 border-yellow-300 rounded-md font-bold">
              <img
                src="https://www.venex.com.ar/images/configurador_pc/monitor.png"
                alt="icono"
                className="object-contain w-20"
              />
              Monitor: Mayor tamaño o mayor performance? Los modelos de mayor
              tamaño están destinados a la comodidad y el confort alcanzando
              resoluciones de alta calidad. Mientras que los modelos más
              performantes incrementan características tales como la
              frecuencia(+60hz) para obtener mayor nitidez y fluidez en las
              imágenes construidas.
            </div>
            <button
              onClick={() => monitor()}
              className="px-4 py-2 mt-4 duration-300 mx-auto rounded-md bg-gray-300 hover:bg-gray-400 hover:text-white"
            >
              Omitir este paso
            </button>
            <div className="flex flex-col gap-5">
              {step8?.map((e, i) => (
                <div
                  key={i}
                  className={`flex w-full mt-5 rounded-lg flex-col sm:flex-row p-5 items-center shadow-xl overflow-clip ${
                    e.cantidad === 0 ? "bg-gray-300/50 line-through" : ""
                  }`}
                >
                  {" "}
                  <div className="flex items-center justify-center">
                    <div
                      className="text-white duration-500 rounded bg-gray-700/50 text-2xl flex hover:opacity-100 cursor-pointer opacity-0 justify-center items-center z-50 h-36 w-36 absolute text-center"
                      onClick={() => monitor(e)}
                    >
                      Elejir producto
                    </div>
                    <img
                      src={
                        e.Product.image !== null
                          ? e.Product.image
                          : "https://www.google.com/url?sa=i&url=https%3A%2F%2Ffreefrontend.com%2Fhtml-funny-404-pages%2F&psig=AOvVaw2uVY0F2x1P5v4BYUCQYcbR&ust=1666665878730000&source=images&cd=vfe&ved=0CA0QjRxqFwoTCNDRoq_s9_oCFQAAAAAdAAAAABAE"
                      }
                      alt=""
                      className="h-36 w-36 shadow-lg object-contain rounded-md border-b-[2px] border-l-[2px] duration-200 hover:scale-105"
                    />
                  </div>
                  <div className="sm:m-2 sm:ml-10 m-0">
                    <h1 className="text-2xl font-semibold overflow-ellipsis overflow-hidden whitespace-nowrap">
                      {e.Product.name.slice(0, 20) + "..."}
                    </h1>
                    <div className="flex gap-5">
                      <div className="flex items-center justify-center rounded-full text-xs bg-gray-100 w-20 px-3 py-1">
                        Stock:
                        <p className="font-extrabold ml-1">{e.cantidad}</p>
                      </div>
                      <span className="flex bg-gray-100 py-1 rounded-full items-center justify-center w-36">
                        Rating:{" "}
                        <p className="ml-1 text-lg">
                          {"★".repeat(Math.round(e.ratingProm)).padEnd(5, "☆")}
                        </p>
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-10 mt-5">
                      <div className="flex gap-10 justify-center items-center">
                        <Link to={`/productos/search/${e.id}`}>
                          <button className="bg-gray-600 hover:bg-gray-800 duration-500 font-medium px-6 py-2 tracking-wider transition text-white rounded-md">
                            Ver mas
                          </button>
                        </Link>
                        <button
                          className="flex justify-center items-center bg-gray-300/30 w-10 hover:bg-gray-300/90 transition rounded-md"
                          onClick={() => handleFavoritesClick(e)}
                        >
                          <img
                            src="https://cdn.pixabay.com/photo/2017/06/26/20/33/icon-2445095_960_720.png"
                            className="opacity-50 object-cover"
                            alt=""
                          />
                        </button>
                      </div>
                      <p className="flex flex-col mb-8 sm:mb-0 text-3xl font-bold text-center sm:text-start">
                        ${e.precio}
                      </p>
                    </div>
                  </div>
                  <div className="p-2 bg-gray-300 rounded text-center shadow-black shadow-sm font-bold">
                    Vendido por {e.Seller.store_name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {step === 9 && (
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl py-5">Elije tu Teclado</h1>
            <div className="text-base flex-col sm:flex-row items-center gap-5 flex text-left w-[300px] sm:w-[600px] p-5 border-2 border-yellow-300 rounded-md font-bold">
              <img
                src="https://www.venex.com.ar/images/configurador_pc/keyboard.png"
                alt="icono"
                className="object-contain w-20"
              />
              Teclado: Los modelos de membrana (de pulsación plana) suelen ser
              los más económicos y orientados a un uso básico. En cambio, los
              modelos mecánicos poseen diferentes tipos de interruptores
              individuales (optimizados para escritura), sensibilidad y niveles
              de ruido. Generalmente son para un uso más avanzado.
            </div>
            <button
              onClick={() => keyboard()}
              className="px-4 py-2 mt-4 duration-300 mx-auto rounded-md bg-gray-300 hover:bg-gray-400 hover:text-white"
            >
              Omitir este paso
            </button>
            <div className="flex flex-col gap-5">
              {step9?.map((e, i) => (
                <div
                  key={i}
                  className={`flex w-full mt-5 rounded-lg flex-col sm:flex-row p-5 items-center shadow-xl overflow-clip ${
                    e.cantidad === 0 ? "bg-gray-300/50 line-through" : ""
                  }`}
                >
                  {" "}
                  <div className="flex items-center justify-center">
                    <div
                      className="text-white duration-500 rounded bg-gray-700/50 text-2xl flex hover:opacity-100 cursor-pointer opacity-0 justify-center items-center z-50 h-36 w-36 absolute text-center"
                      onClick={() => keyboard(e)}
                    >
                      Elejir producto
                    </div>
                    <img
                      src={
                        e.Product.image !== null
                          ? e.Product.image
                          : "https://www.google.com/url?sa=i&url=https%3A%2F%2Ffreefrontend.com%2Fhtml-funny-404-pages%2F&psig=AOvVaw2uVY0F2x1P5v4BYUCQYcbR&ust=1666665878730000&source=images&cd=vfe&ved=0CA0QjRxqFwoTCNDRoq_s9_oCFQAAAAAdAAAAABAE"
                      }
                      alt=""
                      className="h-36 w-36 shadow-lg object-contain rounded-md border-b-[2px] border-l-[2px] duration-200 hover:scale-105"
                    />
                  </div>
                  <div className="sm:m-2 sm:ml-10 m-0">
                    <h1 className="text-2xl font-semibold overflow-ellipsis overflow-hidden whitespace-nowrap">
                      {e.Product.name.slice(0, 20) + "..."}
                    </h1>
                    <div className="flex gap-5">
                      <div className="flex items-center justify-center rounded-full text-xs bg-gray-100 w-20 px-3 py-1">
                        Stock:
                        <p className="font-extrabold ml-1">{e.cantidad}</p>
                      </div>
                      <span className="flex bg-gray-100 py-1 rounded-full items-center justify-center w-36">
                        Rating:{" "}
                        <p className="ml-1 text-lg">
                          {"★".repeat(Math.round(e.ratingProm)).padEnd(5, "☆")}
                        </p>
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-10 mt-5">
                      <div className="flex gap-10 justify-center items-center">
                        <Link to={`/productos/search/${e.id}`}>
                          <button className="bg-gray-600 hover:bg-gray-800 duration-500 font-medium px-6 py-2 tracking-wider transition text-white rounded-md">
                            Ver mas
                          </button>
                        </Link>
                        <button
                          className="flex justify-center items-center bg-gray-300/30 w-10 hover:bg-gray-300/90 transition rounded-md"
                          onClick={() => handleFavoritesClick(e)}
                        >
                          <img
                            src="https://cdn.pixabay.com/photo/2017/06/26/20/33/icon-2445095_960_720.png"
                            className="opacity-50 object-cover"
                            alt=""
                          />
                        </button>
                      </div>
                      <p className="flex flex-col mb-8 sm:mb-0 text-3xl font-bold text-center sm:text-start">
                        ${e.precio}
                      </p>
                    </div>
                  </div>
                  <div className="p-2 bg-gray-300 rounded text-center shadow-black shadow-sm font-bold">
                    Vendido por {e.Seller.store_name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {step === 10 && (
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl py-5">Elije tu Mouse</h1>
            <div className="text-base flex-col sm:flex-row items-center gap-5 flex text-left w-[300px] sm:w-[600px] p-5 border-2 border-yellow-300 rounded-md font-bold">
              <img
                src="https://www.venex.com.ar/images/configurador_pc/mouse.png"
                alt="icono"
                className="object-contain w-20"
              />
              Mouse: Los modelos ópticos funcionan mejor en superficies no
              brillantes y pads, mientras que un mouse láser puede funcionar en
              casi cualquier superficie. Algunos modelos hacen gala de botones
              configurables excelentes para gaming MOBA, entre otros. Así que
              tené en cuenta la superficie y el uso para elegir tu próximo
              mouse.
            </div>
            <button
              onClick={() => mouse()}
              className="px-4 py-2 mt-4 duration-300 mx-auto rounded-md bg-gray-300 hover:bg-gray-400 hover:text-white"
            >
              Omitir este paso
            </button>
            <div className="flex flex-col gap-5">
              {step10?.map((e, i) => (
                <div
                  key={i}
                  className={`flex w-full mt-5 rounded-lg flex-col sm:flex-row p-5 items-center shadow-xl overflow-clip ${
                    e.cantidad === 0 ? "bg-gray-300/50 line-through" : ""
                  }`}
                >
                  {" "}
                  <div className="flex items-center justify-center">
                    <div
                      className="text-white duration-500 rounded bg-gray-700/50 text-2xl flex hover:opacity-100 cursor-pointer opacity-0 justify-center items-center z-50 h-36 w-36 absolute text-center"
                      onClick={() => mouse(e)}
                    >
                      Elejir producto
                    </div>
                    <img
                      src={
                        e.Product.image !== null
                          ? e.Product.image
                          : "https://www.google.com/url?sa=i&url=https%3A%2F%2Ffreefrontend.com%2Fhtml-funny-404-pages%2F&psig=AOvVaw2uVY0F2x1P5v4BYUCQYcbR&ust=1666665878730000&source=images&cd=vfe&ved=0CA0QjRxqFwoTCNDRoq_s9_oCFQAAAAAdAAAAABAE"
                      }
                      alt=""
                      className="h-36 w-36 shadow-lg object-contain rounded-md border-b-[2px] border-l-[2px] duration-200 hover:scale-105"
                    />
                  </div>
                  <div className="sm:m-2 sm:ml-10 m-0">
                    <h1 className="text-2xl font-semibold overflow-ellipsis overflow-hidden whitespace-nowrap">
                      {e.Product.name.slice(0, 20) + "..."}
                    </h1>
                    <div className="flex gap-5">
                      <div className="flex items-center justify-center rounded-full text-xs bg-gray-100 w-20 px-3 py-1">
                        Stock:
                        <p className="font-extrabold ml-1">{e.cantidad}</p>
                      </div>
                      <span className="flex bg-gray-100 py-1 rounded-full items-center justify-center w-36">
                        Rating:{" "}
                        <p className="ml-1 text-lg">
                          {"★".repeat(Math.round(e.ratingProm)).padEnd(5, "☆")}
                        </p>
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-10 mt-5">
                      <div className="flex gap-10 justify-center items-center">
                        <Link to={`/productos/search/${e.id}`}>
                          <button className="bg-gray-600 hover:bg-gray-800 duration-500 font-medium px-6 py-2 tracking-wider transition text-white rounded-md">
                            Ver mas
                          </button>
                        </Link>
                        <button
                          className="flex justify-center items-center bg-gray-300/30 w-10 hover:bg-gray-300/90 transition rounded-md"
                          onClick={() => handleFavoritesClick(e)}
                        >
                          <img
                            src="https://cdn.pixabay.com/photo/2017/06/26/20/33/icon-2445095_960_720.png"
                            className="opacity-50 object-cover"
                            alt=""
                          />
                        </button>
                      </div>
                      <p className="flex flex-col mb-8 sm:mb-0 text-3xl font-bold text-center sm:text-start">
                        ${e.precio}
                      </p>
                    </div>
                  </div>
                  <div className="p-2 bg-gray-300 rounded text-center shadow-black shadow-sm font-bold">
                    Vendido por {e.Seller.store_name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {step === 11 && (
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl py-5">Estos son los productos elejidos</h1>
            <div className="flex flex-col items-center justify-center text-center">
              <h1 className="font-bold">Total ${sumTotal}</h1>
              <button
                className="px-4 py-2 hover:bg-gray-400 duration-300 hover:text-white bg-gray-300 rounded-md"
                onClick={handleCart}
              >
                Agregar al carrito
              </button>
            </div>
            <div className="flex flex-col gap-5">
              {array?.map((e, i) => (
                <div
                  key={i}
                  className={`flex w-full mt-5 rounded-lg flex-col sm:flex-row p-5 items-center shadow-xl overflow-clip ${
                    e.cantidad === 0 ? "bg-gray-300/50 line-through" : ""
                  }`}
                >
                  {" "}
                  <div className="flex items-center justify-center">
                    <img
                      src={
                        e.Product.image !== null
                          ? e.Product.image
                          : "https://www.google.com/url?sa=i&url=https%3A%2F%2Ffreefrontend.com%2Fhtml-funny-404-pages%2F&psig=AOvVaw2uVY0F2x1P5v4BYUCQYcbR&ust=1666665878730000&source=images&cd=vfe&ved=0CA0QjRxqFwoTCNDRoq_s9_oCFQAAAAAdAAAAABAE"
                      }
                      alt=""
                      className="h-36 w-36 shadow-lg object-contain rounded-md border-b-[2px] border-l-[2px] duration-200 hover:scale-105"
                    />
                  </div>
                  <div className="sm:m-2 sm:ml-10 m-0">
                    <h1 className="text-2xl font-semibold overflow-ellipsis overflow-hidden whitespace-nowrap">
                      {e.Product.name.slice(0, 20) + "..."}
                    </h1>
                    <div className="flex gap-5">
                      <div className="flex items-center justify-center rounded-full text-xs bg-gray-100 w-20 px-3 py-1">
                        Stock:
                        <p className="font-extrabold ml-1">{e.cantidad}</p>
                      </div>
                      <span className="flex bg-gray-100 py-1 rounded-full items-center justify-center w-36">
                        Rating:{" "}
                        <p className="ml-1 text-lg">
                          {"★".repeat(Math.round(e.ratingProm)).padEnd(5, "☆")}
                        </p>
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-10 mt-5">
                      <div className="flex gap-10 justify-center items-center">
                        <Link to={`/productos/search/${e.id}`}>
                          <button className="bg-gray-600 hover:bg-gray-800 duration-500 font-medium px-6 py-2 tracking-wider transition text-white rounded-md">
                            Ver mas
                          </button>
                        </Link>
                        <button
                          className="flex justify-center items-center bg-gray-300/30 w-10 hover:bg-gray-300/90 transition rounded-md"
                          onClick={() => handleFavoritesClick(e)}
                        >
                          <img
                            src="https://cdn.pixabay.com/photo/2017/06/26/20/33/icon-2445095_960_720.png"
                            className="opacity-50 object-cover"
                            alt=""
                          />
                        </button>
                      </div>
                      <p className="flex flex-col mb-8 sm:mb-0 text-3xl font-bold text-center sm:text-start">
                        ${e.precio}
                      </p>
                    </div>
                  </div>
                  <div className="p-2 bg-gray-300 rounded text-center shadow-black shadow-sm font-bold">
                    Vendido por {e.Seller.store_name}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col my-4 items-center justify-center text-center">
              <h1 className="font-bold">Total ${sumTotal}</h1>
              <button
                className="px-4 py-2 hover:bg-gray-400 duration-300 hover:text-white bg-gray-300 rounded-md"
                onClick={handleCart}
              >
                Agregar al carrito
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default CustomPc;
