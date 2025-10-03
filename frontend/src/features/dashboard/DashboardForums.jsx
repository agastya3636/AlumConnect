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
  return (
    <div className="bg-white rounded-lg shadow-lg p-3 sm:p-4 md:p-6 h-full">
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
        Forums
      </h2>
      <div className="space-y-3 sm:space-y-4">
        {forumPosts.map((post) => (
          <div key={post.id} className="border-b pb-3 sm:pb-4 last:border-b-0">
            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 break-words">
              {post.title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              by {post.author} on {post.date}
            </p>
            <p className="text-xs sm:text-sm md:text-base text-gray-600 mt-2 line-clamp-3">
              {post.content}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-3 sm:mt-4">
        <Link
          to="/discussionforums"
          className="text-blue-500 hover:underline text-sm md:text-base"
        >
          View Full Forum
        </Link>
      </div>
    </div>
  );
};

export default DashboardForums;