function MessageBubble({ sender, text }: { sender: string; text: string }) {
  const isUser = sender === "user";
  return (
    <div
      className={`d-flex mb-3 ${
        isUser ? "justify-content-end" : "justify-content-start"
      }`}
    >
      <div
        className={`p-3 rounded-4 ${
          isUser ? "bg-success" : "bg-secondary"
        } text-white`}
        style={{ maxWidth: "75%" }}
      >
        {text}
      </div>
    </div>
  );
}

export default MessageBubble;
