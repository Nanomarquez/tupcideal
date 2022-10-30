import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import { Link } from "react-router-dom";
import axios from "axios";
function Avatar() {
  const { usuario } = useAuth();

  const [currentUser, setCurrentUser] = useState(false);

  const [user, setUser] = useState({});


  useEffect(() => {
   
   
   
   
   
    if (usuario !== null) {
      axios.get(`/sellers/${usuario.email}`).then((res) => {
        if(res.data === `Don´t found matches with the email: ${usuario.email}`){
          axios.get(`/users/${usuario.email}`).then((res) => {
            if (!res.data.error) {
              setCurrentUser(true);
              setUser(res.data) 
            }
          })
        }
          else {
          setUser(res.data)  
          setCurrentUser(true);
        }
      }); 
     ;
    }
  }, [usuario]);

  return (
   <>
   {  user.isSeller &&   
   <Link to="/seller">
      <button className="btn-neon bg-white items-center sm:rounded hover:shadow-neon px-1 h-10 sm:w-full w-14 font-semibold flex relative rounded-3xl text-xs sm:text-base overflow-hidden duration-300 delay-1000 border-white">
       
      <span>Vendedor</span>
      
      </button>
    </Link>}
    {  !user.isSeller &&
    <Link to="/user">
      <button className="btn-neon bg-white items-center sm:rounded hover:shadow-neon px-1 h-10 sm:w-full w-14 font-semibold flex relative rounded-3xl text-xs sm:text-base overflow-hidden duration-300 delay-1000 border-white">
       
      <span>Ver Perfil</span>
      
      </button>
    </Link>}
   
   
   
   
    </> 
  );
}

export default Avatar;
