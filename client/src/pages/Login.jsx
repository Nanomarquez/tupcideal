import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import swal from "sweetalert";

function Login() {
  const { logIn, loginWithGoogle, usuario } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(user.email, user.password);
      navigate("/");
      swal("Ok!", `Bienvenido ${user.email}`, "success");
    } catch (error) {
      if (error.code === "auth/internal-error") setError("Campos vacios");
      if (error.code === "auth/invalid-email")
        setError("Campo email vacio o invalido");
      if (error.code === "auth/wrong-password") setError("Contraseña invalida");
      if (error.code === "auth/user-not-found") setError("Usuario inexistente");
      if (error.code === "auth/too-many-requests")
        setError("Usuario desactivado momentaneamente por su seguridad");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>{usuario && <Navigate to='/'/>}
      <section className="h-screen">
        <div className="absolute h-[500px] w-[500px] sm:h-[700px] sm:w-[700px] bg-gradient-to-tr from-purple-400  to-blue-500 rounded-full blur-md -z-10 -translate-y-48 -translate-x-48"></div>
        <div className="px-6 h-full text-gray-800">
          <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
            <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
              <img
                src="https://app.enterprisedna.co/build/site/assets/login-banner-image.e4b90115.png"
                className="w-full"
                alt="Sample image"
              />
            </div>
            <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
              <form onSubmit={handleSubmit}>
                <div className="flex flex-row items-center justify-center lg:justify-start">
                  <p className="text-lg mb-0 mr-1 flex">Sign in with</p>
                  <button
                    onClick={handleGoogleSignIn}
                    type="button"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="w-6 h-6 mx-2"
                    >
                      <path
                        fill="#FBBC05"
                        d="M113.47 309.408 95.648 375.94l-65.139 1.378C11.042 341.211 0 299.9 0 256c0-42.451 10.324-82.483 28.624-117.732h.014L86.63 148.9l25.404 57.644c-5.317 15.501-8.215 32.141-8.215 49.456.002 18.792 3.406 36.797 9.651 53.408z"
                      />
                      <path
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#EA4335"
                        d="M507.527 208.176C510.467 223.662 512 239.655 512 256c0 18.328-1.927 36.206-5.598 53.451-12.462 58.683-45.025 109.925-90.134 146.187l-.014-.014-73.044-3.727-10.338-64.535c29.932-17.554 53.324-45.025 65.646-77.911h-136.89V208.176h245.899z"
                      />
                      <path
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#34A853"
                        d="m416.253 455.624.014.014C372.396 490.901 316.666 512 256 512c-97.491 0-182.252-54.491-225.491-134.681l82.961-67.91c21.619 57.698 77.278 98.771 142.53 98.771 28.047 0 54.323-7.582 76.87-20.818l83.383 68.262z"
                      />
                      <path
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#4285F4"
                        d="m419.404 58.936-82.933 67.896C313.136 112.246 285.552 103.82 256 103.82c-66.729 0-123.429 42.957-143.965 102.724l-83.397-68.276h-.014C71.23 56.123 157.06 0 256 0c62.115 0 119.068 22.126 163.404 58.936z"
                      />
                    </svg>
                  </button>
                </div>

                <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                  <p className="text-center font-semibold mx-4 mb-0">Or</p>
                </div>
                {error && (
                  <p className="bg-red-300 rounded-lg text-center mx-auto mb-7 w-max m-2 p-2">
                    {error}
                  </p>
                )}
                <div className="mb-6">
                  <input
                    onChange={handleChange}
                    type="text"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="email"
                    name="email"
                    placeholder="Email address"
                  />
                </div>

                <div className="mb-6">
                  <input
                    onChange={handleChange}
                    type="password"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="password"
                    name="password"
                    placeholder="Password"
                  />
                </div>

                <div className="text-center lg:text-left">
                  <button
                    type="submit"
                    className="inline-block px-7 py-3 bg-gray-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Login
                  </button>
                  <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                    Don't have an account?{" "}
                    <Link to="/register">
                      <button className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out">
                        Register
                      </button>
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
