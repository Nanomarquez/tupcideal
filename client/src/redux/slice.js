import { createSlice } from "@reduxjs/toolkit";
export const productsSlice = createSlice({
  name: "products",
  initialState: {
    allProducts: [],
    productsFiltered: [],
    productsFilterById: {},
    details: {},
    component: [],
    filterByPrice: [],
    addProductToCart: [],
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
    orderProductInRangeOfPrice:(state,action) =>{
      state.productsFiltered = action.payload
    },
    OrderProductsDisplayByPrice: (state, action) => {
      //state.productsFiltered = action.payload
      switch (action.payload) {
        case "Ascendente": {
          state.productsFiltered = [...state.productsFiltered].sort(
            (a, b) => a.price_usd - b.price_usd
          );
          break;
        }
        case "Descendente": {
          state.productsFiltered = [...state.productsFiltered].sort(
            (a, b) => b.price - a.price
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
      state.addProductToCart = [...state.addProductToCart, action.payload];
    },
    deleteProductToCart: (state, action) => {
      state.addProductToCart = [...state.addProductToCart.filter(f => f.id !== action.payload)];
    }

    // una diferencia entre redux y redux toolkit
    // es que aca no hay switch, son funciones que se invocan desde las actions
  },
});

export const {
  getAllProducts,
  getAllProductsById,
  getProductsFiltered,
  getProductDetail,
  OrderProductsDisplayByPrice,
  emptyProductDetail,
  emptyProductDisplay,
  getComponentByCategory,
  getCategory,
  getBrand,
  addProductToCart,
  deleteProductToCart,
  orderProductInRangeOfPrice
} = productsSlice.actions;

// se exportan las funciones que invocamos desde las actions

export default productsSlice.reducer;
