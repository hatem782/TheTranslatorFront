import React, { useEffect, useState } from "react";
import useTextToSpeech from "../../hooks/useTextToSpeech";
import { generateText } from "../../config/openai";

function Talker({ recorder, lang_me, lang_other, text }) {
  const { StartTalking, StopTalking } = useTextToSpeech();
  const [is_first, setIsFirst] = useState(true);
  const [last_talk, setLastTalk] = useState(lang_me);
  const [next_talk, setNextTalk] = useState(lang_other);

  // useEffect(() => {
  //   StartTalking("hello hello hello hello hello", 81);
  // }, []);

  useEffect(() => {
    if (recorder === null && text !== "" && !is_first) {
      generateText({
        text: text,
        origin: last_talk.code,
        target: next_talk.code,
        callback: (text2) => {
          StartTalking(text2, next_talk.voice);
        },
      });
    } else if (recorder !== null) {
      StopTalking();
      setLastTalk(recorder === "me" ? lang_me : lang_other);
      setNextTalk(recorder === "me" ? lang_other : lang_me);
      setIsFirst(false);
    }
  }, [text, recorder]);

  return <div></div>;
}

export default Talker;
