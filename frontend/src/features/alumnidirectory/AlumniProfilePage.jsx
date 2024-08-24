import React from "react";
import { BsLinkedin, BsTwitter, BsGithub } from "react-icons/bs";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl w-full flex flex-col md:flex-row items-center justify-between">
        <div className="flex flex-col items-center md:items-start space-y-4 md:w-1/2">
          <h1 className="text-4xl font-bold text-gray-800">
            Welcome, Agastya!
          </h1>

          <p className="text-lg text-gray-600">
            Bachelor of Technology in Computer Science
          </p>
          <p className="text-lg text-gray-600">
            Rajiv Gandhi Institute Of Petroleum Technology
          </p>
          <p className="text-lg text-gray-600">Year of Graduation: 2026</p>

          <div className="pt-8 w-full">
            <h3 className="text-lg font-semibold text-gray-800">
              Connect with me:
            </h3>
            <div className="flex space-x-4 mt-2">
              <Link to="https://linkedin.com/agastya" className="text-blue-600">
                <BsLinkedin size={32} />
              </Link>
              <Link to="https://twitter.com/agastya" className="text-blue-400">
                <BsTwitter size={32} />
              </Link>
              <Link to="https://github.com/agastya" className="text-gray-800">
                <BsGithub size={32} />
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center md:w-1/2 mt-8 md:mt-0">
          <img
            src="https://avatars.githubusercontent.com/u/124435030?v=4"
            alt="Profile"
            className="rounded-full w-48 h-48 md:w-72 md:h-72 object-cover shadow-md"
          />
          <h3 className="text-xl font-bold bg-green-500 px-8 text-white p-2 rounded mt-4">
            Student
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
