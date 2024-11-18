import React from "react";
import { NavLink } from "react-router-dom";
import { mentorshipPrograms } from "../../utils/MockData"; // Adjust the import path accordingly

const MentorshipLayout = () => {
  return (
    <div className="min-h-full bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 p-8">
      <h1 className="text-4xl font-bold text-center text-white mb-8">
        Mentorship Programs
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mentorshipPrograms.programs.map((program) => (
          <NavLink
            key={program.id}
            to={`/mentorship/${program.id}`}
            className="bg-white rounded-lg shadow-lg p-6 transform transition duration-500 hover:scale-105 cursor-pointer"
          >
            <img
              src={program.mentor.image}
              alt={program.title}
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
              {program.title}
            </h2>
            <p className="text-gray-600 text-center mb-2">
              {program.mentor.name}
            </p>
            <p className="text-gray-600 text-center mb-2">{program.duration}</p>
            <p className="text-gray-600">{program.description}</p>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default MentorshipLayout;
