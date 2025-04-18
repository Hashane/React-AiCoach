import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ChatWindow from "./ChatWindow";
import api from "../services/axios";
import axios, { AxiosError } from "axios";

function App() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello, how can I assist you?" },
  ]);
  const [userInput, setUserInput] = useState("");
  const [conversationId, setConversationId] = useState<number | null>(null);

  // Load conversation ID on mount
  useEffect(() => {
    const savedId = localStorage.getItem("conversationId");
    if (savedId) {
      const id = parseInt(savedId, 10);
      if (!isNaN(id)) {
        setConversationId(id);

        // Load previous messages
        api
          .get(`chatbot/conversation/${id}`)
          .then((res) => {
            setMessages(res.data);
          })
          .catch((err) => {
            console.error("Failed to load messages", err);
          });
      }
    }
  }, []);

  const handleSend = async () => {
    if (!userInput.trim()) return;

    const newMessage = { sender: "user", text: userInput };
    setMessages((prev) => [...prev, newMessage]);
    setUserInput("");

    try {
      const response = await api.post("/chatbot/chat", {
        text: userInput,
        conversation_id: conversationId ?? undefined,
      });

      const botMessage = { sender: "bot", text: response.data.reply };
      setMessages((prev) => [...prev, botMessage]);

      if (!conversationId && response.data.conversation_id) {
        const newId = response.data.conversation_id;
        setConversationId(newId);
        localStorage.setItem("conversationId", String(newId));
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error("Backend error:", err.response?.data || err.message);
      } else {
        console.error("Unexpected error:", err);
      }
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
