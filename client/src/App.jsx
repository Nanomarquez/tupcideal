import {useSelector} from 'react-redux'

function App() {

  const poke = useSelector((state)=>state.pokemons)

  console.log(poke)

  return (
    <div className="App">
      <h1 className="text-3xl font-bold">Hello world!</h1>
    </div>
  );
}

export default App;
