import React from "react";
import "./Chat.css";

function Chat() {
  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="message support">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <audio controls src="#" />
        </div>
      </div>

      <div className="chat-input">
        <input type="text" placeholder="Digite sua mensagem..." />
        <button>➤</button>
      </div>
    </div>
  );
}

export default Chat;
