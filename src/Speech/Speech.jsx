import React, { useEffect, useRef, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import { useSpeechSynthesis } from "react-speech-kit";

import { AnswerFromAi } from "../config/openai";

function Speech() {
  const [text, setText] = useState("");

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const { speak, voices } = useSpeechSynthesis({
    onEnd: () => {
      SpeechRecognition.startListening({ language: "en-us" });
    },
  });

  useEffect(() => {
    console.log("heyy");
    SpeechRecognition.startListening({ language: "en-us" });
  }, []);

  useEffect(() => {
    console.log(transcript);
  }, [transcript]);

  useEffect(() => {
    console.log(listening);
  }, [listening]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div>
      <p></p>
    </div>
  );
}

export default Speech;
