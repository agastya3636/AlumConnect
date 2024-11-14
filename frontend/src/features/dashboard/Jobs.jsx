import React from "react";
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
    return <p className="text-gray-600">Loading jobs...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 h-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Job Opportunities
      </h2>
      {jobs.length > 0 ? (
        <div className="space-y-4">
          {jobs.map((job) => (
            <div key={job.id} className="border-b pb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                <Link
                  to={`/jobs/${job.id}`}
                  className="text-blue-500 hover:underline"
                >
                  {job.title}
                </Link>
              </h3>
              <p className="text-sm text-gray-600">
                {job.company} - {job.location}
              </p>
              <p className="text-gray-600 mt-2">{job.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">
          No job opportunities available at the moment.
        </p>
      )}
    </div>
  );
};

export default Jobs;
