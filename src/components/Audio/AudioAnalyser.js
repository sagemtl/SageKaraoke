import React, { useState, useMemo, useEffect, useCallback } from 'react';
// import { useGlobalContext } from 'global/context';
import PropTypes from 'prop-types';
import AudioVisualiser from './AudioVisualiser';
import getScore from '../../utils/score';

const AudioAnalyser = ({ audio, lang }) => {
  // const globalContext = useGlobalContext();
  // const [karaokeState] = globalContext.karaoke;

  const [audioData, setAudioData] = useState(new Uint8Array(0));
  const [dataArray, setDataArray] = useState(new Uint8Array(0));
  const [, setRafId] = useState(null);
  // const [audioDataList, setAudioDataList] = useState({});

  const recognition = useMemo(() => {
    const recognitionObj = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition ||
      window.mozSpeechRecognition ||
      window.msSpeechRecognition)();

    recognitionObj.continuous = true;
    recognitionObj.interimResults = true;
    recognitionObj.lang = lang;

    recognitionObj.start();
    console.log(recognitionObj);

    recognitionObj.onresult = (event) => {
      const result = event.results[event.results.length - 1];
      if (result.isFinal) {
        console.log(result[0].transcript);
        const score = getScore(result[0].transcript);
        console.log(score);
      }
    };

    return recognitionObj;
  }, [lang]);

  const [analyser, source] = useMemo(() => {
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();

    const analyserObj = audioContext.createAnalyser();
    analyserObj.fftSize = 256;

    setDataArray(new Uint8Array(analyserObj.frequencyBinCount));

    const sourceObj = audioContext.createMediaStreamSource(audio);
    sourceObj.connect(analyserObj);

    console.log(analyserObj, sourceObj);
    return [analyserObj, sourceObj];
  }, [audio]);

  const tick = useCallback(() => {
    analyser.getByteTimeDomainData(dataArray);
    setAudioData(dataArray);

    setRafId(requestAnimationFrame(tick));
  }, [analyser, dataArray, setRafId]);

  useEffect(() => {
    setRafId(requestAnimationFrame(tick));

    const cleanup = () => {
      setRafId(null);
      analyser.disconnect();
      source.disconnect();
      recognition.stop();
      console.log('audio analyser cleanup');
    };

    return cleanup;
  }, [audio, analyser, recognition, source, tick, setRafId]);

  // useEffect(
  //   () => () => {
  //     console.log(karaokeState);
  //   },
  //   [],
  // );

  return <AudioVisualiser audioData={audioData} />;
};

AudioAnalyser.propTypes = {
  audio: PropTypes.objectOf(PropTypes.object).isRequired,
  lang: PropTypes.string.isRequired,
};

export default AudioAnalyser;
