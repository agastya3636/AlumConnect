import React from "react";
import { NavLink } from "react-router-dom";

const MainNav = () => {
  return (
    <nav className="py-12">
      <ul className="flex flex-col gap-2 text-xl font-semibold ">
        <li className="hover:bg-gray-200 px-2 py-1">
          <NavLink to="dashboard" className="">
            Home
          </NavLink>
        </li>
        <li className="hover:bg-gray-200 px-2 py-1">
          <NavLink to="alumnidirectory">Alumni Directory</NavLink>
        </li>
        <li className="hover:bg-gray-200 px-2 py-1">
          <NavLink to="events">Events</NavLink>
        </li>
        <li className="hover:bg-gray-200 px-2 py-1">
          <NavLink to="discussionforums">Forums</NavLink>
        </li>
        <li className="hover:bg-gray-200 px-2 py-1">
          <NavLink to="mentorship">Mentorship</NavLink>
        </li>
        <li className="hover:bg-gray-200 px-2 py-1">
          <NavLink to="placement">Placement</NavLink>
        </li>
        <li className="hover:bg-gray-200 px-2 py-1">
          <NavLink to="profile">My Profile</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default MainNav;
