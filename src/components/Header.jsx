import { FaSun, FaMoon, FaChevronDown, FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useContext } from "react";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";

import { handleAuth } from "utils/redux/reducers/reducer";
import { ThemeContext } from "utils/context";

const Header = () => {
  const [cookies, , removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { theme, setTheme } = useContext(ThemeContext);

  const handleTheme = (mode) => {
    setTheme(mode);
    localStorage.setItem("theme", mode);
  };

  const handleLogout = async () => {
    removeCookie("token");
    dispatch(handleAuth(false));
    navigate("/login");
    alert("You have been logged out");
  };

  return (
    <nav className="sticky top-0 w-full px-2 py-2.5 bg-zinc-800 flex justify-between items-center">
      <Link id="to-homepage" className="text-white font-bold" to="/">
        Homepage
      </Link>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <FaChevronDown
              className="h-5 w-5 text-violet-200 hover:text-violet-100"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white dark:bg-zinc-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1">
              {cookies && (
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active
                          ? "bg-blue-700 text-white"
                          : "text-gray-900 dark:text-white"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      id="to-profile"
                      onClick={() => navigate("/profile")}
                    >
                      {active ? (
                        <FaUserCircle
                          className="mr-2 h-5 w-5"
                          aria-hidden="true"
                        />
                      ) : (
                        <FaUserCircle
                          className="mr-2 h-5 w-5"
                          aria-hidden="true"
                        />
                      )}
                      Profile
                    </button>
                  )}
                </Menu.Item>
              )}
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active
                        ? "bg-blue-700 text-white"
                        : "text-gray-900 dark:text-white"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    id="btn-mode"
                    onClick={() =>
                      handleTheme(theme === "dark" ? "light" : "dark")
                    }
                  >
                    {theme === "dark" ? (
                      <FaSun className="mr-2 h-5 w-5" aria-hidden="true" />
                    ) : (
                      <FaMoon className="mr-2 h-5 w-5" aria-hidden="true" />
                    )}
                    {theme.charAt(0).toUpperCase() + theme.slice(1)}
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active
                        ? "bg-blue-700 text-white"
                        : "text-gray-900 dark:text-white"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    id="btn-logout"
                    onClick={() =>
                      cookies ? handleLogout() : navigate("/login")
                    }
                  >
                    {active ? (
                      <FaSun className="mr-2 h-5 w-5" aria-hidden="true" />
                    ) : (
                      <FaSun className="mr-2 h-5 w-5" aria-hidden="true" />
                    )}
                    {cookies ? "Logout" : "Login"}
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </nav>
  );
};

export default Header;
