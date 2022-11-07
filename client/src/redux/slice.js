import { createSlice } from "@reduxjs/toolkit";
export const productsSlice = createSlice({
  name: "products",
  initialState: {
    allProducts: [],
    productsFiltered: [],
    productsFiltered2: [],
    productsFilterById: {},
    details: {},
    component: [],
    filterByPrice: [],
    reviews: [],
    favorites: localStorage.hasOwnProperty("favorites")
    ? JSON.parse(localStorage.getItem("favorites"))
    : [],
    cart: localStorage.hasOwnProperty("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [],
    // la idea es tener siempre todos los productos cargados para los selects o busqueda por name
    // por otra parte tener los productos filtrados para el display y/o sus selects
    // los ordenamientos se harian sobre productsFiltered, tengan todos los productos o los filtrados
  },

  reducers: {
    getAllProducts: (state, action) => {
      state.allProducts = action.payload;
    },

    getAllProductsById: (state, action) => {
      state.productsFilterById = action.payload;
    },

    getProductsFiltered: (state, action) => {
      state.productsFiltered = action.payload;
    },
    getProductsFiltered2: (state, action) => {
      state.productsFiltered2 = action.payload;
    },
    orderProductInRangeOfPrice: (state, action) => {
      state.productsFiltered = action.payload;
    },
    OrderProductsDisplayByPrice: (state, action) => {
      //state.productsFiltered = action.payload
      switch (action.payload) {
        case "Ascendente": {
          state.productsFiltered = [...state.productsFiltered].sort(
            (a, b) => a.precio - b.precio
          );
          break;
        }
        case "Descendente": {
          state.productsFiltered = [...state.productsFiltered].sort(
            (a, b) => b.precio - a.precio
          );
          break;
        }
      }
    },

    getProductDetail: (state, action) => {
      state.details = action.payload;
    },
    emptyProductDetail: (state) => {
      state.details = initialState.state.details;
    },
    emptyProductDisplay: (state) => {
      state.productsFiltered = initialState.state.productsDisplay;
    },
    getComponentByCategory: (state, action) => {
      state.component = action.payload;
    },
    addProductToCart: (state, action) => {
      const {cart} = state
      console.log(cart);
      const finder = cart.find((c)=> {  return c.id === action.payload.id })
      if(finder === undefined){
        state.cart = [...state.cart, action.payload];
      }
      else if(finder.quantity === action.payload.cantidad){
        return 
      }
      else{
        finder.quantity = finder.quantity +1 ;  
      }
      
    },
    deleteProductToCart: (state, action) => {
      const {cart} = state
      const finder = cart[action.payload]
   
      if (finder.quantity === 1){
        finder.quantity = finder.quantity -1
        state.cart = cart.slice(0, action.payload)
        .concat(state.cart.slice(action.payload + 1, state.cart.length));
      
      }
      
      else{
        finder.quantity = finder.quantity -1;
       }




    },
    getReview: (state, action) => {
      state.reviews = [...state.reviews, action.payload];
    },
    addFavorites: (state, action) => {
      state.favorites= [...state.favorites, action.payload];
    },
    deleteFavorites:(state, action) => {
      state.favorites= state.favorites.filter((f) => f.id !== action.payload)
       
      },


    // una diferencia entre redux y redux toolkit
    // es que aca no hay switch, son funciones que se invocan desde las actions
  },
});

export const {
  getAllProducts,
  getAllProductsById,
  getProductsFiltered,
  getProductsFiltered2,
  getProductDetail,
  OrderProductsDisplayByPrice,
  emptyProductDetail,
  emptyProductDisplay,
  getComponentByCategory,
  getCategory,
  getBrand,
  addProductToCart,
  deleteProductToCart,
  orderProductInRangeOfPrice,
  addFavorites,
  deleteFavorites,
  getReview,
} = productsSlice.actions;

// se exportan las funciones que invocamos desde las actions

export default productsSlice.reducer;
/*if (here){
  cart.filter((c)=> {c.id !== action.payload})
}
else{
  here.quantity = here.quantity -1;
}*/