import axios from 'axios';
export const GET_POKEMONS = 'GET_POKEMONS';


export const getPokemons = () => {
  return function (dispatch) {
      axios.get('/pokemons')
      .then(response => {
              // console.log(response.data);
              dispatch({
                  type: GET_POKEMONS,
                  payload: response.data,
              });
          })
          .catch(error => {
              console.log(error);
          });
  };
};