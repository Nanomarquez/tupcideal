import axios from 'axios';
import {getAllProducts,getAllProductsByName, getProductsFiltered, getProductDetail,
     OrderProductsDisplayByPrice, emptyProductDetail, emptyProductDisplay} from './Slice';


     // se definen funciones que al ser invocadas despachan las funciones ya traidas desde Slice (reducer)

     export const getAll = () => (dispatch) =>{

        axios("http://localhost:3001/products/")
        .then(res => dispatch(getAllProducts(res.data)))
        .catch(e => console.log(e))}

        // trae todos los productos, sin filtros
   
        export const getAllByName = (search) => (dispatch) =>{

         axios(`http://localhost:3001/products/?search=${search}`)
         .then(res => dispatch(getAllProductsByName(res.data)))
         .catch(e => console.log(e))}
 


     export const getFiltered = (products, search, brand, compatibility) => (dispatch) =>{

         axios(`http://localhost:3001/products/${products}?search=${search}?brand=${brand}?compatibility${compatibility}`)
         .then(res => dispatch(getProductsFiltered(res.data)))
         .catch(e => console.log(e))}

         //trae de forma dinamica, segun componente (endpoint), por query busqueda por name, 
         //o filtrado por brand o compatibility

     export const getDetail = (id) => (dispatch) =>{

        axios(`http://localhost:3001/products/:${id}`)
        .then(res => dispatch(getProductDetail(res.data)))
        .catch(e => console.log(e))}

        // busqueda por id por params

