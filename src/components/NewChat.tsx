import React from "react";

export const NewChat = ({
  setMessages,
}: {
  setMessages: React.Dispatch<React.SetStateAction<any[]>>;
  setConversationId: React.Dispatch<React.SetStateAction<number | null>>;
}) => {
  const startNewChat = () => {
    // Clear messages and reset the conversation ID
    setMessages([]); // Clear messages

    localStorage.removeItem("conversationId"); // Clear stored conversation ID
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-warning"
        onClick={startNewChat} // Fix: Changed onChange to onClick
      >
        Start New Chat
      </button>
    </>
  );
};
