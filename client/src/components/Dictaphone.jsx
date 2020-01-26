import React from "react";
import PropTypes from "prop-types";
import SpeechRecognition from "react-speech-recognition";

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
  listening
}) => {
  gTranscript = transcript;
  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  return (
    <div>
      <div>
        <button onClick={startListening}>start</button>
        <button onClick={() => { stopListening(); resetTranscript(); sendTranscript() }}>stop</button>
        <button onClick={resetTranscript}>Reset</button>
      </div>
      <span>Transcript: {transcript}</span>
    </div>
  );
};

function sendTranscript() {
  console.log(`Sending api call with transcript: ${gTranscript}`);
  let request = {
    "speech": gTranscript
  }
  console.log(request);

  fetch(`${serverBaseUrl}/api/voice-command`, {
    method: 'POST',
    body: JSON.stringify(request)
  }).then(response => {
    return response.json();
  }).then(jsonRes => {
    console.log(jsonRes);
  }).catch(err => {
    console.log('Error', err);
  });
}


const options = {
  autoStart: false,
  continuous: false
}

Dictaphone.propTypes = propTypes;

export default SpeechRecognition(options)(Dictaphone);