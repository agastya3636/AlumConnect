import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const AddProjectForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [githublink, setGithubLink] = useState("");
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProject = {
      title,
      description,
      githublink,
    };
    try {
      const response = await fetch(`${API_BASE_URL}/api/project`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProject),
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to register user");
      }
      navigate("/opensource");
    } catch (error) {
      console.error("Failed to add project", error);
    }
  };

  return (
    <div className="min-h-full bg-gradient-to-r from-blue-300 via-blue-400 to-blue-300 p-8 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-6xl w-full">
        <h2 className="text-4xl font-semibold text-gray-800 mb-6 text-center">
          Add New Project
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 mb-2">
              Project Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter project title"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter project description"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="githubLink" className="block text-gray-700 mb-2">
              GitHub Link
            </label>
            <input
              type="url"
              id="githubLink"
              value={githublink}
              onChange={(e) => setGithubLink(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter project GitHub link"
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-700"
            >
              Add Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProjectForm;
