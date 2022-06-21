import { useContext } from "react";
import { ThemeContext } from "../utils/context";

const Header = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const handleTheme = (mode) => {
    setTheme(mode);
  };

  return (
    <nav className="sticky top-0 w-full px-2 py-2.5 bg-zinc-800 flex justify-between">
      <p>Homepage</p>
      <button
        onClick={() => handleTheme(theme === "dark" ? "light" : "dark")}
        className="bg-white"
      >
        {theme === "dark" ? "light" : "dark"}
      </button>
    </nav>
  );
};

export default Header;
