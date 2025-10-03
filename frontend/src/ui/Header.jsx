import { FiLogOut, FiUser, FiMenu, FiMoon, FiSun } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../theme/ThemeProvider";

const Header = ({ onMenuToggle }) => {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();

  const handleLogout = () => {
    alert("Logging out");
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="bg-gray-100 dark:bg-gray-900 py-3 px-4 md:px-8 flex items-center justify-between border-b border-gray-200 dark:border-gray-800">
      <button
        className="md:hidden text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white p-1"
        onClick={onMenuToggle}
        aria-label="Toggle menu"
      >
        <FiMenu size={24} />
      </button>
      <div className="flex-1 md:flex-none"></div>
      <div className="flex gap-2 md:gap-4 items-center">
        <button
          className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
          title={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
        </button>
        <button
          className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
          aria-label="Profile"
        >
          <FiUser size={20} />
        </button>
        <button
          className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
          onClick={handleLogout}
          aria-label="Logout"
        >
          <FiLogOut size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;