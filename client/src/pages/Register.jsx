import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useAuth} from '../context/authContext'
import swal from 'sweetalert';

function Register() {
  const {signUp} = useAuth()
  const navigate = useNavigate();
  const [error,setError] = useState()
  const [user,setUser] = useState({
    email: "",
    password: "",
  })

  const handleChange = ({target: {name, value}}) => {
    setUser({...user,[name]:value})
  }

  const handleSubmit = async e => {
    e.preventDefault();
    setError("")
    try {
      await signUp(user.email,user.password);
      navigate('/login')
      swal("Ok!", "Usuario creado exitosamente", "success");
    } catch (error) {
      if(error.code === "auth/missing-email") setError('Especifique un correo')
      if(error.code === "auth/weak-password") setError('La contraseña debe tener mas de 6 caracteres')
      if(error.code === "auth/invalid-email") setError('Ingrese un correo valido')
      if(error.code === "auth/email-already-in-use") setError('Usuario ya existente')
      if(error.code === "auth/internal-error") setError('Contraseña invalida')
    }
  }



  return (
    <section className="h-screen">
  <div className="px-6 h-full text-gray-800">
    <div
      className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6"
    >
      <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
        <form onSubmit={handleSubmit}>
          {error && <p className='bg-red-300 rounded-lg text-center mx-auto mb-7 w-max m-2 p-2'>{error}</p>}
          <div className="mb-6">
            <input
              onChange={handleChange}
              type="text"
              className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              name='email'
              id="email"
              placeholder="Email address"
            />
          </div>

          <div className="mb-6">
            <input
              onChange={handleChange}
              type="password"
              className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              name='password'
              id="password"
              placeholder="Password"
            />
          </div>

          <div className="text-center lg:text-left">
            <button
              type="submit"
              className="inline-block px-7 py-3 bg-gray-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              >
              Register
            </button>

            <p className="text-sm font-semibold mt-2 pt-1 mb-0">
              Do you have an account?{" "}
              <Link to='/login'>
              <button
                className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                >Login</button
              >
              </Link>
            </p>
          </div>
        </form>
      </div>
      <div
        className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0"
      >
        <img
          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          className="w-full"
          alt="Sample image"
        />
      </div>
    </div>
    
  </div>
</section>
  )
}

export default Register