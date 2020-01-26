import React from "react";
import PropTypes from "prop-types";
import SpeechRecognition from "react-speech-recognition";

const propTypes = {
  // Props injected by SpeechRecognition
  transcript: PropTypes.string,
  resetTranscript: PropTypes.func,
  startListening: PropTypes.func,
  stopListening: PropTypes.func,
  browserSupportsSpeechRecognition: PropTypes.bool
};

const Dictaphone = ({
  transcript,
  resetTranscript,
  startListening,
  stopListening,
  browserSupportsSpeechRecognition
}) => {
  if (!browserSupportsSpeechRecognition) {
    return null;
  }



  return (
    <div>
      <button onClick={startListening}>start</button>
      <button onClick={stopListening}>stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <span>{transcript}</span>
    </div>
  );
};

const options = {
    autoStart: false
  }

Dictaphone.propTypes = propTypes;

export default SpeechRecognition(options)(Dictaphone);