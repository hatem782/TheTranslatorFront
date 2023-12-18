import { useSpeechSynthesis } from "react-speech-kit";

function useTextToSpeech() {
  const { speak, voices } = useSpeechSynthesis({});

  const Speak = (text, voice) => {
    speak({
      text: text,
      pitch: 2,
      voice: voices[voice],
    });
  };

  const StartTalking = (text, voice) => {
    Speak(text, voice);
  };

  const StopTalking = () => {
    Speak("", 0);
  };

  return { StartTalking, StopTalking };
}

export default useTextToSpeech;
