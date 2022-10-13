import { Route,Routes } from "react-router-dom";
import Footer from "./components/Home/Footer";
import NavBar from './components/NavBar/NavBar'
import ArmaTuPc from "./pages/ArmaTuPc";
import Home from './pages/Home'
import Login from './pages/Login'
import Register from "./pages/Register";

function App() {

  return (
    <>
      <NavBar/>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/armatupc' element={<ArmaTuPc/>}/>
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/register' element={<Register/>}/>
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
