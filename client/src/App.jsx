import { Route,Routes } from "react-router-dom";
import NavBar from './components/NavBar'
import Home from './pages/Home'

function App() {

  return (
    <>
      <NavBar/>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
      </Routes>
    </>
  );
}

export default App;
