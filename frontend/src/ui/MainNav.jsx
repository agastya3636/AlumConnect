import { useState } from "react";
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
  AiOutlineMenuFold,
  AiOutlineMenuUnfold,
} from "react-icons/ai";

const MainNav = () => {
  const [hidden, setHidden] = useState(false);

  return (
    <>
      {/* Always visible button */}
      <button
        onClick={() => setHidden(!hidden)}
        className="fixed top-4 left-4 z-50 bg-gray-800 dark:bg-gray-200 dark:text-gray-800 text-white p-2 rounded-md shadow-md hover:bg-gray-700 dark:hover:bg-gray-300 transition-all"
      >
        {hidden ? <AiOutlineMenuUnfold size={22} /> : <AiOutlineMenuFold size={22} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 transition-transform duration-300 z-40 ${
          hidden ? "-translate-x-full" : "translate-x-0"
        } bg-white text-black dark:bg-[#0b1526] dark:text-white`}
      >
        {/* Sidebar nav links */}
        <nav className="py-2 flex-1 overflow-y-auto mt-12">
          <ul className="flex flex-col gap-1 text-base md:text-lg font-semibold">
            <li className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded active:bg-purple-200 dark:active:bg-purple-900/40">
              <NavLink
                to="dashboard"
                className="flex items-center gap-3 px-4 py-2 navlinks"
              >
                <AiOutlineHome className="flex-shrink-0 text-xl" />
                <span>Home</span>
              </NavLink>
            </li>

            <li className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
              <NavLink
                to="alumnidirectory"
                className="flex items-center gap-3 px-4 py-2 navlinks"
              >
                <AiOutlineUsergroupAdd className="flex-shrink-0 text-xl" />
                <span>Batches</span>
              </NavLink>
            </li>

            <li className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
              <NavLink
                to="events"
                className="flex items-center gap-3 px-4 py-2 navlinks"
              >
                <AiOutlineCalendar className="flex-shrink-0 text-xl" />
                <span>Events</span>
              </NavLink>
            </li>

            <li className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
              <NavLink
                to="discussionforums"
                className="flex items-center gap-3 px-4 py-2 navlinks"
              >
                <AiOutlineRead className="flex-shrink-0 text-xl" />
                <span>Forums</span>
              </NavLink>
            </li>

            <li className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
              <NavLink
                to="mentorship"
                className="flex items-center gap-3 px-4 py-2 navlinks"
              >
                <AiOutlineContainer className="flex-shrink-0 text-xl" />
                <span>Mentorship</span>
              </NavLink>
            </li>

            <li className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
              <NavLink
                to="opensource"
                className="flex items-center gap-3 px-4 py-2 navlinks"
              >
                <AiOutlineAppstoreAdd className="flex-shrink-0 text-xl" />
                <span>OpenSource</span>
              </NavLink>
            </li>

            <li className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
              <NavLink
                to="placement"
                className="flex items-center gap-3 px-4 py-2 navlinks"
              >
                <AiOutlineNodeIndex className="flex-shrink-0 text-xl" />
                <span>Placement</span>
              </NavLink>
            </li>

            <li className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
              <NavLink
                to="donation"
                className="flex items-center gap-3 px-4 py-2 navlinks"
              >
                <AiOutlineCreditCard className="flex-shrink-0 text-xl" />
                <span>Donation</span>
              </NavLink>
            </li>

            <li className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
              <NavLink
                to="profile"
                className="flex items-center gap-3 px-4 py-2 navlinks"
              >
                <AiOutlineUser className="flex-shrink-0 text-xl" />
                <span>My Profile</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default MainNav;
