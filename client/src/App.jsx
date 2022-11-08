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
import CompletarForm from "./pages/CompletarForm";
import Admin from './pages/Admin'
import Superadmin from './pages/Superadmin'
import CustomPc from './pages/CustomPc'
import Seller from "./pages/Seller";
import AboutUs from "./pages/AboutUs";
import PcArmada from "./pages/PcArmada";

function App() {

  return (
    <>

      <NavBar/>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/armatupc" element={<ArmaTuPc />} />
        <Route exact path="/Armatupc/:gama" element={< PcArmada />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/productos" element={<Productos />} />
        <Route exact path="/custompc" element={<CustomPc />} />
        <Route exact path="/mp" element={<Mp />} />
        <Route exact path="/completarform" element={<CompletarForm />} />
        <Route exact path="/admin" element={<Admin />} />
        <Route exact path="/superadmin" element={<Superadmin />} />
        <Route exact path="/user" element={<User/>} />
        <Route exact path="/equipo" element={<AboutUs/>} />
        <Route exact path="/seller" element={<Seller/>} />
        <Route exact path="/productos/search/:id" element={<ProductosSearch />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
