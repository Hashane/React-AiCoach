// Sidebar.tsx
import { useEffect, useState } from "react";
import api from "../services/axios";
import ConversationItem from "./ConversationItem";
import { NewChat } from "./NewChat";

function Sidebar({
  onSelect,
  activeId,
  startNewChat,
  refreshConversations,
}: {
  onSelect: (id: number) => void;
  activeId: number | null;
  startNewChat: () => void; // Function passed from Layout
  refreshConversations: boolean;
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
  }, [refreshConversations]);

  return (
    <div
      className="bg-secondary text-white p-3 border-end border-dark"
      style={{ width: "250px", minHeight: "100%" }}
    >
      <h5>Conversations</h5>
      {/* Add the NewChat button here */}
      <NewChat startNewChat={startNewChat} />

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
