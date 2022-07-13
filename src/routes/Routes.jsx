/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useMemo } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { reduxAction } from "../utils/redux/actions/action";
import { ThemeContext, TokenContext } from "../utils/context";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Profile from "../pages/Profile";

axios.defaults.baseURL = "https://alta-kitchen-sink.herokuapp.com/api/v1/";
// axios.defaults.baseURL = "http://192.168.1.132:4001/api/v1/";

function App() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [token, setToken] = useState(null);
  const background = useMemo(() => ({ theme, setTheme }), [theme]);
  const jwtToken = useMemo(() => ({ token, setToken }), [token]);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    const getToken = localStorage.getItem("token");
    if (getToken) {
      dispatch(reduxAction("IS_LOGGED_IN", true));
    } else {
      dispatch(reduxAction("IS_LOGGED_IN", false));
    }
    axios.defaults.headers.common["Authorization"] = getToken
      ? `Bearer ${getToken}`
      : "";
  }, [isLoggedIn]);

  return (
    <TokenContext.Provider value={jwtToken}>
      <ThemeContext.Provider value={background}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route
              path="/login"
              element={isLoggedIn ? <Navigate to="/profile" /> : <Login />}
            />
            <Route
              path="/register"
              element={isLoggedIn ? <Navigate to="/profile" /> : <Register />}
            />
            <Route
              path="/profile"
              element={isLoggedIn ? <Profile /> : <Navigate to="/login" />}
            />
            {/* <Route path="*" element={<Navigate to="/login" />} /> */}
          </Routes>
        </BrowserRouter>
      </ThemeContext.Provider>
    </TokenContext.Provider>
  );
}

export default App;
