import {
  persistStore,
  persistReducer,
  FLUSH,
  PAUSE,
  PURGE,
  PERSIST,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

import reducer from "utils/redux/reducers/reducer";

const persistConfig = {
  key: "root",
  storage,
};

const reducers = combineReducers({ data: reducer.state });
const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

let persistor = persistStore(store);

export { store, persistor };

/*
Fungsi createStore adalah sebuah function yang menerima 1 parameter, yaitu reducer.
Store ini digunakan untuk membuat sebuah wadah yang bakal dipakai untuk setiap komponen.
*/
