import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa";
import { Menu, Divider } from "@mantine/core";

import { ThemeContext, TokenContext } from "../utils/context";

const Header = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useContext(ThemeContext);
  const { setToken } = useContext(TokenContext);

  const handleTheme = (mode) => {
    setTheme(mode);
  };

  const handleLogout = () => {
    setToken("0");
    localStorage.removeItem("token");
    navigate("/login");
    alert("You have been logged out");
  };

  return (
    <nav className="sticky top-0 w-full px-2 py-2.5 bg-zinc-800 flex justify-between">
      <Link id="to-homepage" className="text-white font-bold" to="/">
        Homepage
      </Link>
      <Menu className="bg-white rounded-full">
        <Menu.Item onClick={() => navigate("/profile")}>Profile</Menu.Item>
        <Menu.Item
          onClick={() => handleTheme(theme === "dark" ? "light" : "dark")}
          rightSection={theme === "dark" ? <FaSun /> : <FaMoon />}
        >
          {theme.charAt(0).toUpperCase() + theme.slice(1)}
        </Menu.Item>

        <Divider />

        <Menu.Item color="red" onClick={() => handleLogout()}>
          Logout
        </Menu.Item>
      </Menu>
    </nav>
  );
};

export default Header;
