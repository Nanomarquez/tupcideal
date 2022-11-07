import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import{FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import{faGithub, faLinkedin} from "@fortawesome/free-brands-svg-icons"
import {data} from "../assets/aboutUs/Us"



function AboutUs() {

 console.log(data)

    return (
      
        
 <div className="justify-around items-center flex flex-wrap pt-32 pb-28">
    {data && data.map((e, i) => 
    ( <div key={i} className="group relative flex-1-1-2  opacity-60 hover:opacity-100 transition-opacity-translate
    justify-center items-center flex-wrap backdrop-blur w-56 h-96 mt-5 bg-slate-100 m-2 shadow-black-800 rounded-2xl hover:-translate-y-6 duration-500 " >
     <div className="relative flex-flex-row justify-center items-center ">
           <div className="relative overflow-hidden h-56 w-56 border-8 rounded-full mt-2.5  ">
             <img className=" absolute top-0 left-0 w-full h-full object-cover " src={e.image}></img>
             </div>
           <div className=" flex justify-center items-center mt-2 ">
              <h3 className=" text-center font-bold mt-2 group-hover:translate-y-2 font-bold mt-2 duration-500 transition-translate"> {e.name} <br/><span className="font-bold mt-2 ">{e.stack}</span></h3>  
           </div>
           
     </div>
     
     <ul className="flex flex-row justify-around mt-4">
       <li >
       <a  href={e.linkedin}  ><FontAwesomeIcon className="h-10 w-10   group-hover:translate-y-6 duration-500 transition-translate" icon={faLinkedin} ></FontAwesomeIcon></a>
       </li>
       <li>
       <a href={e.github} className="Github"><FontAwesomeIcon className=" h-10 w-10  group-hover:translate-y-6 duration-500 transition-translate" icon={faGithub} ></FontAwesomeIcon></a>
       </li>
     </ul>
   </div>
  ))}
   
 </div>





    )
}










export default AboutUs