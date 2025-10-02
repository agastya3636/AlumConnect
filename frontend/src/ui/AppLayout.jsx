import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { FaRobot } from "react-icons/fa";

const AppLayout = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
    setMessages([]);
    setInput("");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSendMessage = () => {
    if (input.trim() === "") return;

    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);

    const botMessage = {
      sender: "bot",
      text: `This is a simulated response to: "${input}"`,
    };
    setMessages((prevMessages) => [...prevMessages, userMessage, botMessage]);
    setInput("");
  };

  return (
    <div className="applayout">
      <Sidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
      <Header onMenuToggle={toggleMobileMenu} />
      <main className="bg-blue-100 p-4 md:p-6 overflow-y-auto relative">
        <Outlet />
        <button
          className="fixed bottom-6 right-6 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-all duration-200 z-30 hover:scale-110"
          onClick={toggleChat}
          aria-label="Open chat"
        >
          <FaRobot className="text-2xl" />
        </button>
        {isChatOpen && (
          <div className="fixed bottom-24 right-6 bg-white rounded-lg shadow-2xl w-[calc(100vw-3rem)] max-w-md border border-gray-200 flex flex-col max-h-[32rem] z-30">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold">Chat Bot</h3>
              <button
                className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded p-1 transition-colors"
                onClick={toggleChat}
                aria-label="Close chat"
              >
                ✖
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {messages.length === 0 ? (
                <p className="text-gray-400 text-center py-8">
                  Start a conversation...
                </p>
              ) : (
                messages.map((message, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg ${
                      message.sender === "user"
                        ? "bg-blue-500 text-white ml-auto max-w-[80%]"
                        : "bg-gray-100 text-gray-800 mr-auto max-w-[80%]"
                    }`}
                  >
                    {message.text}
                  </div>
                ))
              )}
            </div>
            <div className="flex gap-2 p-4 border-t border-gray-200">
              <input
                type="text"
                value={input}
                onChange={handleInputChange}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type your message..."
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium"
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