import React from "react";
import Logo from "./Logo";
import MainNav from "./MainNav";
const Sidebar = () => {
  return (
    <aside className="bg-gray-100 px-6 py-4 sidebar flex-col flex gap-8 ">
      <Logo />
      <MainNav />
    </aside>
  );
};

export default Sidebar;
