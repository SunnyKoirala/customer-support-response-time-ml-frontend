import React, { useState } from "react";

function Chatbot() {
  const [userInput, setUserInput] = useState("");
  const [reply, setReply] = useState("");

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    try {
      const response = await fetch(
        "https://customer-support-response-time-ml.onrender.com/chat",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: userInput }),
        }
      );

      const data = await response.json();
      setReply(data.reply);
    } catch (error) {
      setReply("Server error. Please try again.");
    }
  };

  return (
    <div className="chatbot">
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Ask something..."
      />
      <button onClick={sendMessage}>Send</button>
      {reply && <p>{reply}</p>}
    </div>
  );
}

export default Chatbot;
