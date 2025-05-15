import React, { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

type SpeechInputProps = {
  onTranscriptChange?: (text: string) => void;
};

const SpeechInput: React.FC<SpeechInputProps> = ({ onTranscriptChange }) => {
  const [isListening, setIsListening] = useState(false);
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  const toggleListening = () => {
    if (isListening) {
      SpeechRecognition.stopListening();
      resetTranscript();
    } else {
      SpeechRecognition.startListening({ continuous: true });
    }
    setIsListening((prev) => !prev);
  };

  useEffect(() => {
    if (onTranscriptChange) {
      onTranscriptChange(transcript);
    }
  }, [transcript, onTranscriptChange]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Your browser does not support speech recognition.</span>;
  }

  return (
    <button
      onClick={toggleListening}
      className={`mic-button no-border ${isListening ? "listening" : ""}`}
    >
      <i className="fas fa-microphone"></i>
    </button>
  );
};

export default SpeechInput;
