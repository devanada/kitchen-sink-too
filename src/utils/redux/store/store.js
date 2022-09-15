import { configureStore } from "@reduxjs/toolkit";
import reducer from "../reducers/reducer";

export const store = configureStore({
  reducer: {
    data: reducer.state,
  },
});

/*
Fungsi createStore adalah sebuah function yang menerima 1 parameter, yaitu reducer.
Store ini digunakan untuk membuat sebuah wadah yang bakal dipakai untuk setiap komponen.
*/
