import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { forums } from "../../utils/MockData";

const ForumQuestions = () => {
  const { forumId } = useParams();
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // Fetch questions from the forums object based on forumId
    const fetchQuestions = () => {
      let foundForum = null;
      Object.keys(forums).forEach((category) => {
        const forum = forums[category].find((f) => f.id === parseInt(forumId));
        if (forum) {
          foundForum = forum;
        }
      });

      if (foundForum) {
        setQuestions(foundForum.questions);
      }
    };

    fetchQuestions();
  }, [forumId]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 p-8">
      <h1 className="text-4xl font-bold text-center text-white mb-8">
        Forum Questions
      </h1>
      {questions.length > 0 ? (
        questions.map((question) => (
          <NavLink
            key={question.id}
            to={`/discussionforums/${forumId}/questions/${question.id}`}
            className="bg-white rounded-lg shadow-lg p-6 mb-4 block"
          >
            <h3 className="text-2xl font-semibold text-gray-800">
              {question.title}
            </h3>
            <p className="text-gray-600">{question.description}</p>
            <p className="text-gray-600">
              By {question.author} on {question.date}
            </p>
          </NavLink>
        ))
      ) : (
        <p className="text-center text-gray-600">
          No questions available for this forum.
        </p>
      )}
    </div>
  );
};

export default ForumQuestions;
