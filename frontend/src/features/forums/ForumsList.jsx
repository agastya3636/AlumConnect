import React from "react";

const ForumsList = () => {
  // Updated forums data with more realistic examples
  const forums = [
    {
      id: 1,
      title: "Web Development",
      description:
        "Discuss the latest trends and technologies in web development.",
    },
    {
      id: 2,
      title: "Data Science",
      description:
        "Share insights and ask questions about data analysis, machine learning, and AI.",
    },
    {
      id: 3,
      title: "Mobile Development",
      description: "Talk about mobile app development for iOS and Android.",
    },
    {
      id: 4,
      title: "DevOps",
      description: "Discuss CI/CD, automation, and other DevOps practices.",
    },
    {
      id: 5,
      title: "Cybersecurity",
      description:
        "Share knowledge and best practices for securing applications and data.",
    },
    {
      id: 6,
      title: "Cloud Computing",
      description:
        "Discuss cloud services, architecture, and deployment strategies.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Forums
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {forums.map((forum) => (
          <div key={forum.id} className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              {forum.title}
            </h2>
            <p className="text-gray-600">{forum.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForumsList;
