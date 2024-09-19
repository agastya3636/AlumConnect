import React from "react";
import { NavLink } from "react-router-dom";
import {
  AiOutlineHome,
  AiOutlineRead,
  AiOutlineUsergroupAdd,
  AiOutlineUser,
  AiOutlineCalendar,
  AiOutlineContainer,
  AiOutlineNodeIndex,
  AiOutlineCreditCard,
  AiOutlineAppstoreAdd,
} from "react-icons/ai";

const MainNav = () => {
  return (
    <nav className="py-22">
      <ul className="flex flex-col gap-3 text-xl font-semibold ">
        <li className="  hover:bg-gray-200 rounded active:bg-purple-200   ">
          <NavLink
            to="dashboard"
            className="flex items-center gap-4 px-8 navlinks  py-2"
          >
            <AiOutlineHome />
            <span>Home</span>
          </NavLink>
        </li>
        <li className="hover:bg-gray-200 ">
          <NavLink
            to="alumnidirectory"
            className="flex items-center gap-4 px-8 navlinks  py-2"
          >
            <AiOutlineUsergroupAdd />
            <span>Batches</span>
          </NavLink>
        </li>
        <li className="hover:bg-gray-200 ">
          <NavLink
            to="events"
            className="flex items-center gap-4 px-8 navlinks  py-2"
          >
            <AiOutlineCalendar />
            <span>Events</span>
          </NavLink>
        </li>
        <li className="hover:bg-gray-200 ">
          <NavLink
            to="discussionforums"
            className="flex items-center gap-4 px-8 navlinks  py-2"
          >
            <AiOutlineRead />
            <span>Forums</span>
          </NavLink>
        </li>
        <li className="hover:bg-gray-200 ">
          <NavLink
            to="mentorship"
            className="flex items-center gap-4 px-8 navlinks  py-2"
          >
            <AiOutlineContainer />
            Mentorship
          </NavLink>
        </li>
        <li className="hover:bg-gray-200 ">
          <NavLink
            to="opensource"
            className="flex items-center gap-4 px-8 navlinks  py-2"
          >
            <AiOutlineAppstoreAdd />
            OpenSource
          </NavLink>
        </li>
        <li className="hover:bg-gray-200 ">
          <NavLink
            to="placement"
            className="flex items-center gap-4 px-8 navlinks  py-2"
          >
            <AiOutlineNodeIndex />
            <span>Placement</span>
          </NavLink>
        </li>
        <li className="hover:bg-gray-200 ">
          <NavLink
            to="donation"
            className="flex items-center gap-4 px-8 navlinks  py-2"
          >
            <AiOutlineCreditCard />
            <span>Donation</span>
          </NavLink>
        </li>
        <li className="hover:bg-gray-200 ">
          <NavLink
            to="profile"
            className="flex items-center gap-4 px-8 navlinks  py-2"
          >
            <AiOutlineUser />
            <span>My Profile</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default MainNav;
