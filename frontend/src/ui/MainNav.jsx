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

const MainNav = ({ onLinkClick }) => {
  return (
    <nav className="py-2 flex-1 overflow-y-auto">
      <ul className="flex flex-col gap-1 text-base md:text-lg font-semibold">
        <li className="hover:bg-gray-200 dark:hover:bg-gray-700 rounded active:bg-purple-200 dark:active:bg-purple-900/40">
          <NavLink
            to="dashboard"
            className="flex items-center gap-3 px-4 py-2 navlinks"
            onClick={onLinkClick}
          >
            <AiOutlineHome className="flex-shrink-0 text-xl" />
            <span>Home</span>
          </NavLink>
        </li>
        <li className="hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
          <NavLink
            to="alumnidirectory"
            className="flex items-center gap-3 px-4 py-2 navlinks"
            onClick={onLinkClick}
          >
            <AiOutlineUsergroupAdd className="flex-shrink-0 text-xl" />
            <span>Batches</span>
          </NavLink>
        </li>
        <li className="hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
          <NavLink
            to="events"
            className="flex items-center gap-3 px-4 py-2 navlinks"
            onClick={onLinkClick}
          >
            <AiOutlineCalendar className="flex-shrink-0 text-xl" />
            <span>Events</span>
          </NavLink>
        </li>
        <li className="hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
          <NavLink
            to="discussionforums"
            className="flex items-center gap-3 px-4 py-2 navlinks"
            onClick={onLinkClick}
          >
            <AiOutlineRead className="flex-shrink-0 text-xl" />
            <span>Forums</span>
          </NavLink>
        </li>
        <li className="hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
          <NavLink
            to="mentorship"
            className="flex items-center gap-3 px-4 py-2 navlinks"
            onClick={onLinkClick}
          >
            <AiOutlineContainer className="flex-shrink-0 text-xl" />
            <span>Mentorship</span>
          </NavLink>
        </li>
        <li className="hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
          <NavLink
            to="opensource"
            className="flex items-center gap-3 px-4 py-2 navlinks"
            onClick={onLinkClick}
          >
            <AiOutlineAppstoreAdd className="flex-shrink-0 text-xl" />
            <span>OpenSource</span>
          </NavLink>
        </li>
        <li className="hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
          <NavLink
            to="placement"
            className="flex items-center gap-3 px-4 py-2 navlinks"
            onClick={onLinkClick}
          >
            <AiOutlineNodeIndex className="flex-shrink-0 text-xl" />
            <span>Placement</span>
          </NavLink>
        </li>
        <li className="hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
          <NavLink
            to="donation"
            className="flex items-center gap-3 px-4 py-2 navlinks"
            onClick={onLinkClick}
          >
            <AiOutlineCreditCard className="flex-shrink-0 text-xl" />
            <span>Donation</span>
          </NavLink>
        </li>
        <li className="hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
          <NavLink
            to="profile"
            className="flex items-center gap-3 px-4 py-2 navlinks"
            onClick={onLinkClick}
          >
            <AiOutlineUser className="flex-shrink-0 text-xl" />
            <span>My Profile</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default MainNav;