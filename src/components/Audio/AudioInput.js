import React, { useState } from 'react';
import AudioAnalyser from './AudioAnalyser';

const AudioInput = () => {
  const [audio, setAudio] = useState(null);
  const [lang, setLang] = useState('en-US');

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

  const handleChange = (event) => {
    console.log('set language to: ', event.target.value);
    setLang(event.target.value);
  };

  return (
    <div className="audio-input">
      {audio ? <AudioAnalyser audio={audio} lang={lang} /> : ''}
      <button type="button" onClick={toggleMicrophone}>
        {audio ? 'Stop microphone' : 'Get microphone input'}
      </button>
      <select value={lang} onChange={handleChange}>
        <option value="en-US">English</option>
        <option value="zh-CN">Mandarin</option>
        <option value="fr">French</option>
      </select>
    </div>
  );
};

export default AudioInput;
