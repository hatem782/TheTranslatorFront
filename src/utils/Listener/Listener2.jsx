import React, { useEffect } from "react";
import useSpeechToText from "../../hooks/useSpeechToText";

function Listener({ recorder, lang_me, lang_other, SetText }) {
  const { text, startListening, stopListening } = useSpeechToText();

  useEffect(() => {
    if (text.length > 5) {
      console.log(text);
      SetText(text);
    }
  }, [text]);

  useEffect(() => {
    if (recorder === "me") {
      startListening(lang_me.code);
    }
    if (recorder === "other") {
      startListening(lang_other.code);
    }
    if (recorder === null) {
      stopListening();
    }
  }, [recorder]);

  return (
    <div>
      <span>{text}</span>
    </div>
  );
}

export default Listener;
