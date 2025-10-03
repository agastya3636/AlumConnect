import { useState, useEffect } from "react";
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
  const navigate = useNavigate();

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
    return <p className="text-gray-600 text-center p-4">Loading jobs...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center p-4">Error: {error}</p>;
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
    navigate("/addplacement");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 p-3 sm:p-4 md:p-6 lg:p-8">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-white mb-4 sm:mb-6 md:mb-8">
        Job Listings
      </h1>

      <button
        onClick={handleAddJob}
        className="bg-green-500 hover:bg-green-600 dark:hover:bg-green-400 text-white px-3 sm:px-4 py-2 rounded mb-4 sm:mb-6 md:mb-8 text-sm md:text-base transition-colors"
      >
        Add Job
      </button>

      <div className="mb-4 sm:mb-6 md:mb-8">
        <input
          type="text"
          className="w-full p-2 sm:p-3 md:p-4 border rounded-lg mb-3 md:mb-4 text-sm md:text-base bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
          placeholder="Search for jobs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 mb-3 md:mb-4">
          <select
            className="w-full p-2 sm:p-3 md:p-4 border rounded-lg text-sm md:text-base bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100"
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
            className="w-full p-2 sm:p-3 md:p-4 border rounded-lg text-sm md:text-base bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
            placeholder="Filter by location..."
            value={filterLocation}
            onChange={(e) => setFilterLocation(e.target.value)}
          />
          <input
            type="text"
            className="w-full p-2 sm:p-3 md:p-4 border rounded-lg text-sm md:text-base bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
            placeholder="Filter by tech stack..."
            value={filterTechStack}
            onChange={(e) => setFilterTechStack(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
        {filteredJobs.map((job) => (
          <NavLink
            key={job.id}
            to={`/placement/${job.id}`}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 sm:p-4 md:p-6 flex flex-col gap-3 sm:gap-4 hover:shadow-xl transition-shadow"
          >
            <div className="flex-1">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2 sm:mb-3 break-words">
                {job.title}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2 text-xs sm:text-sm md:text-base">
                <p className="text-gray-600 dark:text-gray-300 break-words">
                  <strong>Posted by:</strong> {job.posted_by}
                </p>
                <p className="text-gray-600 dark:text-gray-300 break-words">
                  <strong>Posted on:</strong> {job.created_at}
                </p>
                <p className="text-gray-600 dark:text-gray-300 break-words">
                  <strong>Company:</strong> {job.company}
                </p>
                <p className="text-gray-600 dark:text-gray-300 break-words">
                  <strong>Type:</strong> {job.type}
                </p>
                <p className="text-gray-600 dark:text-gray-300 break-words">
                  <strong>Location:</strong> {job.location}
                </p>
                <p className="text-gray-600 dark:text-gray-300 break-words">
                  <strong>Salary:</strong> {job.salary}
                </p>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mt-2 sm:mt-3 md:mt-4 text-xs sm:text-sm md:text-base line-clamp-3 break-words">
                {job.description}
              </p>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default JobsList;