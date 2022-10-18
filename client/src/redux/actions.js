import axios from 'axios';

import {getAllProducts,getAllProductsById, getProductsFiltered, getProductDetail,
     OrderProductsDisplayByPrice, emptyProductDetail, emptyProductDisplay, getComponentByCategory, getCategory,getBrand} from './slice';


     // se definen funciones que al ser invocadas despachan las funciones ya traidas desde Slice (reducer)


     

     export const getComponent = (component) => (dispatch) => {
      axios(`http://localhost:3001/components/${component}`)
      .then(res => dispatch(getComponentByCategory(res.data)))
      .catch(e => console.log(e))
     }

     export const newUser = (user) => (dispatch) => {
      axios.post('http://localhost:3001/user',user)
      .then(res=>dispatch(sliceNewUser(res.data)))
      .catch(e => console.log(e))
     }

     export const getAll = () => (dispatch) =>{

        axios("http://localhost:3001/products/")
        .then(res => dispatch(getAllProducts(res.data)))
        .catch(e => console.log(e))}

        // trae todos los productos, sin filtros
   
        export const getAllById = (id) => (dispatch) =>{

         axios(`http://localhost:3001/products/${id}`)
         .then(res => dispatch(getAllProductsById(res.data)))
         .catch(e => console.log(e))}
 


     export const getFiltered = ( brand, category) => (dispatch) =>{

         axios(`http://localhost:3001/products?brand=${brand}&category=${category}`)
         .then(res =>   dispatch(getProductsFiltered(res.data)))
         .catch(e => console.log(e))}

         //trae de forma dinamica, segun componente (endpoint), por query busqueda por name, 
         //o filtrado por brand o compatibility

     export const getDetail = (id) => (dispatch) =>{

        axios(`http://localhost:3001/products/:${id}`)
        .then(res => dispatch(getProductDetail(res.data)))
        .catch(e => console.log(e))}

        // busqueda por id por params

    // export const getFilterByCategory = (category) => (dispatch) => {
    //     axios(`http://localhost:3001/products?category=${category}`)
    //     .then(res => dispatch(getCategory(res.data)))
    //     .catch(e => console.log(e))
    // }

    // export const getFilterByBrand = (brand) => (dispatch) => {
    //     axios(`http://localhost:3001/products?brand=${brand}`)
    //     .then(res => dispatch(getBrand(res.data)))
    //     .catch(e => console.log(e))
    // }