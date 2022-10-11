import axios from 'axios';
import {getAllCharacters, getById}  from './Slice';

export const getChars = () => (dispatch) =>{

axios("https://rickandmortyapi.com/api/character")
.then(res => dispatch(getAllCharacters(res.data.results)))
.catch(e => console.log(e))}