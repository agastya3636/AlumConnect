import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const forumPosts = [
  {
    id: 1,
    title: "How to learn React?",
    author: "John Doe",
    date: "2023-10-01",
    content:
      "I'm new to React and looking for resources to get started. Any recommendations?",
  },
  {
    id: 2,
    title: "Best practices for state management",
    author: "Jane Smith",
    date: "2023-10-02",
    content:
      "What are some best practices for managing state in a large React application?",
  },
  {
    id: 3,
    title: "React vs Angular",
    author: "Alice Johnson",
    date: "2023-10-03",
    content:
      "Can someone explain the key differences between React and Angular?",
  },
];

const DashboardForums = () => {

  // const [forumPosts, setforumPosts] = useEffect([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchforumPosts = async () => {
  //     try {
  //       const response = await fetch("http://127.0.0.1:8000/events/?limit=2");
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch forumPosts");
  //       }
  //       const data = await response.json();
  //       setforumPosts(data.forumPosts);
  //     } catch (error) {
  //       setError(error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchforumPosts();  
  // }, []);


  return (
    <div className="bg-white rounded-lg shadow-lg p-6 h-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Forums</h2>
      <div className="space-y-4">
        {forumPosts.map((post) => (
          <div key={post.id} className="border-b pb-4">
            <h3 className="text-xl font-semibold text-gray-800">
              {post.title}
            </h3>
            <p className="text-sm text-gray-600">
              by {post.author} on {post.date}
            </p>
            <p className="text-gray-600 mt-2">{post.content}</p>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <Link to="/discussionforums" className="text-blue-500 hover:underline">
          View Full Forum
        </Link>
      </div>
    </div>
  );
};

export default DashboardForums;
