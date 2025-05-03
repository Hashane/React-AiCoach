export const NewChat = ({ startNewChat }: { startNewChat: () => void }) => {
  return (
    <button
      type="button"
      className="btn btn-warning"
      onClick={startNewChat}
      style={{ width: "100%" }} // Make button full width
    >
      Start New Chat
    </button>
  );
};
