import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ChatPage = ({ socket, username }) => {
    const { roomName } = useParams();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {

        socket.on('chat_history', (history) => {
            setMessages(history);
        });

        socket.on('receive_message', (data) => {
            console.log(data);
            setMessages((state) => [...state,{
                username: data.sender,
                message: data.message,
                __createdtime__: data.__createdtime__
            }]);
        });

        return () => {
            socket.off('chat_history');
            socket.off('receive_message');
        };
    }, [socket]);

    const sendMessage = () => {
        const __createdtime__ = Date.now();
        socket.emit('send_message', { room: roomName, message, username, __createdtime__ });
        setMessage('');
    }
    


    return (
        <div>
            <h2>Chat Room: {roomName}</h2>
            <div>
                {messages.map((msg, index) => (
                    <p key={index}><strong>{msg.username}:</strong> {msg.message}</p>
                ))}
            </div>
            <input 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default ChatPage;
