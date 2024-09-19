import React from "react";
import ChatPage from "../features/alumnidirectory/ChatPage";

const Chat = ({ socket, username }) => {
  return (
    <div>
      <ChatPage socket={socket} username={username} />
    </div>
  );
};

export default Chat;
