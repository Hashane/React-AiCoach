// Chat.tsx
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ChatWindow from "./ChatWindow";
import api from "../services/axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Chat({
  conversationId,
  setConversationId,
  messages,
  setMessages,
  userName,
  setRefreshConversations,
}: {
  conversationId: number | null;
  setConversationId: (id: number) => void;
  setMessages: React.Dispatch<React.SetStateAction<any[]>>;
  messages: any[];
  userName: string;
  setRefreshConversations: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (conversationId) {
      api
        .get(`chatbot/conversation/${conversationId}`)
        .then((res) => {
          setMessages(res.data);
        })
        .catch((err) => {
          console.error("Failed to load messages", err);
        });
    } else {
      setMessages([
        {
          sender: "bot",
          text: `Hello, ${userName}! How can I assist you today?`,
        },
      ]);
    }
  }, [conversationId, setMessages, userName]);

  const handleSend = async () => {
    if (!userInput.trim()) return;

    const newMessage = { sender: "user", text: userInput };
    setMessages((prev) => [...prev, newMessage]);
    setUserInput("");

    try {
      setLoading(true);

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
        setRefreshConversations((prev) => !prev);
      }
    } catch (err) {
      console.error("Error sending message", err);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Oops! Server error." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center h-100 bg-dark text-white"
      style={{ minHeight: "100vh" }}
    >
      <div
        className="card bg-dark text-white shadow-lg w-100"
        style={{
          maxWidth: "1000px",
          height: "90vh",
        }}
      >
        <div
          className="card-header text-center fs-5 fw-semibold d-flex align-items-center justify-content-center gap-2"
          style={{
            backgroundColor: "#1f2937",
            color: "#fbbf24",
            boxShadow: "inset 0 -2px 4px rgba(251, 191, 36, 0.4)",
          }}
        >
          <i className="fas fa-robot"></i> AI Coach
        </div>

        {loading ? (
          <div className="">
            <div className="progress">
              <div
                className="progress-bar progress-bar-striped progress-bar-animated bg-info"
                role="progressbar"
                style={{ width: "100%" }}
              ></div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
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

export default Chat;
