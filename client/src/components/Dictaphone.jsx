import React from "react";
import PropTypes from "prop-types";
import SpeechRecognition from "react-speech-recognition";



const axios = require('axios');
const instance = axios.create({baseURL: 'http://localhost:1337'})


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
  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  if(!listening)
  {
    instance.post('/api/get-voice-commands',
    {
      speech: transcript
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
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