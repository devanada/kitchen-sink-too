import { legacy_createStore as createStore } from "redux";
import { reducer } from "../reducers/reducer";

export const store = createStore(reducer);

/*
Fungsi createStore adalah sebuah function yang menerima 1 parameter, yaitu reducer.
Store ini digunakan untuk membuat sebuah wadah yang bakal dipakai untuk setiap komponen.
*/
