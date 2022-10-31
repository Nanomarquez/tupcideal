import {
  GET_POKEMONS
} from './actions'

const initialState = {
  pokemons : [1,2,3,4,5]
}

function rootReducer (state = initialState, {payload,type}){
  switch (type) {
    case GET_POKEMONS:
      return {
        ...state,
        pokemons: payload
      }
    default:
      return state
  }
}

export default rootReducer