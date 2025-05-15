function MessageBubble({ sender, text }: { sender: string; text: string }) {
  const isUser = sender === "user";

  // Format text with line breaks
  const formatText = (content: string) => {
    return content.split("\n").map((paragraph, i) => (
      <span key={i}>
        {paragraph}
        <br />
      </span>
    ));
  };

  return (
    <div
      className={`d-flex mb-3 ${
        isUser ? "justify-content-end" : "justify-content-start"
      }`}
    >
      <div
        className={`p-3 rounded-4 text-white`}
        style={{
          maxWidth: "75%",
          whiteSpace: "pre-line",
          backgroundColor: isUser ? "#008080" : "#6c757d",
        }}
      >
        {formatText(text)}
      </div>
    </div>
  );
}

export default MessageBubble;
