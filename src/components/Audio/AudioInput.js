import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AudioAnalyser from './AudioAnalyser';

const AudioInput = ({ lang }) => {
  const [audio, setAudio] = useState(null);

  const getMicrophone = async () => {
    const microphone = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });
    setAudio(microphone);
  };

  useEffect(() => {
    if (!audio) {
      getMicrophone();
    }
    const cleanup = () => {
      if (audio) {
        audio.getTracks().forEach((track) => track.stop());
      }
    };

    return cleanup;
  }, [audio, setAudio]);

  return (
    <div className="audio-input">
      {audio ? <AudioAnalyser audio={audio} lang={lang} /> : ''}
    </div>
  );
};

AudioInput.propTypes = {
  lang: PropTypes.string.isRequired,
};

export default AudioInput;
