import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
};

const sliceState = createSlice({
  name: "state",
  initialState: initialState,
  reducers: {
    handleAuth: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
});

const reducer = {
  state: sliceState.reducer,
};

export const { handleAuth } = sliceState.actions;
export default reducer;

/*
Fungsi reducer adalah sebuah function yang menerima 2 parameter, yaitu state dan action.
Fungsi ini tugasnya yaitu untuk merubah initial state menjadi state yang baru.
*/
