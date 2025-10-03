import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/project/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch project" + response);
        }
        const data = await response.json();
        setProject(data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) {
    return <p className="text-gray-600">Loading project...</p>;
  }
  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  if (!project) {
    return <div>Project not found</div>;
  }
  console.log(project);
  return (
    <div className="min-h-full bg-gradient-to-r from-blue-200 via-blue-500 to-purple-600 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 p-8 flex items-center justify-center">
      <div className="bg-white dark:bg-slate-900/60 dark:border dark:border-slate-700 dark:shadow-none rounded-lg shadow-lg p-6 max-w-4xl w-full">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-slate-100 mb-6 text-center">
          {project.title}
        </h2>
        <p className="text-gray-600 dark:text-slate-300 mb-4">
          {project.description}
        </p>
        <a
          href={project.githublink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 dark:text-blue-400 hover:underline"
        >
          View on GitHub
        </a>
        <div className="mt-4">
          <Link
            to="/opensource"
            className="text-blue-500 dark:text-blue-400 hover:underline"
          >
            Back to Projects
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;