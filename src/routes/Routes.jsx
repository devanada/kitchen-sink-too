/* eslint-disable react-hooks/exhaustive-deps */
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import axios from "axios";

import { ThemeContext, TokenContext } from "utils/context";
import { handleAuth } from "utils/redux/reducers/reducer";
import Register from "pages/auth/Register";
import Login from "pages/auth/Login";
import Profile from "pages/Profile";
import Home from "pages/Home";

axios.defaults.baseURL = "https://kitchen-sink-7e96.onrender.com/api/v1/";

function App() {
  const [cookie, setCookie, removeCookie] = useCookies();
  const dispatch = useDispatch();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [token, setToken] = useState(null);
  const background = useMemo(() => ({ theme, setTheme }), [theme]);
  const jwtToken = useMemo(() => ({ token, setToken }), [token]);
  const checkToken = cookie.token;

  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      const { data } = error.response;
      if (
        data === "Missing or malformed JWT" ||
        [401, 403].includes(data.code)
      ) {
        removeCookie("token");
      }
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  (function () {
    if (checkToken) {
      const { token } = cookie;
      dispatch(handleAuth(true));
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      dispatch(handleAuth(false));
      delete axios.defaults.headers.common["Authorization"];
    }
  })();

  return (
    <TokenContext.Provider value={jwtToken}>
      <ThemeContext.Provider value={background}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={checkToken ? <Navigate to="/" /> : <Login />}
            />
            <Route
              path="/register"
              element={checkToken ? <Navigate to="/" /> : <Register />}
            />
            <Route
              path="/profile"
              element={checkToken ? <Profile /> : <Navigate to="/login" />}
            />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </BrowserRouter>
      </ThemeContext.Provider>
    </TokenContext.Provider>
  );
}

export default App;
