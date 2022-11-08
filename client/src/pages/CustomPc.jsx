import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addProductToShoppingCart } from "../redux/actions";
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

  async function getBrand(brand) {
    setStep(step + 1);
    return await axios
      .get(`/warehouse?brand=${brand}&?category=CPU`)
      .then((res) => setStep1(res.data));
  }
  const cpu = (e) => {
    setArray([e]);
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
    setArray([...array, e]);
    setStep(step + 1);
    axios
      .get(`/warehouse?category=PowerSupply`)
      .then((res) => setStep6(res.data));
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
    setArray([...array, e]);
    setStep(step + 1);
    axios.get(`/warehouse?category=Keyboard`).then((res) => setStep9(res.data));
  };
  const keyboard = (e) => {
    setArray([...array, e]);
    setStep(step + 1);
    axios.get(`/warehouse?category=Mouse`).then((res) => setStep10(res.data));
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

  return (
    <div className="">
      <div className="text-center text-3xl flex flex-col gap-5 pt-5">
        <h1>Vamos a armar tu pc en 11 pasos</h1>

        <p>Paso {step} de 11</p>
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
              disco. De lo contrario, te los enviaremos sin ensamblar. Tené en
              cuenta que el resto de componentes que estén en el pedido pero
              fuera del configurador no son considerados para el armado de tu
              PC.
            </div>
            <h2>Empecemos!</h2>
            <h1 className="py-10">Elije tu marca</h1>
            <div className="py-10 flex flex-col sm:flex-row items-center justify-center gap-24">
              <button
                className="hover:shadow-xl shadow-black"
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
                className="hover:shadow-xl shadow-black"
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
            <div className="text-base flex-col sm:flex-row items-center gap-5 flex text-left w-[300px] sm:w-[600px] p-5 border-2 border-yellow-300 rounded-md font-bold">
              <img
                src="https://www.venex.com.ar/images/configurador_pc/micro.png"
                alt="icono"
                className="object-contain w-20"
              />
              Microprocesador: Tu procesador es la pieza central del rendimiento
              de los programas. Los modelos están ordenados desde aquellos
              destinados a un uso doméstico, hasta entornos profesionales
              pasando por gaming y streaming. Lo ideal es que elijas el tuyo en
              base a los requisitos que recomiende el creador de las
              aplicaciones, juegos y/o programas que más te gusten
            </div>
            <h1 className="text-2xl py-5">Elije tu Microprocesador</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
              {step1?.map((e, i) => (
                <div
                  className="flex m-5 shadow-black hover:shadow-xl cursor-pointer rounded-md flex-col justify-center border-2 items-center w-[200px] h-[200px]"
                  key={i}
                  onClick={() => cpu(e)}
                >
                  <p className="font-bold text-center">{e.Product.name}</p>
                  <img
                    src={e.Product.image}
                    className="w-24 h-24 object-contain"
                    alt={e.Product.name}
                  />
                  <p>${e.precio}</p>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
              {step2.slice(0, 30)?.map((e, i) => (
                <div
                  onClick={() => mother(e)}
                  key={i}
                  className="flex m-5 shadow-black hover:shadow-xl cursor-pointer rounded-md flex-col justify-center border-2 items-center w-[200px] h-[200px]"
                >
                  <p className="font-bold text-center">{e.Product.name}</p>
                  <img
                    src={e.Product.image}
                    alt={e.Product.name}
                    className="w-24 h-24 object-contain"
                  />
                  <p>${Math.ceil(e.precio)}</p>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
              {step3.slice(0, 30)?.map((e, i) => (
                <div
                  onClick={() => memory(e)}
                  key={i}
                  className="flex m-5 shadow-black hover:shadow-xl cursor-pointer rounded-md flex-col justify-center border-2 items-center w-[200px] h-[200px]"
                >
                  <p className="font-bold text-center">{e.Product.name}</p>
                  <img
                    src={e.Product.image}
                    alt={e.Product.name}
                    className="w-24 h-24 object-contain"
                  />
                  <p>${Math.ceil(e.precio)}</p>
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
              
Disco Duro: Mayor capacidad de almacenamiento a un costo moderado. Estas unidades tradicionales son la alternativa apropiada para desktops personales, CCTVs y hasta servidores, gracias a la tecnología de los modelos NAS. <br />
Disco SSD: La unidad SSD te permite trabajar a velocidades mucho mayores que su contraparte tradicional (HDD). Pueden utilizarse de forma complementaria o como unidad principal de almacenamiento.
Por ejemplo, un disco de 240GB sería apropiado por sí mismo para un uso doméstico. Pero si lo combinamos con una unidad tradicional de 1TB, mejoramos el rendimiento de las aplicaciones principales y además nos permite separar los archivos más pesados que solo se guardan en el equipo.
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
              {step4.slice(0, 30)?.map((e, i) => (
                <div
                  onClick={() => internal(e)}
                  key={i}
                  className="flex m-5 shadow-black hover:shadow-xl cursor-pointer rounded-md flex-col justify-center border-2 items-center w-[200px] h-[200px]"
                >
                  <p className="font-bold text-center">{e.Product.name}</p>
                  <img
                    src={e.Product.image}
                    alt={e.Product.name}
                    className="w-24 h-24 object-contain"
                  />
                  <p>${Math.ceil(e.precio)}</p>
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
              
              Placa de video: Las tarjetas de video están orientadas a gamers y profesionales gráficos. Podés determinar cuál es el modelo que mejor se adapta a tu necesidad a través de Benchmarks o pruebas de rendimiento. Generalmente se muestran como documentos o videos en donde se realiza una prueba del modelo sobre programas y juegos, concretos o los más populares.
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
              {step5.slice(0, 30)?.map((e, i) => (
                <div
                  onClick={() => gpu(e)}
                  key={i}
                  className="flex m-5 shadow-black hover:shadow-xl cursor-pointer rounded-md flex-col justify-center border-2 items-center w-[200px] h-[200px]"
                >
                  <p className="font-bold text-center">{e.Product.name}</p>
                  <img
                    src={e.Product.image}
                    alt={e.Product.name}
                    className="w-24 h-24 object-contain"
                  />
                  <p>${Math.ceil(e.precio)}</p>
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
Fuente: Las fuentes estándares de +-500W son comúnmente utilizadas en equipos domésticos y ofimáticos sin mucha demanda energética. Los modelos certificados de 500W o +, habitualmente se utilizan en equipos con tarjeta de video dedicada.
Para verificar la compatibilidad entre una tarjeta de video y una fuente, deberás determinar si la primera posee el conector y consumo acorde a la segunda.
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
              {step6.slice(0, 30)?.map((e, i) => (
                <div
                  onClick={() => powerSupply(e)}
                  key={i}
                  className="flex m-5 shadow-black hover:shadow-xl cursor-pointer rounded-md flex-col justify-center border-2 items-center w-[200px] h-[200px]"
                >
                  <p className="font-bold text-center">{e.Product.name}</p>
                  <img
                    src={e.Product.image}
                    alt={e.Product.name}
                    className="w-24 h-24 object-contain"
                  />
                  <p>${Math.ceil(e.precio)}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {step === 7 && (
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl py-5">Elije tu Gabinete</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
              {step7.slice(0, 30)?.map((e, i) => (
                <div
                  onClick={() => eCase(e)}
                  key={i}
                  className="flex m-5 shadow-black hover:shadow-xl cursor-pointer rounded-md flex-col justify-center border-2 items-center w-[200px] h-[200px]"
                >
                  <p className="font-bold text-center">{e.Product.name}</p>
                  <img
                    src={e.Product.image}
                    alt={e.Product.name}
                    className="w-24 h-24 object-contain"
                  />
                  <p>${Math.ceil(e.precio)}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {step === 8 && (
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl py-5">Elije tu Monitor</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
              {step8.slice(0, 30)?.map((e, i) => (
                <div
                  onClick={() => monitor(e)}
                  key={i}
                  className="flex m-5 shadow-black hover:shadow-xl cursor-pointer rounded-md flex-col justify-center border-2 items-center w-[200px] h-[200px]"
                >
                  <p className="font-bold text-center">{e.Product.name}</p>
                  <img
                    src={e.Product.image}
                    alt={e.Product.name}
                    className="w-24 h-24 object-contain"
                  />
                  <p>${Math.ceil(e.precio)}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {step === 9 && (
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl py-5">Elije tu Teclado</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
              {step9.slice(0, 30)?.map((e, i) => (
                <div
                  onClick={() => keyboard(e)}
                  key={i}
                  className="flex m-5 shadow-black hover:shadow-xl cursor-pointer rounded-md flex-col justify-center border-2 items-center w-[200px] h-[200px]"
                >
                  <p className="font-bold text-center">{e.Product.name}</p>
                  <img
                    src={e.Product.image}
                    alt={e.Product.name}
                    className="w-24 h-24 object-contain"
                  />
                  <p>${Math.ceil(e.precio)}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {step === 10 && (
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl py-5">Elije tu Mouse</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
              {step10.slice(0, 30)?.map((e, i) => (
                <div
                  onClick={() => keyboard(e)}
                  key={i}
                  className="flex m-5 shadow-black hover:shadow-xl cursor-pointer rounded-md flex-col justify-center border-2 items-center w-[200px] h-[200px]"
                >
                  <p className="font-bold text-center">{e.Product.name}</p>
                  <img
                    src={e.Product.image}
                    alt={e.Product.name}
                    className="w-24 h-24 object-contain"
                  />
                  <p>${Math.ceil(e.precio)}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {step === 11 && (
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl py-5">Estos son los productos elejidos</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
              {array?.map((e, i) => (
                <div
                  key={i}
                  className="flex m-5 shadow-black hover:shadow-xl cursor-pointer rounded-md flex-col justify-center border-2 items-center w-[200px] h-[300px]"
                >
                  <h1 className="font-bold text-center">{e.Product.name}</h1>
                  <img
                    src={e.Product.image}
                    alt={e.Product.name}
                    className="w-24 h-24 object-contain"
                  />
                  <p>Precio ${e.precio}</p>
                  <p>Vendedor {e.Seller.store_name}</p>
                </div>
              ))}
              <div className="flex flex-col items-center justify-center text-center">
                <h1 className="font-bold">Total ${sumTotal}</h1>
                <button
                  className="px-4 py-2 hover:bg-gray-400 duration-300 hover:text-white bg-gray-300 rounded-md"
                  onClick={handleCart}
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default CustomPc;
