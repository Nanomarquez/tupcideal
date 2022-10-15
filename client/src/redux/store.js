import { configureStore } from "@reduxjs/toolkit";

import products from "./Slice";

export default configureStore({
  reducer: {
    products: products,
  },
});
