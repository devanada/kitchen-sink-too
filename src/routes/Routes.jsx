import { useState, useEffect, useMemo } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";

import { ThemeContext, TokenContext } from "../utils/context";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Profile from "../pages/Profile";

axios.defaults.baseURL = "https://alta-kitchen-sink.herokuapp.com/api/v1/";
// axios.defaults.baseURL = "http://192.168.1.132:4001/api/v1/";

function App() {
  const [theme, setTheme] = useState("light");
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
    const getToken = localStorage.getItem("token") || "0";
    setToken(getToken);
    if (getToken !== "0")
      axios.defaults.headers.common["Authorization"] = `Bearer ${getToken}`;
  }, [token]);

  if (token) {
    return (
      <TokenContext.Provider value={jwtToken}>
        <ThemeContext.Provider value={background}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </BrowserRouter>
        </ThemeContext.Provider>
      </TokenContext.Provider>
    );
  }
}

export default App;
