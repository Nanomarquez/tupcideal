import React from 'react'
import {useAuth} from '../../context/authContext';
import {Link} from 'react-router-dom'
function Avatar() {

  const {usuario} = useAuth()

  const validacion = () => {
    if(!usuario.displayName || !usuario.username || !usuario.phoneNumber ) {return false}
  }
  
  return (
    <Link to='/user'>
    <button>
      {validacion ? <span>Completa tus datos</span> : <span>Ver Perfil</span> }
    </button>
    </Link>
  )
}

export default Avatar