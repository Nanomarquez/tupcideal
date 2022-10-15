import { configureStore } from "@reduxjs/toolkit";

import productsReducer from "./slice";

export default configureStore({
  reducer: {
    products: productsReducer,
  },
});
