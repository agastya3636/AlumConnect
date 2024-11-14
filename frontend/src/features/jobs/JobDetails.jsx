import React, { useState ,useEffect} from "react";
import { useParams } from "react-router-dom";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState([]);
  
  useEffect(() => {
    const fetchjob = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/jobs/jobpost/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
        const data = await response.json();
        setJob(data);
      }
      catch (e) {
        console.error("Failed to fetch job", e);
      }
    };
    fetchjob();
  }, [id]);


  if (!job) {
    return <div>Job not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 p-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
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
        <p className="text-gray-600 mb-2">
          <strong>Tech Stack:</strong> {job.techStack.join(", ")}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Perks:</strong> {job.perks}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Requirements:</strong> {job.requirements}
        </p>
        <p className="text-gray-600 mb-4">{job.description}</p>
        <a
          href={job.applyLink}
          className="inline-block bg-blue-500 text-white px-4 py-2 rounded"
        >
          Apply Now
        </a>
      </div>
    </div>
  );
};

export default JobDetails;
