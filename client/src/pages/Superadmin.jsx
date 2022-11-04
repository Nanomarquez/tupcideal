import React, { useEffect, useState } from "react";
import axios from "axios";


function Superadmin() {


  const [users, setUsers] = useState([]);



  function axion() {
    axios.get("/users").then((res) => {
        res.data.sort(function (a, b) {
            if (a.name > b.name) {
              return 1;
            }
            if (a.name < b.name) {
              return -1;
            }
            // a must be equal to b
            return 0;
          });
        setUsers(res.data);
    });
  }


  let handleDelete = async (e) => {
    await axios.delete(`/users/${e}`);
    axion();
  };

  let handleBan = async (e) => {
    await axios.put(`/users/${e}`, { ban: true });
    axion();
  };

  let handleDesBan = async (e) => {
    await axios.put(`/users/${e}`, { ban: false });
    axion();
  };

  let handleAdmin = async (e) => {
    await axios.put(`/users/${e}`, { admin: true });
    axion();
  };

  let handleDesAdmin = async (e) => {
    await axios.put(`/users/${e}`, { admin: false });
    axion();
  };

  useEffect(() => {
    axion();
  }, []);
  return (
    <div className=" flex align-items-center">
      <section className="container bg-gray-300 h-auto p-5 mx-auto text-center">
        <h1 className="p-4 text-2xl border-gray-500 border rounded m-5">Tabla de Usuarios / Administradores</h1>
        {users.map((e, i) => (
            <div
              key={i}
              className="border-2 border-gray-400 flex-direction-row gap-10 justify-center items-center rounded space-x-3 mb-3 p-2"
            >
              <p className="text-xl font-medium m-3">{e.name} {e.last_name}: </p>
              <button
                className="border-2 font-medium text-lg border-amber-900 bg-red-600 hover:bg-red-700 rounded p-1 justify-center "
                onClick={() => handleDelete(e.email)}
              >
                Eliminar
              </button>{" "}
              {e.isBanned && (
                <button
                  className="border-2 font-medium text-lg border-green-800 bg-green-500 hover:bg-green-600 rounded p-1 justify-center "
                  onClick={() => handleDesBan(e.email)}
                >
                  Desbanear
                </button>
              )}
              {!e.isBanned && (
                <button
                  className="border-2 font-medium text-lg border-amber-900 bg-red-600 hover:bg-red-700 rounded p-1 justify-center "
                  onClick={() => handleBan(e.email)}
                >
                  Banear
                </button>
              )}
              {e.isAdmin && (
                <button
                  className="border-2 font-medium text-lg border-green-800 bg-green-500 hover:bg-green-600 rounded p-1 justify-center "
                  onClick={() => handleDesAdmin(e.email)}
                >
                  "Si" Admin
                </button>
              )}
              {!e.isAdmin && (
                <button
                  className="border-2 font-medium text-lg border-amber-900 bg-red-600 hover:bg-red-700 rounded p-1 justify-center "
                  onClick={() => handleAdmin(e.email)}
                >
                  "No" Admin
                </button>
              )}
            </div>
          ))}

      </section>
  
    </div>
  );
}

export default Superadmin;