import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

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

const ProjectDetails = () => {
  const { id } = useParams();
  const project = projects.find((project) => project.id === parseInt(id));

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 p-8 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl w-full">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          {project.title}
        </h2>
        <p className="text-gray-600 mb-4">{project.description}</p>
        <a
          href={project.githubLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          View on GitHub
        </a>
        <div className="mt-4">
          <Link to="/opensource" className="text-blue-500 hover:underline">
            Back to Projects
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
