import React from "react";
import { Link, useNavigate } from "react-router-dom";

const projects = [
  {
    id: 1,
    title: "React",
    description: "A JavaScript library for building user interfaces.",
    githubLink: "https://github.com/facebook/react",
  },
  {
    id: 2,
    title: "Vue.js",
    description: "The Progressive JavaScript Framework.",
    githubLink: "https://github.com/vuejs/vue",
  },
  {
    id: 3,
    title: "Angular",
    description: "One framework. Mobile & desktop.",
    githubLink: "https://github.com/angular/angular",
  },
  {
    id: 4,
    title: "Django",
    description: "The Web framework for perfectionists with deadlines.",
    githubLink: "https://github.com/django/django",
  },
  {
    id: 5,
    title: "Flask",
    description:
      "A microframework for Python based on Werkzeug, Jinja2, and good intentions.",
    githubLink: "https://github.com/pallets/flask",
  },
  // Add more projects as needed
];

const OpenSource = () => {
  const navigate = useNavigate(); // Hook to navigate to the Add Project page

  // Function to handle the Add Project button click
  const handleAddProject = () => {
    navigate("/addproject"); // Navigate to the Add Project page
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 p-8 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-6xl w-full">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          Open Source Projects
        </h2>
        <div className="space-y-4">
          {projects.map((project) => (
            <div key={project.id} className="bg-gray-100 p-4 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-gray-800">
                {project.title}
              </h3>
              <p className="text-gray-600">{project.description}</p>
              <Link
                to={`/opensource/${project.id}`}
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
            className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-700"
          >
            Add New Project
          </button>
        </div>
      </div>
    </div>
  );
};

export default OpenSource;
