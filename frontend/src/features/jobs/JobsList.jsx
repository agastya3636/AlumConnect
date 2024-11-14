import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const JobsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [filterTechStack, setFilterTechStack] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook to navigate programmatically

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/jobs`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }
        const data = await response.json();
        setJobs(data.jobs);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  if (loading) {
    return <p className="text-gray-600">Loading jobs...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  const filteredJobs = jobs.filter((job) => {
    return (
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterType ? job.type === filterType : true) &&
      (filterLocation ? job.location.includes(filterLocation) : true) &&
      (filterTechStack ? job.techStack.includes(filterTechStack) : true)
    );
  });

  const handleAddJob = () => {
    // Navigate to the job creation page
    navigate("/addplacement");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 p-8">
      <h1 className="text-4xl font-bold text-center text-white mb-8">Job Listings</h1>

      {/* {userRole === "alumni" && ( */}
        <button
          onClick={handleAddJob}
          className="bg-green-500 text-white px-4 py-2 rounded mb-8"
        >
          Add Job
        </button>
      {/* )} */}

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
                <strong>Posted by:</strong> {job.posted_by}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Posted on:</strong> {job.created_at}
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
