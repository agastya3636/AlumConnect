import { FiLogOut, FiUser, FiMenu } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Header = ({ onMenuToggle }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    alert("Logging out");
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="bg-gray-100 py-3 px-4 md:px-8 flex items-center justify-between border-b border-gray-200">
      <button
        className="md:hidden text-gray-600 hover:text-gray-800 p-1"
        onClick={onMenuToggle}
      >
        <FiMenu size={24} />
      </button>
      <div className="flex-1 md:flex-none"></div>
      <div className="flex gap-4 items-center">
        <button className="text-gray-600 hover:text-gray-800 p-2 hover:bg-gray-200 rounded-full transition-colors">
          <FiUser size={20} />
        </button>
        <button
          className="text-gray-600 hover:text-gray-800 p-2 hover:bg-gray-200 rounded-full transition-colors"
          onClick={handleLogout}
        >
          <FiLogOut size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;