import React from "react";

const Welcome = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg p-8 w-full flex flex-col md:flex-row items-center justify-between">
      <div className="flex flex-col items-center md:items-start space-y-4 md:w-1/2">
        <h1 className="text-3xl font-bold text-white">Welcome, Agastya!</h1>

        <p className="text-md text-gray-200">
          Bachelor of Technology in Computer Science
        </p>
        <p className="text-md text-gray-200">
          Rajiv Gandhi Institute Of Petroleum Technology
        </p>
        <p className="text-md text-gray-200">Year of Graduation: 2026</p>

        <div className="pt-4 w-full">
          <h3 className="text-md font-semibold text-white">Interests:</h3>
          <div className="flex flex-wrap space-x-2 text-gray-200 mt-2">
            <span className="bg-white bg-opacity-20 rounded px-2 py-1">
              Web Development
            </span>
            <span className="bg-white bg-opacity-20 rounded px-2 py-1">
              CyberSecurity
            </span>
            <span className="bg-white bg-opacity-20 rounded px-2 py-1">
              Open Source Contribution
            </span>
          </div>
        </div>

        <div className="pt-4 w-full">
          <h3 className="text-md font-semibold text-white">Skills:</h3>
          <div className="grid grid-cols-2 gap-2 text-gray-200 mt-2">
            <span className="bg-white bg-opacity-20 rounded px-2 py-1">
              JavaScript
            </span>
            <span className="bg-white bg-opacity-20 rounded px-2 py-1">
              React
            </span>
            <span className="bg-white bg-opacity-20 rounded px-2 py-1">
              Node.js
            </span>
            <span className="bg-white bg-opacity-20 rounded px-2 py-1">
              Python
            </span>

            <span className="bg-white bg-opacity-20 rounded px-2 py-1">
              Git
            </span>
            <span className="bg-white bg-opacity-20 rounded px-2 py-1">
              GitHub
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center md:w-1/2 mt-8 md:mt-0">
        <img
          src="https://avatars.githubusercontent.com/u/124435030?v=4"
          alt="Profile"
          className="rounded-full w-32 h-32 md:w-48 md:h-48 object-cover shadow-md"
        />
        <h3 className="text-lg font-bold bg-green-500 px-6 text-white p-2 rounded mt-4">
          Student
        </h3>
      </div>
    </div>
  );
};

export default Welcome;
