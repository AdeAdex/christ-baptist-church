"use client";

import React, { useState } from "react";

const LiveChat = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");

  const sendMessage = () => {
    if (input.trim()) {
      setMessages((prev) => [...prev, input]);
      setInput(""); // Clear input field after sending message
    }
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-xl font-semibold mb-2">Live Chat</h2>

      {/* Chat Messages Section */}
      <div className="flex-grow h-80 overflow-y-auto mb-4 space-y-2">
        {messages.map((message, index) => (
          <div key={index} className="bg-gray-700 p-2 rounded-md">
            {message}
          </div>
        ))}
      </div>

      {/* Chat Input Section */}
      <div className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow p-2 rounded-l-md bg-gray-700 text-white"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-md"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default LiveChat;
