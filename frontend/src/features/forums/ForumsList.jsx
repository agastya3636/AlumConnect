import React from "react";
import { NavLink } from "react-router-dom";
import { FaComments, FaClock, FaList } from "react-icons/fa";
import { forums } from "../../utils/MockData";

const ForumsList = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 p-8">
      <h1 className="text-4xl font-bold text-center text-white mb-8">Forums</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Object.keys(forums).map((category) =>
          forums[category].map((forum) => (
            <NavLink
              key={forum.id}
              to={`${forum.id}`}
              className="bg-white rounded-lg shadow-lg p-6 transform transition duration-500 hover:scale-105 cursor-pointer"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                {forum.title}
              </h2>
              <p className="text-gray-600 mb-4">{forum.description}</p>
              <div className="flex items-center text-gray-600 mb-2">
                <FaList className="mr-2" />
                <span>
                  <strong>Topics:</strong> {forum.topicsCount}
                </span>
              </div>
              <div className="flex items-center text-gray-600 mb-2">
                <FaComments className="mr-2" />
                <span>
                  <strong>Posts:</strong> {forum.postsCount}
                </span>
              </div>
              <div className="flex items-center text-gray-600">
                <FaClock className="mr-2" />
                <span>
                  <strong>Last Activity:</strong> {forum.lastActivity}
                </span>
              </div>
            </NavLink>
          ))
        )}
      </div>
    </div>
  );
};

export default ForumsList;
