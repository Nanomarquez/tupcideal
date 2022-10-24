import { Route, Routes } from "react-router-dom";
import Footer from "./components/Home/Footer";
import NavBar from "./components/NavBar/NavBar";
import ArmaTuPc from "./pages/ArmaTuPc";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Productos from "./pages/Productos";
import Register from "./pages/Register";
import Mp from "./pages/Mp";
import ProductosSearch from './pages/ProductosSearch'
import User from "./pages/User";
import Favorites from "./components/NavBar/Favorites";
function App() {

  return (
    <>

      <NavBar/>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/armatupc" element={<ArmaTuPc />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/productos" element={<Productos />} />
        <Route exact path="/mp" element={<Mp />} />
        <Route exact path="/user" element={<User/>} />
        <Route exact path="/productos/search/:id_table&:categories" element={<ProductosSearch />} />
        <Route exact path="/favorites" element={<Favorites />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
