import React from "react";
import { Link, NavLink } from "react-router-dom";
import { alumnidata } from "../../../utils/MockData";
const AlumniBatch = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-8">
      <div className="text-white text-5xl mb-8 font-bold">Alumni Directory</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {alumnidata.alumni.map((batch) => (
          <NavLink
            to={`${batch.year}`}
            key={batch.year}
            className="bg-white bg-opacity-20 flex justify-center items-center backdrop-filter backdrop-blur-lg rounded-3xl p-6 shadow-lg transform transition duration-500 hover:scale-105 min-h-[200px]"
          >
            <h3 className="text-white text-3xl font-bold hover:underline">
              Batch of {batch.year}
            </h3>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default AlumniBatch;
