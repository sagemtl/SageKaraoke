import React, { useState } from 'react';
import AudioAnalyser from './AudioAnalyser';

const AudioInput = () => {
  const [audio, setAudio] = useState(null);

  const getMicrophone = async () => {
    const microphone = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });
    setAudio(microphone);
  };

  const stopMicrophone = () => {
    audio.getTracks().forEach((track) => track.stop());
    setAudio(null);
  };

  const toggleMicrophone = () => {
    if (audio) {
      stopMicrophone();
    } else {
      getMicrophone();
    }
  };

  return (
    <div className="audio-input">
      {audio ? <AudioAnalyser audio={audio} /> : ''}
      <button type="button" onClick={toggleMicrophone}>
        {audio ? 'Stop microphone' : 'Get microphone input'}
      </button>
    </div>
  );
};

export default AudioInput;
