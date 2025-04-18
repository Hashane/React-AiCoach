import { useEffect, useState } from "react";
import api from "../services/axios";
import ConversationItem from "./ConversationItem";

type Conversation = {
  id: number;
};

function Sidebar({
  onSelect,
  activeId,
}: {
  onSelect: (id: number) => void;
  activeId: number | null;
}) {
  const [conversations, setConversations] = useState<
    { id: number; title: string }[]
  >([]);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await api.get("/chatbot/conversations");
        setConversations(res.data);
      } catch (err) {
        console.error("Failed to fetch conversations", err);
      }
    };

    fetchConversations();
  }, []);

  return (
    <div
      className="bg-secondary text-white p-3 border-end border-dark"
      style={{ width: "250px", minHeight: "100%" }}
    >
      <h5>Conversations</h5>
      <ul className="list-unstyled">
        {conversations.map((conv) => (
          <ConversationItem
            key={conv.id}
            title={conv.title}
            active={conv.id === activeId}
            onClick={() => onSelect(conv.id)}
          />
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
