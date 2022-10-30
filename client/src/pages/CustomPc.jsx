import React, { useEffect, useState } from "react";
import axios from "axios";
function CustomPc() {
  const [array , setArray] = useState([])
  const [step, setStep] = useState(0);
  const [step1, setStep1] = useState([]);
  const [step2, setStep2] = useState([]);
  const [step3, setStep3] = useState([]);
  async function getBrand(brand) {
    setStep(step + 1);
    return await axios
      .get(`/warehouse?brand=${brand}&?category=CPU`)
      .then((res) => setStep1(res.data));
  }
  const cpu = (e) => {
    setArray([e])
    setStep(step+1)
    axios.get(`/warehouse?category=Motherboard`).then(res=>setStep2(res.data))
  }
  const mother = (e) => {
    setArray([...array,e])
    setStep(step+1)
    axios.get(`/warehouse?category=Memory`).then(res=>setStep3(res.data))
  }
  const memory = (e) => {
    setArray([...array,e])
    setStep(step+1)
  }

  console.log(array);  

  return (
    <div>
      <div className="text-center text-3xl flex flex-col gap-5 pt-5">
        <h1>Vamos a armar tu pc en 16 pasos</h1>
        <h2>Empecemos!</h2>
        <p>Paso {step} de 16</p>
      </div>
      <section>
        {step === 0 && (
          <div className="text-center text-5xl h-screen">
            <h1 className="py-10">Elije tu marca</h1>
            <div className="py-10 flex items-center justify-center gap-24">
            <button className="bg-gray-300 px-5 py-2 rounded-lg hover:shadow-xl shadow-black" onClick={() => getBrand("Intel")}>Intel</button>
            <button className="bg-gray-300 px-5 py-2 rounded-lg hover:shadow-xl shadow-black" onClick={() => getBrand("AMD")}>AMD</button>
            </div>
          </div>
        )}
        {step === 1 && (
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl py-5">Elije tu procesador</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
              {step1?.map((e,i)=>(
                <div className="flex m-5 shadow-black hover:shadow-xl cursor-pointer rounded-md flex-col justify-center border-2 items-center w-[200px] h-[200px]" key={i}
                onClick={()=>cpu(e)}
                >
                  <p className="font-bold">{e.Product.name}</p>
                  <img src={e.Product.image} className="w-24 h-24 object-contain" alt={e.Product.name} />
                  <p>${e.precio}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl py-5">Elije tu mother</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
              {step2.slice(0,30)?.map((e,i)=>(
                <div
                onClick={()=>mother(e)}
                key={i} className="flex m-5 shadow-black hover:shadow-xl cursor-pointer rounded-md flex-col justify-center border-2 items-center w-[200px] h-[200px]" >
                  <p>{e.Product.name}</p>
                  <img src={e.Product.image} alt={e.Product.name} className="w-24 h-24 object-contain"/>
                  <p>${Math.ceil(e.precio)}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl py-5">Elije tu mother</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
              {step3.slice(0,30)?.map((e,i)=>(
                <div
                onClick={()=>memory(e)}
                key={i} className="flex m-5 shadow-black hover:shadow-xl cursor-pointer rounded-md flex-col justify-center border-2 items-center w-[200px] h-[200px]" >
                  <p>{e.Product.name}</p>
                  <img src={e.Product.image} alt={e.Product.name} className="w-24 h-24 object-contain"/>
                  <p>${Math.ceil(e.precio)}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default CustomPc;
