import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import { Link } from "react-router-dom";
import axios from "axios";
  function Avatar() {
  const { usuario } = useAuth();

  const [currentUser, setCurrentUser] = useState(false);

  const [user, setUser] = useState({});
  const [seller, setSeller] = useState({})

 
  
  
  async function getUser () {
    await axios.get(`/users/${usuario.email}`).then((res) => {
      if(res.data !== "Usuario no encontrado"){
      setCurrentUser(true);
      setSeller({})
      setUser(res.data)}
    
      else{
       axios.get(`/sellers/${usuario.email}`).then((res) => {
      if(!res.data.error){
      setCurrentUser(true);
      setUser({})
      setSeller(res.data)}
   })}})}


  useEffect(  () => {
    if (usuario !== null) {
     getUser();}
      else{
      setCurrentUser(false);
     }
  },[usuario])
    

  return (
   <div className="flex gap-5">
      
   {  seller.isSeller && currentUser &&
   <Link to="/seller">
      <button className="btn-neon bg-white items-center sm:rounded hover:shadow-neon px-1 h-10 sm:w-full w-14 font-semibold flex relative rounded-3xl text-xs sm:text-base overflow-hidden duration-300 delay-1000 border-white">
       
      <span>Vendedor</span>
      
      </button>
    </Link>}
    { !user.isSuperAdmin && !user.isAdmin && !seller.isSeller && currentUser &&
    <Link to="/user">
      <button className="btn-neon bg-white items-center sm:rounded hover:shadow-neon px-1 h-10 sm:w-full w-14 font-semibold flex relative rounded-3xl text-xs sm:text-base overflow-hidden duration-300 delay-1000 border-white">
       
      <span>Ver Perfil</span>
      
      </button>
    </Link>}
   
    {  user.isAdmin && currentUser &&
    <Link to="/admin">
      <button className="btn-neon bg-white items-center sm:rounded hover:shadow-neon px-1 h-10 sm:w-full w-14 font-semibold flex relative rounded-3xl text-xs sm:text-base overflow-hidden duration-300 delay-1000 border-white">
       
      <span>Admin</span>
      
      </button>
    </Link>}

    {  user.isSuperAdmin && currentUser &&
    <Link to="/superadmin">
      <button className="btn-neon bg-white items-center sm:rounded hover:shadow-neon px-1 h-10 sm:w-full w-14 font-semibold flex relative rounded-3xl text-xs sm:text-base overflow-hidden duration-300 delay-1000 border-white">
       
      <span>Superadmin</span>
      
      </button>
    </Link>}
   
   
   
    </div> 
  );
}

export default Avatar;


/*if (usuario !== null) {
  axios.get(`/sellers/${usuario.email}`).then((res) => {
    if(res.status === 404){
      axios.get(`/users/${usuario.email}`).then((res) => {
        if (!res.data.error) {
          setCurrentUser(true);
          setUser(res.data) 
        }
        else{ setUser({})  
        setCurrentUser(false)
        }
      })
    }
      else if (!res.data.error){
      setUser(res.data)  
      setCurrentUser(true);
    }
    else { setUser({})  
    setCurrentUser(false);}
  }); 
 ;
} else{
  setUser({})  
    setCurrentUser(false)
}


}, [usuario]);*/