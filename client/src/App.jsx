import { Route,Routes } from "react-router-dom";
import Footer from "./components/Home/Footer";
import NavBar from './components/NavBar/NavBar'
import ArmaTuPc from "./pages/ArmaTuPc";
import Home from './pages/Home'

function App() {

  return (
    <>
      <NavBar/>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/armatupc' element={<ArmaTuPc/>}/>
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
