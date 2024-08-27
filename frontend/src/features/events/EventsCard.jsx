import React, { useState } from "react";

const EventsCard = () => {
  // Dummy data for events
  const events = [
    {
      id: 1,
      name: "Tech Talk: Future of AI",
      date: "2023-10-01",
      description:
        "Join us for an insightful discussion on the future of artificial intelligence and its impact on various industries.",
      googleMeetLink: "https://meet.google.com/tech-talk-ai",
      author: "Dr. John Doe",
      keywords: ["AI", "Technology", "Future"],
    },
    {
      id: 2,
      name: "Web Development Workshop",
      date: "2023-11-15",
      description:
        "A hands-on workshop on modern web development practices, including React, Node.js, and more.",
      googleMeetLink: "https://meet.google.com/web-dev-workshop",
      author: "Jane Smith",
      keywords: ["Web Development", "React", "Node.js"],
    },
    {
      id: 3,
      name: "Cybersecurity Essentials",
      date: "2023-12-05",
      description:
        "Learn the essentials of cybersecurity and how to protect your digital assets in this comprehensive session.",
      googleMeetLink: "https://meet.google.com/cybersecurity-essentials",
      author: "Alice Johnson",
      keywords: ["Cybersecurity", "Security", "Essentials"],
    },
    {
      id: 4,
      name: "Data Science Bootcamp",
      date: "2023-10-20",
      description:
        "An intensive bootcamp covering the fundamentals of data science, including Python, R, and machine learning.",
      googleMeetLink: "https://meet.google.com/data-science-bootcamp",
      author: "Michael Brown",
      keywords: ["Data Science", "Python", "Machine Learning"],
    },
    {
      id: 5,
      name: "Cloud Computing Seminar",
      date: "2023-11-10",
      description:
        "Explore the world of cloud computing and learn about the latest trends and technologies in this seminar.",
      googleMeetLink: "https://meet.google.com/cloud-computing-seminar",
      author: "Emily Davis",
      keywords: ["Cloud Computing", "AWS", "Azure"],
    },
    {
      id: 6,
      name: "Blockchain Basics",
      date: "2023-12-01",
      description:
        "Understand the basics of blockchain technology and its applications in various industries.",
      googleMeetLink: "https://meet.google.com/blockchain-basics",
      author: "Robert Wilson",
      keywords: ["Blockchain", "Cryptocurrency", "Technology"],
    },
    {
      id: 7,
      name: "DevOps Practices",
      date: "2023-10-25",
      description:
        "Learn about the best practices in DevOps and how to implement them in your organization.",
      googleMeetLink: "https://meet.google.com/devops-practices",
      author: "Laura Martinez",
      keywords: ["DevOps", "CI/CD", "Automation"],
    },
    {
      id: 8,
      name: "Mobile App Development",
      date: "2023-11-05",
      description:
        "A comprehensive workshop on mobile app development using Flutter and React Native.",
      googleMeetLink: "https://meet.google.com/mobile-app-development",
      author: "James Anderson",
      keywords: ["Mobile Development", "Flutter", "React Native"],
    },
    {
      id: 9,
      name: "AI Ethics and Society",
      date: "2023-12-10",
      description:
        "Discuss the ethical implications of AI and its impact on society in this thought-provoking session.",
      googleMeetLink: "https://meet.google.com/ai-ethics-society",
      author: "Sophia Lee",
      keywords: ["AI", "Ethics", "Society"],
    },
    {
      id: 10,
      name: "Big Data Analytics",
      date: "2023-10-30",
      description:
        "Dive into the world of big data analytics and learn how to extract valuable insights from large datasets.",
      googleMeetLink: "https://meet.google.com/big-data-analytics",
      author: "David Clark",
      keywords: ["Big Data", "Analytics", "Hadoop"],
    },
    {
      id: 11,
      name: "Machine Learning in Healthcare",
      date: "2023-11-20",
      description:
        "Explore the applications of machine learning in healthcare and how it is transforming the industry.",
      googleMeetLink: "https://meet.google.com/ml-healthcare",
      author: "Olivia Martinez",
      keywords: ["Machine Learning", "Healthcare", "AI"],
    },
    {
      id: 12,
      name: "Quantum Computing 101",
      date: "2023-12-15",
      description:
        "An introductory session on quantum computing and its potential to revolutionize technology.",
      googleMeetLink: "https://meet.google.com/quantum-computing-101",
      author: "William Johnson",
      keywords: ["Quantum Computing", "Technology", "Future"],
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredEvents = events.filter(
    (event) =>
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.keywords.some((keyword) =>
        keyword.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-8">
      <div className="flex items-center justify-between w-full max-w-6xl mb-8">
        <h1 className="text-white text-3xl font-bold">Events</h1>
        <input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-2 px-4 pr-6 rounded-lg"
        />
      </div>
      <div className="w-full max-w-6xl">
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-3xl p-6 shadow-lg transform transition duration-500 hover:scale-105 min-h-[200px] flex flex-col"
              >
                <h2 className="text-white text-2xl font-bold mb-2">
                  {event.name}
                </h2>
                <p className="text-white text-sm mb-1">{event.date}</p>
                <p className="text-white text-sm mb-4">{event.description}</p>
                <p className="text-white text-sm mb-4">
                  Author: {event.author}
                </p>
                <p className="text-white text-sm mb-4">
                  Keywords: {event.keywords.join(", ")}
                </p>
                <a
                  href={event.googleMeetLink}
                  className="text-yellow-300 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Join Google Meet
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center w-full">
            <p className="text-white text-2xl font-bold">No match found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsCard;
