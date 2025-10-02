import Logo from "./Logo";
import MainNav from "./MainNav";

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed md:relative inset-y-0 left-0 z-50
          bg-gray-100 px-4 py-4 
          flex flex-col gap-4
          w-64
          transform transition-transform duration-300 ease-in-out md:transform-none
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          md:row-span-2
        `}
      >
        <Logo />
        <MainNav onLinkClick={onClose} />
      </aside>
    </>
  );
};

export default Sidebar;
