import { Route,Routes } from "react-router-dom";
import NavBar from './components/NavBar/NavBar'
import Home from './pages/Home'
import Login from "./components/login/Login"

function App() {

  return (
    <>
      <NavBar/>
      <Routes>
        <Route exact path='/' element={<Home/>} />
      </Routes>
    </>
  );
}

export default App;
