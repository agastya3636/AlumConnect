import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ChatPage = ({ socket, username }) => {
    const { roomName } = useParams();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Fetch chat history when component mounts
        socket.on('chat_history', (history) => {
            setMessages(history);
        });

        // Listen for new messages
        socket.on('receive_message', (data) => {
            setMessages((prevState) => [
                ...prevState,
                {
                    username: data.sender,
                    message: data.message,
                    _createdtime: data._createdtime, // Corrected variable name
                },
            ]);
        });

        return () => {
            // Clean up listeners on component unmount
            socket.off('chat_history');
            socket.off('receive_message');
        };
    }, [socket]);

    const sendMessage = () => {
        const _createdtime_ = Date.now();
        if (message.trim()) {
            socket.emit('send_message', { room: roomName, message, username, _createdtime_ });
            setMessage(''); // Clear input after sending
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            {/* Chat Header */}
            <div className="bg-blue-600 text-white p-4 flex items-center">
                <h2 className="text-lg font-semibold">Chat Room: {roomName}</h2>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex ${msg.username === username ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`rounded-lg p-2 max-w-xs text-sm ${
                                msg.username === username
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-300 text-black'
                            }`}
                        >
                            <p className="font-semibold">{msg.username}</p>
                            <p>{msg.message}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Message Input */}
            <div className="bg-white p-4 flex items-center space-x-2">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message"
                    className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={sendMessage}
                    className="bg-blue-600 text-white rounded-lg p-2 hover:bg-blue-700 transition"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatPage;
