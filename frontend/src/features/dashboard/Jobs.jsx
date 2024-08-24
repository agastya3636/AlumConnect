import React from "react";
import { Link } from "react-router-dom";

const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Tech Corp",
    location: "Remote",
    description:
      "Looking for a skilled frontend developer with experience in React.",
  },
  {
    id: 2,
    title: "Backend Developer",
    company: "Innovate Ltd",
    location: "New York, NY",
    description:
      "Seeking a backend developer proficient in Node.js and Express.",
  },
  {
    id: 3,
    title: "Full Stack Developer",
    company: "Web Solutions",
    location: "San Francisco, CA",
    description: "Hiring a full stack developer with expertise in MERN stack.",
  },
];

const Jobs = () => {
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
