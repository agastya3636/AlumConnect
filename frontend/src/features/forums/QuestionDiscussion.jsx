import React, { useState, useEffect } from "react";
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
        const forum = forums[category].find((f) => f.id === parseInt(forumId));
        if (forum) {
          foundQuestion = forum.questions.find(
            (q) => q.id === parseInt(questionId)
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
    <div className="min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 p-8">
      {question ? (
        <>
          <h1 className="text-4xl font-bold text-center text-white mb-8">
            {question.title}
          </h1>
          <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
            <p className="text-gray-600">{question.description}</p>
            <p className="text-gray-600">
              By {question.author} on {question.date}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Messages
            </h2>
            {messages.length > 0 ? (
              messages.map((message, index) => (
                <div key={index} className="mb-4">
                  <p className="text-gray-600">{message.text}</p>
                  <p className="text-gray-600 text-sm">
                    By {message.author} on {message.date}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No messages yet.</p>
            )}
            <div className="mt-4">
              <textarea
                className="w-full p-2 border rounded"
                rows="4"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Add a message..."
              ></textarea>
              <button
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleAddMessage}
              >
                Add Message
              </button>
            </div>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-600">Loading question...</p>
      )}
    </div>
  );
};

export default QuestionDiscussion;
