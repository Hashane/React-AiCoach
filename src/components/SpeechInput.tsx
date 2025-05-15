import React, { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

type SpeechInputProps = {
  onTranscriptChange?: (text: string) => void;
  autoStart?: boolean;
  showControls?: boolean;
};

const SpeechInput: React.FC<SpeechInputProps> = ({
  onTranscriptChange,
  autoStart = false,
  showControls = true,
}) => {
  const [isListening, setIsListening] = useState(false);

  const toggleListening = () => {
    if (isListening) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening({ continuous: true });
    }
    setIsListening(!isListening);
  };

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    if (autoStart) {
      SpeechRecognition.startListening({ continuous: true });
    }
  }, [autoStart]);

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
