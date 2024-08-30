import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { jobs } from "../../utils/MockData";
const JobsList = () => {
  // Sample data for jobs

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [filterTechStack, setFilterTechStack] = useState("");

  const filteredJobs = jobs.filter((job) => {
    return (
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterType ? job.type === filterType : true) &&
      (filterLocation ? job.location.includes(filterLocation) : true) &&
      (filterTechStack ? job.techStack.includes(filterTechStack) : true)
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 p-8">
      <h1 className="text-4xl font-bold text-center text-white mb-8">
        Job Listings
      </h1>
      <div className="mb-8">
        <input
          type="text"
          className="w-full p-4 border rounded-lg mb-4"
          placeholder="Search for jobs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex space-x-4 mb-4">
          <select
            className="w-full p-4 border rounded-lg"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="">All Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
          <input
            type="text"
            className="w-full p-4 border rounded-lg"
            placeholder="Filter by location..."
            value={filterLocation}
            onChange={(e) => setFilterLocation(e.target.value)}
          />
          <input
            type="text"
            className="w-full p-4 border rounded-lg"
            placeholder="Filter by tech stack..."
            value={filterTechStack}
            onChange={(e) => setFilterTechStack(e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-8">
        {filteredJobs.map((job) => (
          <NavLink
            key={job.id}
            to={`/placement/${job.id}`}
            className="bg-white rounded-lg shadow-lg p-6 flex justify-between items-center"
          >
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                {job.title}
              </h2>
              <p className="text-gray-600 mb-2">
                <strong>Posted by:</strong> {job.postedBy}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Posted on:</strong> {job.postedWhen}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Company:</strong> {job.company}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Type:</strong> {job.type}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Location:</strong> {job.location}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Salary:</strong> {job.salary}
              </p>
              <p className="text-gray-600 mb-4">{job.description}</p>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default JobsList;
