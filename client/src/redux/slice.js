import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
 name: "products",
 initialState:{
       allProducts:[],
       productsFiltered:[],
       details:{}
 // la idea es tener siempre todos los productos cargados para los selects o busqueda por name
  // por otra parte tener los productos filtrados para el display y/o sus selects 
  // los ordenamientos se harian sobre productsFiltered, tengan todos los productos o los filtrados
 
      },
 
  reducers: {
 getAllProducts:(state, action) => {
    state.allProducts = action.payload,
    state.productsFiltered = action.payload
  },

  getProductsFiltered:(state, action) => {
    state.productsFiltered = action.payload
  },
  OrderProductsDisplayByPrice:(state, action) => {
    state.productsFiltered = action.payload
  },
  
  getProductDetail:(state, action) => {
     state.details = action.payload
 },
 emptyProductDetail:(state) => {
  state.details = initialState.state.details
},
emptyProductDisplay:(state) => {
  state.productsFiltered = initialState.state.productsDisplay
}

// una diferencia entre redux y redux toolkit
// es que aca no hay switch, son funciones que se invocan desde las actions

 }

});

export const {getAllProducts,getProductsFiltered, getProductDetail, OrderProductsDisplayByPrice, emptyProductDetail, emptyProductDisplay} = productsSlice.actions
// se exportan las funciones que invocamos desde las actions

export default productsSlice.reducer
