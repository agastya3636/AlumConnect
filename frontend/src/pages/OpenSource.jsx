import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const OpenSource = () => {
  const navigate = useNavigate(); 
  const [projects, setProjects] = useState([]);
  

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/project`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch events" + response);
        }
        const data = await response.json();
        console.log("d"+data);
        setProjects(data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);
  
  const handleAddProject = () => {
    navigate("/addproject");
  };
  
  return (
    
    <div className="min-h-full bg-gradient-to-r from-blue-300 via-blue-400 to-blue-300 p-8 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-12xl w-full">
        <h2 className="text-4xl font-semibold text-gray-800 mb-6 text-center">
          Open Source Projects
        </h2>
        <div className="space-y-4 ">
          {projects.map((project) => (
            <div key={project._id} className="bg-gray-100 p-4 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-gray-800">
                {project.title}
              </h3>
              <p className="text-gray-600">{project.description}</p>
              <Link
                to={`/opensource/${project._id}`}
                className="text-blue-500 hover:underline"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>

        {/* Add Project Button */}
        <div className="mt-6 text-center">
          <button
            onClick={handleAddProject}
            className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-700"
          >
            Add New Project
          </button>
        </div>
      </div>
    </div>
  );
};

export default OpenSource;
