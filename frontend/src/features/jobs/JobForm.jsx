import { useState } from "react";
import { useNavigate } from "react-router-dom";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const JobPostForm = () => {
  const [jobDetails, setJobDetails] = useState({
    title: "",
    company: "",
    location: "",
    type: "",
    salary: "",
    techStack: "",
    perks: "",
    requirements: "",
    description: "",
    link: "",
  });

  const navigate = useNavigate();

  // Check if the user is allowed to access the form
  // if (userRole !== "alumni" && userRole !== "college") {
  //   return <div>You do not have permission to post a job.</div>;
  // }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobDetails({
      ...jobDetails,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/api/jobs/jobpost`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobDetails),
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to post job");
      }
      navigate("/placement");
    } catch (error) {
      console.error("Failed to post job", error);
    }
    navigate("/placement");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 p-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6 text-center">
          Post a Job
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-200">
                Job Title
              </label>
              <input
                type="text"
                name="title"
                value={jobDetails.title}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-200">
                Company
              </label>
              <input
                type="text"
                name="company"
                value={jobDetails.company}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-200">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={jobDetails.location}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-200">
                Job Type
              </label>
              <input
                type="text"
                name="type"
                value={jobDetails.type}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-200">
                Salary
              </label>
              <input
                type="text"
                name="salary"
                value={jobDetails.salary}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-200">
                Tech Stack (comma separated)
              </label>
              <input
                type="text"
                name="techStack"
                value={jobDetails.techStack}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-200">
                Perks
              </label>
              <input
                type="text"
                name="perks"
                value={jobDetails.perks}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-200">
                Requirements
              </label>
              <input
                type="text"
                name="requirements"
                value={jobDetails.requirements}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-200">
                Job Description
              </label>
              <textarea
                name="description"
                value={jobDetails.description}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-200">
                Apply Link
              </label>
              <input
                type="url"
                name="link"
                value={jobDetails.link}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>

            <div className="text-center mt-6">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-400"
              >
                Post Job
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobPostForm;