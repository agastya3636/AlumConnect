import React from "react";
import logo from "../assets/logo.png";
const Logo = () => {
  return (
    <>
      <div className=" flex  justify-center items-center w-full px-4 py-4">
        <img src={logo} className="w-24 " alt="logo" />
      </div>
    </>
  );
};

export default Logo;
