import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import React from "react";

import { store } from "utils/redux/store/store";
import Routes from "routes/Routes";
import "styles/index.css";
import "animate.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Routes />
  </Provider>
);
