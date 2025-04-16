import { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function App() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello, how can I assist you?" },
  ]);

  const [userInput, setUserInput] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  });

  const handleSend = async () => {
    if (userInput.trim() === "") return;

    const newMessage = { sender: "user", text: userInput };
    setMessages((prev) => [...prev, newMessage]);

    setUserInput("");

    try {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqaGFzaGFuZSIsImV4cCI6MTc0NDg0NTA0MH0.TVlkYqxK9hRsQNhY_Nz14a5yMzB9mD6WLsk0JU3FNUs";
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

      const botMessage = {
        sender: "bot",
        text: response.data.reply,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error talking to backend:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Oops! Server error." },
      ]);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-white">
      <div
        className="card bg-dark text-white shadow-lg w-100"
        style={{ maxWidth: "600px", height: "80vh" }}
      >
        <div className="card-header bg-secondary text-white text-center fs-5 fw-semibold">
          💬 AI Coach
        </div>

        <div
          className="card-body overflow-auto"
          style={{ height: "100%", maxHeight: "calc(100% - 120px)" }}
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={`d-flex mb-3 ${
                message.sender === "user"
                  ? "justify-content-end"
                  : "justify-content-start"
              }`}
            >
              <div
                className={`p-3 rounded-4 ${
                  message.sender === "user"
                    ? "bg-success text-white"
                    : "bg-secondary text-white"
                }`}
                style={{ maxWidth: "75%" }}
              >
                {message.text}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        <div className="card-footer bg-dark border-top border-secondary d-flex gap-2">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="form-control bg-dark text-white border-secondary"
            placeholder="Type your message..."
          />
          <button onClick={handleSend} className="btn btn-outline-light">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
