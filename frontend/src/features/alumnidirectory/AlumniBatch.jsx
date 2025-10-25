import { NavLink } from "react-router-dom";
import { alumnidata } from "../../utils/MockData.jsx";

const AlumniBatch = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 p-4 md:p-8 flex flex-col items-center">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-white mb-6 md:mb-8">
        Alumni Directory
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 w-full max-w-6xl">
        {alumnidata.alumni.map((batch) => (
          <NavLink
            to={`${batch.year}`}
            key={batch.year}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8 flex flex-col justify-center items-center transform transition duration-500 hover:scale-105 cursor-pointer"
          >
            <h3 className="text-gray-800 dark:text-gray-100 text-2xl md:text-3xl font-semibold text-center mb-2">
              Batch of {batch.year}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-center text-sm md:text-base">
              Explore alumni from the class of {batch.year}
            </p>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default AlumniBatch;
