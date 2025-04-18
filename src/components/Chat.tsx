import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import ChatWindow from "./ChatWindow";

function App() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello, how can I assist you nigga?" },
  ]);
  const [userInput, setUserInput] = useState("");

  const handleSend = async () => {
    if (!userInput.trim()) return;

    const newMessage = { sender: "user", text: userInput };
    setMessages((prev) => [...prev, newMessage]);
    setUserInput("");

    try {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqaGFzaGFuZSIsImV4cCI6MTc0NDkzNjUzOCwidHlwZSI6ImFjY2VzcyJ9.qO3Mw7GCL4ilO9Nc29TKLaQUzk6IaMgwcqgiZpsrTy8";
      const response = await axios.post(
        "http://127.0.0.1:8000/chatbot/chat",
        { text: userInput },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const botMessage = { sender: "bot", text: response.data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("Backend error:", err);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Oops! Server error." },
      ]);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center h-100 bg-dark text-white">
      <div
        className="card bg-dark text-white shadow-lg w-100"
        style={{ maxWidth: "600px", height: "80vh" }}
      >
        <div className="card-header bg-secondary text-white text-center fs-5 fw-semibold">
          💬 AI Coach
        </div>
        <ChatWindow
          messages={messages}
          userInput={userInput}
          onChange={setUserInput}
          onSend={handleSend}
        />
      </div>
    </div>
  );
}

export default App;
