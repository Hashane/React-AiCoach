import { useEffect, useRef, useState } from "react";
import MessageBubble from "./MessageBubble";
import SpeechInput from "./SpeechInput";

type Props = {
  messages: { sender: string; text: string }[];
  userInput: string;
  onChange: (val: string) => void;
  onSend: () => void;
};

function ChatWindow({ messages, userInput, onChange, onSend }: Props) {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [speechText, setSpeechText] = useState("");

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (speechText) {
      onChange(speechText);
    }
  }, [speechText]);

  return (
    <>
      <div
        className="card-body overflow-auto"
        style={{ height: "100%", maxHeight: "calc(100% - 120px)" }}
      >
        {messages.map((msg, idx) => (
          <MessageBubble key={idx} sender={msg.sender} text={msg.text} />
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="card-footer bg-dark border-top border-secondary d-flex gap-2">
        <input
          type="text"
          value={userInput}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSend()}
          className="form-control bg-dark text-white border-secondary"
          placeholder="Type your message..."
        />
        <button onClick={onSend} className="btn btn-outline-light">
          Send
        </button>
        <SpeechInput
          onTranscriptChange={(text) => setSpeechText(text)}
          autoStart={false}
        />
      </div>
    </>
  );
}

export default ChatWindow;
