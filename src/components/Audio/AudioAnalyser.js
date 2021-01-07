import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useGlobalContext } from 'global/context';
import PropTypes from 'prop-types';
import vocals from 'assets/yue-liang-dai-biao-wo-de-xin_vocals.mp3';
import AudioVisualiser from './AudioVisualiser';

const AudioAnalyser = ({ audio }) => {
  const globalContext = useGlobalContext();
  const [karaokeState] = globalContext.karaoke;
  const { audioEnded, audioTime } = karaokeState;

  const [audioEnv, setAudioEnv] = useState({ analyser: null, source: null });
  const [audioData, setAudioData] = useState(new Uint8Array(0));
  const [dataArray, setDataArray] = useState(new Uint8Array(0));
  const [, setRafId] = useState(null);

  const audioDataSave = useRef([]);
  const audioRef = useRef(null);

  const tick = useCallback(() => {
    audioEnv.analyser.getByteTimeDomainData(dataArray);
    setAudioData(dataArray);
    setRafId(requestAnimationFrame(tick));
  }, [audioEnv.analyser, dataArray]);

  // Handle analyser and source setup
  useEffect(() => {
    console.log(audioRef);
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();

    const analyserObj = audioContext.createAnalyser();
    analyserObj.fftSize = 256;

    setDataArray(new Uint8Array(analyserObj.frequencyBinCount));

    // const sourceObj = audioContext.createMediaStreamSource(audio);
    const sourceObj = audioContext.createMediaElementSource(audioRef.current);
    sourceObj.connect(analyserObj);

    console.log(analyserObj, sourceObj);
    setAudioEnv({ analyser: analyserObj, source: sourceObj });
  }, [audio]);

  // Handle on each audio data
  useEffect(() => {
    audioDataSave.current.push(JSON.stringify({ audioTime, audioData }));
  }, [audioTime, audioData]);

  // Handle when audio has ended
  useEffect(() => {
    if (audioEnded) {
      console.log(audioDataSave.current);
    }
  }, [audioEnded]);

  // Handle analyser and source cleanup
  useEffect(() => {
    if (audioEnv.analyser) {
      setRafId(requestAnimationFrame(tick));
    }
    const cleanup = () => {
      setRafId(null);
      if (audioEnv.analyser) {
        audioEnv.analyser.disconnect();
        console.log('audio analyser cleanup');
      }
      if (audioEnv.source) {
        audioEnv.source.disconnect();
        console.log('audio source cleanup');
      }
    };

    return cleanup;
  }, [audioEnv.analyser, audioEnv.source, tick]);

  return (
    <>
      <AudioVisualiser audioData={audioData} />
      <audio ref={audioRef} src={vocals} autoPlay controls />
    </>
  );
};

AudioAnalyser.propTypes = {
  audio: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default AudioAnalyser;
