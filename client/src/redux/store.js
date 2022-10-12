import { configureStore } from "@reduxjs/toolkit";
import characters from "./Slice";

export default configureStore({
  reducer: {
    characters: characters,
  },
});
