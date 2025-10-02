import { NavLink } from "react-router-dom";
import { alumnidata } from "../../utils/MockData.jsx";
const AlumniBatch = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-full bg-gradient-to-r from-blue-400 via-blue-400 to-blue-400 p-4 md:p-8">
      <div className="text-white text-3xl md:text-4xl lg:text-5xl mb-6 md:mb-8 font-bold text-center">
        Alumni Directory
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full max-w-6xl">
        {alumnidata.alumni.map((batch) => (
          <NavLink
            to={`${batch.year}`}
            key={batch.year}
            className="bg-white bg-opacity-30 flex justify-center items-center backdrop-filter backdrop-blur-lg rounded-3xl p-6 md:p-8 shadow-lg transform transition duration-500 hover:scale-105 min-h-[150px] md:min-h-[200px]"
          >
            <h3 className="text-white text-2xl md:text-3xl font-bold hover:underline text-center">
              Batch of {batch.year}
            </h3>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default AlumniBatch;