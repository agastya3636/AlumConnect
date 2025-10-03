import { NavLink } from "react-router-dom";
import { mentorshipPrograms } from "../../utils/MockData"; // Adjust the import path accordingly

const MentorshipLayout = () => {
  return (
    <div className="min-h-full bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 p-4 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-white mb-6 md:mb-8">
        Mentorship Programs
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
        {mentorshipPrograms.programs.map((program) => (
          <NavLink
            key={program.id}
            to={`/mentorship/${program.id}`}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 md:p-6 transform transition duration-500 hover:scale-105 cursor-pointer"
          >
            <img
              src={program.mentor.image || "/placeholder.svg"}
              alt={program.title}
              className="w-24 h-24 md:w-32 md:h-32 rounded-full mx-auto mb-4"
            />
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2 text-center">
              {program.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-center mb-2 text-sm md:text-base">
              {program.mentor.name}
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-center mb-2 text-sm md:text-base">
              {program.duration}
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
              {program.description}
            </p>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default MentorshipLayout;