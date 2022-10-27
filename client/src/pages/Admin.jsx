import React, { useEffect, useState } from "react";
import axios from "axios";
function Admin() {
  const [users, setUsers] = useState([]);

  function axion() {
    axios.get("/users").then((res) => {
      setUsers(res.data.filter((e) => e.isAdmin !== true));
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

  let handleDesBan = (e) => {
    axios.put(`/users/${e}`, { ban: false });
    axion();
  };

  useEffect(() => {
    axion();
  }, []);
  return (
    <div className="h-screen">
      <section>
        Tabla de usuario
        {users &&
          users.map((e, i) => (
            <div key={i} className="flex gap-10">
              {e.name}{" "}
              <button onClick={() => handleDelete(e.email)}>Eliminar</button>{" "}
              {e.isBanned && (
                <button onClick={() => handleDesBan(e.email)}>Desbanear</button>
              )}
              {!e.isBanned && (
                <button onClick={() => handleBan(e.email)}>Banear</button>
              )}
            </div>
          ))}
      </section>
    </div>
  );
}

export default Admin;
