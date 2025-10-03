import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { forums } from "../../utils/MockData";

const QuestionDiscussion = () => {
  const { forumId, questionId } = useParams();
  const [question, setQuestion] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // Fetch question details from the forums object based on forumId and questionId
    const fetchQuestion = () => {
      let foundQuestion = null;
      Object.keys(forums).forEach((category) => {
        const forum = forums[category].find(
          (f) => f.id === Number.parseInt(forumId)
        );
        if (forum) {
          foundQuestion = forum.questions.find(
            (q) => q.id === Number.parseInt(questionId)
          );
        }
      });

      if (foundQuestion) {
        setQuestion(foundQuestion);
        setMessages(foundQuestion.messages || []);
      }
    };

    fetchQuestion();
  }, [forumId, questionId]);

  const handleAddMessage = () => {
    if (newMessage.trim()) {
      const updatedMessages = [
        ...messages,
        {
          text: newMessage,
          author: "Current User",
          date: new Date().toLocaleString(),
        },
      ];
      setMessages(updatedMessages);
      setNewMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 p-8">
      {question ? (
        <>
          <h1 className="text-4xl font-bold text-center text-white mb-8">
            {question.title}
          </h1>
          <div className="bg-white dark:bg-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-6 mb-4">
            <p className="text-gray-600 dark:text-gray-300">
              {question.description}
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              By {question.author} on {question.date}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-6 mb-4">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
              Messages
            </h2>
            {messages.length > 0 ? (
              messages.map((message, index) => (
                <div key={index} className="mb-4">
                  <p className="text-gray-600 dark:text-gray-300">
                    {message.text}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    By {message.author} on {message.date}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-600 dark:text-gray-300">
                No messages yet.
              </p>
            )}
            <div className="mt-4">
              <textarea
                className="w-full p-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                rows="4"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Add a message..."
              ></textarea>
              <button
                className="mt-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
                onClick={handleAddMessage}
              >
                Add Message
              </button>
            </div>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-600 dark:text-gray-300">
          Loading question...
        </p>
      )}
    </div>
  );
};

export default QuestionDiscussion;