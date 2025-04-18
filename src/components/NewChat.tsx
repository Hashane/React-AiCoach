export const NewChat = ({ startNewChat }: { startNewChat: () => void }) => {
  return (
    <>
      <button type="button" className="btn btn-warning" onClick={startNewChat}>
        Start New Chat
      </button>
    </>
  );
};
