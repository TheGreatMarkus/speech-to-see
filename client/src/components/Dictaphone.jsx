import React from "react";
import PropTypes from "prop-types";
import SpeechRecognition from "react-speech-recognition";
import axios from "axios";

const serverBaseUrl = "http://localhost:1337";
let gTranscript = "";

const propTypes = {
  // Props injected by SpeechRecognition
  transcript: PropTypes.string,
  resetTranscript: PropTypes.func,
  startListening: PropTypes.func,
  stopListening: PropTypes.func,
  browserSupportsSpeechRecognition: PropTypes.bool,
  listening: PropTypes.bool
};

const Dictaphone = ({
  transcript,
  resetTranscript,
  startListening,
  stopListening,
  browserSupportsSpeechRecognition,
  listening,
  onQuery
}) => {
  function sendTranscript(transcript) {
    console.log(`Sending api call with transcript: ${transcript}`);
    let request = {
      speech: transcript
    };
    console.log(request);

    axios.post(`${serverBaseUrl}/api/voice-command`, request).then(response => {
      console.log(response);
      onQuery(response.data);
    });
  }

  if (!browserSupportsSpeechRecognition) {
    return null;
  }
  if (!listening && transcript !== "") {
    console.log("Calling endpoint");
    sendTranscript(transcript);
    resetTranscript();
  }

  return (
    <div>
      <div>
        <button onClick={startListening}>start</button>
        <button
          onClick={() => {
            stopListening();
          }}
        >
          stop
        </button>
        <button onClick={resetTranscript}>Reset</button>
      </div>
      <span>Transcript: {transcript}</span>
    </div>
  );
};

const options = {
  autoStart: false,
  continuous: false
};

Dictaphone.propTypes = propTypes;

export default SpeechRecognition(options)(Dictaphone);
