import React, { useEffect } from "react";
import useSpeechToText from "../../hooks/useSpeechToText";
import { useDispatch } from "react-redux";
import { SetText } from "../../redux/Translate/Translate.reducer";

function Listener({ recorder, lang_me, lang_other }) {
  const { text, startListening, stopListening } = useSpeechToText();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(SetText(text));
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
