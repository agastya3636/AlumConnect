import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { FaRobot } from "react-icons/fa";

const AppLayout = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
    setMessages([]);
    setInput("");
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSendMessage = () => {
    if (input.trim() === "") return;

    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);

    // Simulate ChatGPT response
    const botMessage = {
      sender: "bot",
      text: `This is a simulated response to: "${input}"`,
    };
    setMessages((prevMessages) => [...prevMessages, userMessage, botMessage]);
    setInput("");
  };

  return (
    <div className="grid applayout h-screen">
      <Header />
      <Sidebar />
      <main className="bg-blue-100 pt-2 px-2 pb-2 overflow-y-scroll relative">
        <Outlet />
        <button
          className="fixed bottom-10 right-10 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition duration-200"
          onClick={toggleChat}
        >
          <FaRobot className="text-2xl" />
        </button>
        {isChatOpen && (
          <div className="fixed bottom-20 right-10 bg-white p-6 rounded-lg shadow-lg w-80 border border-gray-300 flex flex-col max-h-96 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Chat Bot</h3>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={toggleChat}
              >
                ✖
              </button>
            </div>
            <div className="flex-1 overflow-y-auto mb-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`p-2 rounded-lg mb-2 ${
                    message.sender === "user"
                      ? "bg-blue-100 text-right"
                      : "bg-gray-100 text-left"
                  }`}
                >
                  {message.text}
                </div>
              ))}
            </div>
            <div className="flex">
              <input
                type="text"
                value={input}
                onChange={handleInputChange}
                className="flex-1 p-2 border rounded-l-lg"
                placeholder="Type your message..."
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600 transition duration-200"
              >
                Send
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AppLayout;
