import React, { useState, useEffect } from 'react'
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {pcs} from '../assets/pcArmada/pcArmada'
import axios from 'axios';
import { addProductToShoppingCart } from "../redux/actions";


function PcArmada() {
    
    
    let {gama} = useParams();
    const currentTop = pcs[gama].top
    const currentLow = pcs[gama].baja
    
    let dispatch = useDispatch();
    const  [low, setLow] = useState([])
    const  [memory, setMemory] = useState({});
    const  [cpu, setCpu] = useState({});
    const  [mother, setMother] = useState({});
    const  [disk, setDisk] = useState({});
    const  [videocard, setVideocard] = useState({});
    const  [power, setPower] = useState({});
    const  [gabinete, setGabinete] = useState({});
    const  [monitor, setMonitor] = useState({});
    const  [keyboard, setKeyboard] = useState({});
    const  [mouse, setMouse] = useState({});
    
    const  [memoryTop, setMemoryTop] = useState({});
    const  [cpuTop, setCpuTop] = useState({});
    const  [motherTop, setMotherTop] = useState({});
    const  [diskTop, setDiskTop] = useState({});
    const  [videocardTop, setVideocardTop] = useState({});
    const  [powerTop, setPowerTop] = useState({});
    const  [gabineteTop, setGabineteTop] = useState({});
    const  [monitorTop, setMonitorTop] = useState({});
    const  [keyboardTop, setKeyboardTop] = useState({});
    const  [mouseTop, setMouseTop] = useState({});
    
      
    async function getData () {
        await axios.get(`/warehouse?category=Memory`).then((res) => setMemory(res.data.filter(p =>
           currentLow.mem === p.Product.id).sort((b, a) => b.precio - a.precio)[0]));
     
        await axios.get(`/warehouse?category=InternalHardDrive`).then((res) => setDisk(res.data.filter(p =>
         currentLow.dis  === p.Product.id).sort((b, a) => b.precio - a.precio)[0]));
    
        await  axios.get(`/warehouse?category=VideoCard`).then((res) => setVideocard(res.data.filter(p =>
         currentLow.vid === p.Product.id).sort((b, a) => b.precio - a.precio)[0]));
    
         await  axios.get(`/warehouse?category=Motherboard`).then((res) => setMother(res.data.filter(p =>
             currentLow.mot === p.Product.id).sort((b, a) => b.precio - a.precio)[0]));
     
         await  axios.get(`/warehouse?category=PowerSupply`).then((res) => setPower(res.data.filter(p =>
             currentLow.pow === p.Product.id).sort((b, a) => b.precio - a.precio)[0])); 
    
         await  axios.get(`/warehouse?category=Case`).then((res) => setGabinete(res.data.filter(p =>
             currentLow.gab === p.Product.id).sort((b, a) => b.precio - a.precio)[0]));
    
         await  axios.get(`/warehouse?category=CPU`).then((res) => setCpu(res.data.filter(p =>
             currentLow.cpu === p.Product.id).sort((b, a) => b.precio - a.precio)[0]));  
         
         await  axios.get(`/warehouse?category=Mouse`).then((res) => setMouse(res.data.filter(p =>
             currentLow.mou === p.Product.id).sort((b, a) => b.precio - a.precio)[0]));
    
         await axios.get(`/warehouse?category=Keyboard`).then((res) => setKeyboard(res.data.filter(p =>
             currentLow.key === p.Product.id).sort((b, a) => b.precio - a.precio)[0])); 
    
         await  axios.get(`/warehouse?category=Monitor`).then((res) => setMonitor(res.data.filter(p =>
             currentLow.mon === p.Product.id).sort((b, a) => b.precio - a.precio)[0]));
    }
    
    

    async function getDataTop () {
        await axios.get(`/warehouse?category=Memory`).then((res) => setMemoryTop(res.data.filter(p =>
            currentTop.mem === p.Product.id).sort((b, a) => b.precio - a.precio)[0]));
     
        await axios.get(`/warehouse?category=InternalHardDrive`).then((res) => setDiskTop(res.data.filter(p =>
            currentTop.dis  === p.Product.id).sort((b, a) => b.precio - a.precio)[0]));
    
        await  axios.get(`/warehouse?category=VideoCard`).then((res) => setVideocardTop(res.data.filter(p =>
            currentTop.vid === p.Product.id).sort((b, a) => b.precio - a.precio)[0]));

         await  axios.get(`/warehouse?category=Motherboard`).then((res) => setMotherTop(res.data.filter(p =>
            currentTop.mot === p.Product.id).sort((b, a) => b.precio - a.precio)[0]));
     
         await  axios.get(`/warehouse?category=PowerSupply`).then((res) => setPowerTop(res.data.filter(p =>
            currentTop.pow === p.Product.id).sort((b, a) => b.precio - a.precio)[0])); 
 
         await  axios.get(`/warehouse?category=Case`).then((res) => setGabineteTop(res.data.filter(p =>
            currentTop.gab === p.Product.id).sort((b, a) => b.precio - a.precio)[0]));

         await  axios.get(`/warehouse?category=CPU`).then((res) => setCpuTop(res.data.filter(p =>
            currentTop.cpu === p.Product.id).sort((b, a) => b.precio - a.precio)[0]));  
         
         await  axios.get(`/warehouse?category=Mouse`).then((res) => setMouseTop(res.data.filter(p =>
            currentTop.mou === p.Product.id).sort((b, a) => b.precio - a.precio)[0]));

         await axios.get(`/warehouse?category=Keyboard`).then((res) => setKeyboardTop(res.data.filter(p =>
            currentTop.key === p.Product.id).sort((b, a) => b.precio - a.precio)[0])); 
   
         await  axios.get(`/warehouse?category=Monitor`).then((res) => setMonitorTop(res.data.filter(p =>
            currentTop.mon === p.Product.id).sort((b, a) => b.precio - a.precio)[0]));
 }
    
    
     useEffect(() => {
          getData();
          getDataTop();
    },[])
    

let arrayLow = [];
if(gama !== "Home"){
arrayLow.push(memory, disk, mother, cpu, gabinete, power, videocard )}
else{arrayLow.push(memory, disk, mother, cpu, gabinete, power)}
console.log(arrayLow);
let sumaLow = 0;
arrayLow.map(p => sumaLow = sumaLow + p.precio )
console.log(sumaLow)

let arrayTop = [];
if (gama !== "Home"){
arrayTop.push(memoryTop, diskTop, motherTop, cpuTop, gabineteTop, powerTop, videocardTop )}
else{arrayTop.push(memoryTop, diskTop, motherTop, cpuTop, gabineteTop, powerTop)}
console.log(arrayTop);
let sumaTop = 0;
arrayTop.map(p => sumaTop = sumaTop + p.precio )
console.log(sumaTop)

 //console.log(low);
   
 const handleCartLow = () => {
    arrayLow.map((e) => {
      dispatch(addProductToShoppingCart(e));
    });
  };
  const handleCartTop = () => {
    arrayTop.map((e) => {
      dispatch(addProductToShoppingCart(e));
    });
  };

    return (
   
   <div className='flex justify-around'>

    <section>
    <img
                src="https://www.venex.com.ar/images/configurador_pc/ram.png"
                alt="icono"
                className="object-contain w-20"
              />
   {gama !== "Home" && <img
                src="https://www.venex.com.ar/images/configurador_pc/gpu.png"
                alt="icono"
                className="object-contain w-20"
              />}
   <img
                src="https://www.venex.com.ar/images/configurador_pc/ssd.png"
                alt="icono"
                className="object-contain w-20"
              />  
    <img
                src="https://www.venex.com.ar/images/configurador_pc/micro.png"
                alt="icono"
                className="object-contain w-20"
              />
    <img
                src="https://www.venex.com.ar/images/configurador_pc/fuente.png"
                alt="icono"
                className="object-contain w-20"
              />      

      <img
                src="https://www.venex.com.ar/images/configurador_pc/motherboard.png"
                alt="icono"
                className="object-contain w-20"
              />    
       <img
                src="https://www.venex.com.ar/images/configurador_pc/gabinete.png"
                alt="icono"
                className="object-contain w-20"
              />                    


    </section>
    
    <section>
    <h1> {gama} - Basica</h1>  
    {memory.precio && <div
              
              className="flex m-5 shadow-black   rounded-md flex-col justify-center border-2 items-center w-[200px] h-[200px]"
                >
                  <p className="font-bold text-center">{memory.Product.name}</p>
                  <img
                    src={memory.Product.image}
                    alt={memory.Product.name}
                    className="w-24 h-24 object-contain"
                  />
                  <p>${Math.ceil(memory.precio)}</p>
                  <br/>
                 <p className="font-bold text-center">{memory.Seller.store_name}</p>
                </div>
                }
     {gama !== "Home" && videocard.precio  && <div
                  
        className="flex m-5 shadow-black   rounded-md flex-col justify-center border-2 items-center w-[200px] h-[200px]"
                    >
               <p className="font-bold text-center">{videocard.Product.name}</p>
                <img
                  src={videocard.Product.image}
                  alt={videocard.Product.name}
                  className="w-24 h-24 object-contain"
                 />
                <p>${Math.ceil(videocard.precio)}</p>
                <br/>
                <p className="font-bold text-center">{videocard.Seller.store_name}</p>
                </div>
                   }    

    {disk.precio  && <div
                  
                  className="flex m-5 shadow-black   rounded-md flex-col justify-center border-2 items-center w-[200px] h-[200px]"
                              >
                         <p className="font-bold text-center">{disk.Product.name}</p>
                          <img
                            src={disk.Product.image}
                            alt={disk.Product.name}
                            className="w-24 h-24 object-contain"
                           />
                          <p>${Math.ceil(disk.precio)}</p>
                          <br/>
                          <p className="font-bold text-center">{disk.Seller.store_name}</p>
                          </div>
                             }  
   {cpu.precio  && <div
                  
                  className="flex m-5 shadow-black   rounded-md flex-col justify-center border-2 items-center w-[200px] h-[200px]"
                              >
                         <p className="font-bold text-center">{cpu.Product.name}</p>
                          <img
                            src={cpu.Product.image}
                            alt={cpu.Product.name}
                            className="w-24 h-24 object-contain"
                           />
                          <p>${Math.ceil(cpu.precio)}</p>
                          <br/>
                          <p className="font-bold text-center">{cpu.Seller.store_name}</p>
                          </div>
                             }  
    {power.precio  && <div
                  
                  className="flex m-5 shadow-black   rounded-md flex-col justify-center border-2 items-center w-[200px] h-[200px]"
                              >
                         <p className="font-bold text-center">{power.Product.name}</p>
                          <img
                            src={power.Product.image}
                            alt={power.Product.name}
                            className="w-24 h-24 object-contain"
                           />
                          <p>${Math.ceil(power.precio)}</p>
                          <br/>
                          <p className="font-bold text-center">{power.Seller.store_name}</p>
                          </div>
                             }  
      {mother.precio  && <div
                  
                  className="flex m-5 shadow-black   rounded-md flex-col justify-center border-2 items-center w-[200px] h-[200px]"
                              >
                         <p className="font-bold text-center">{mother.Product.name}</p>
                          <img
                            src={mother.Product.image}
                            alt={mother.Product.name}
                            className="w-24 h-24 object-contain"
                           />
                          <p>${Math.ceil(mother.precio)}</p>
                          <br/>
                          <p className="font-bold text-center">{mother.Seller.store_name}</p>
                          </div>
                             } 
       {gabinete.precio  && <div
                  
                  className="flex m-5 shadow-black   rounded-md flex-col justify-center border-2 items-center w-[200px] h-[200px]"
                              >
                         <p className="font-bold text-center">{gabinete.Product.name}</p>
                          <img
                            src={gabinete.Product.image}
                            alt={gabinete.Product.name}
                            className="w-24 h-24 object-contain"
                           />
                          <p>${Math.ceil(gabinete.precio)}</p>
                          <br/>
                          <p className="font-bold text-center">{gabinete.Seller.store_name}</p>
                          </div>
                             }                        
                             <h3>Total : {sumaLow}</h3>    
                             <button
                  className="px-4 py-2 hover:bg-gray-400 duration-300 hover:text-white bg-gray-300 rounded-md"
                  onClick={handleCartLow}
                >
                  Agregar al carrito
                </button>                                         
     </section>
     <section>
    <h1> {gama} - Top</h1>  
    {memoryTop.precio && <div
              
              className="flex m-5 shadow-black   rounded-md flex-col justify-center border-2 items-center w-[200px] h-[200px]"
                >
                  <p className="font-bold text-center">{memoryTop.Product.name}</p>
                  <img
                    src={memoryTop.Product.image}
                    alt={memoryTop.Product.name}
                    className="w-24 h-24 object-contain"
                  />
                  <p>${Math.ceil(memoryTop.precio)}</p>
                  <br/>
                 <p className="font-bold text-center">{memoryTop.Seller.store_name}</p>
                </div>
                }
     {gama !== "Home" && videocardTop.precio  && <div
                  
        className="flex m-5 shadow-black   rounded-md flex-col justify-center border-2 items-center w-[200px] h-[200px]"
                    >
               <p className="font-bold text-center">{videocardTop.Product.name}</p>
                <img
                  src={videocardTop.Product.image}
                  alt={videocardTop.Product.name}
                  className="w-24 h-24 object-contain"
                 />
                <p>${Math.ceil(videocardTop.precio)}</p>
                <br/>
                <p className="font-bold text-center">{videocardTop.Seller.store_name}</p>
                </div>
                   }    

    {diskTop.precio  && <div
                  
                  className="flex m-5 shadow-black   rounded-md flex-col justify-center border-2 items-center w-[200px] h-[200px]"
                              >
                         <p className="font-bold text-center">{diskTop.Product.name}</p>
                          <img
                            src={diskTop.Product.image}
                            alt={diskTop.Product.name}
                            className="w-24 h-24 object-contain"
                           />
                          <p>${Math.ceil(diskTop.precio)}</p>
                          <br/>
                          <p className="font-bold text-center">{diskTop.Seller.store_name}</p>
                          </div>
                             }  
   {cpuTop.precio  && <div
                  
                  className="flex m-5 shadow-black   rounded-md flex-col justify-center border-2 items-center w-[200px] h-[200px]"
                              >
                         <p className="font-bold text-center">{cpuTop.Product.name}</p>
                          <img
                            src={cpuTop.Product.image}
                            alt={cpuTop.Product.name}
                            className="w-24 h-24 object-contain"
                           />
                          <p>${Math.ceil(cpuTop.precio)}</p>
                          <br/>
                          <p className="font-bold text-center">{cpuTop.Seller.store_name}</p>
                          </div>
                             }  
    {powerTop.precio  && <div
                  
                  className="flex m-5 shadow-black   rounded-md flex-col justify-center border-2 items-center w-[200px] h-[200px]"
                              >
                         <p className="font-bold text-center">{powerTop.Product.name}</p>
                          <img
                            src={powerTop.Product.image}
                            alt={powerTop.Product.name}
                            className="w-24 h-24 object-contain"
                           />
                          <p>${Math.ceil(powerTop.precio)}</p>
                          <br/>
                          <p className="font-bold text-center">{powerTop.Seller.store_name}</p>
                          </div>
                             }  
      {motherTop.precio  && <div
                  
                  className="flex m-5 shadow-black   rounded-md flex-col justify-center border-2 items-center w-[200px] h-[200px]"
                              >
                         <p className="font-bold text-center">{motherTop.Product.name}</p>
                          <img
                            src={motherTop.Product.image}
                            alt={motherTop.Product.name}
                            className="w-24 h-24 object-contain"
                           />
                          <p>${Math.ceil(motherTop.precio)}</p>
                          <br/>
                          <p className="font-bold text-center">{motherTop.Seller.store_name}</p>
                          </div>
                             } 
        {gabineteTop.precio  && <div
                  
                  className="flex m-5 shadow-black   rounded-md flex-col justify-center border-2 items-center w-[200px] h-[200px]"
                              >
                         <p className="font-bold text-center">{gabineteTop.Product.name}</p>
                          <img
                            src={gabineteTop.Product.image}
                            alt={gabineteTop.Product.name}
                            className="w-24 h-24 object-contain"
                           />
                          <p>${Math.ceil(gabineteTop.precio)}</p>
                          <br/>
                          <p className="font-bold text-center">{gabineteTop.Seller.store_name}</p>
                          </div>
                             }      
                    <h3>Total : {sumaTop}</h3> 
                    <button
                  className="px-4 py-2 hover:bg-gray-400 duration-300 hover:text-white bg-gray-300 rounded-md"
                  onClick={handleCartTop}
                >
                  Agregar al carrito
                </button>                                                      
     </section>
   
   </div>
  )
}

export default PcArmada





/**/
   