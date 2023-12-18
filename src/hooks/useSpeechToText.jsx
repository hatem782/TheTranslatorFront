import React, { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

function useSpeechToText() {
  const [text, setText] = useState("");
  const [temp_text, setTempText] = useState("");
  const [is_listening, setIsListening] = useState(false);
  const [lang, setLang] = useState("en-us");

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition({});

  // HERE WE MAKE THE LISTENER
  const Listen = (lng = null) => {
    SpeechRecognition.startListening({ language: lng ? lng : lang });
  };

  useEffect(() => {
    console.log(lang);
  }, [lang]);

  // HERE WE START THE LISTENER
  const startListening = (lng) => {
    setLang(lng);
    Listen(lng);
    setText("");
    setTempText("");
    setIsListening(true);
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
    setIsListening(false);
  };

  // HERE WE RESET THE LISTENER
  useEffect(() => {
    // here user finished a parol , we reactivate listening
    if (!listening && is_listening) {
      Listen();
      setTempText(temp_text + " " + transcript);
    }
  }, [listening, transcript, is_listening]);

  useEffect(() => {
    setText(temp_text + " " + transcript);
  }, [transcript, temp_text]);

  return {
    text,
    startListening,
    stopListening,
  };
}

export default useSpeechToText;
