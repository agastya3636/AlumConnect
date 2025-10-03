import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/jobs/?limit=2`, {
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
    return (
      <div className="bg-white dark:bg-gray-800 dark:text-gray-100 rounded-lg shadow-lg p-3 sm:p-4 md:p-6 h-full">
        <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
          Loading jobs...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 dark:text-gray-100 rounded-lg shadow-lg p-3 sm:p-4 md:p-6 h-full">
        <p className="text-red-500 text-sm md:text-base break-words">
          Error: {error}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 dark:text-gray-100 rounded-lg shadow-lg p-3 sm:p-4 md:p-6 h-full">
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3 sm:mb-4">
        Job Opportunities
      </h2>
      {jobs.length > 0 ? (
        <div className="space-y-3 sm:space-y-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="border-b border-gray-200 dark:border-gray-700 pb-3 sm:pb-4 last:border-b-0"
            >
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-100 break-words">
                <Link
                  to={`/jobs/${job.id}`}
                  className="text-blue-500 dark:text-blue-400 hover:underline"
                >
                  {job.title}
                </Link>
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-1 break-words">
                {job.company} - {job.location}
              </p>
              <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300 mt-2 line-clamp-3 break-words">
                {job.description}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
          No job opportunities available at the moment.
        </p>
      )}
    </div>
  );
};

export default Jobs;