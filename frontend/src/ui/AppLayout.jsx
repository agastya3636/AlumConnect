import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
const AppLayout = () => {
  return (
    <div className="grid applayout h-screen  ">
      <Header />
      <Sidebar />
      <main className="bg-gray-200 pt-10 px-12 pb-12">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
