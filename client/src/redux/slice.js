import { createSlice } from "@reduxjs/toolkit";

export const characterSlice = createSlice({
 name: "characters",
 initialState:{
       characters:[],
       details:{}
  },
 reducers: {
 getAllCharacters:(state, action) => {
    state.characters = action.payload
  },
    getById:(state, action) => {
     state.details = action.payload
 }
 }

});

export const {getAllCharacters, getById} = characterSlice.actions

export default characterSlice.reducer
