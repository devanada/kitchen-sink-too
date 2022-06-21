const initialState = {
  token: null,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_TOKEN":
      return {
        ...state,
        token: action.payload,
      };
    default:
      return state;
  }
};

/*
Fungsi reducer adalah sebuah function yang menerima 2 parameter, yaitu state dan action.
Fungsi ini tugasnya yaitu untuk merubah initial state menjadi state yang baru.
*/
