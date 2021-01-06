import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import { useGlobalContext } from 'global/context';
import PropTypes from 'prop-types';
import AudioVisualiser from './AudioVisualiser';

const AudioAnalyser = ({ audio }) => {
  const globalContext = useGlobalContext();
  const [karaokeState] = globalContext.karaoke;
  const { audioEnded, audioTime } = karaokeState;

  const [audioData, setAudioData] = useState(new Uint8Array(0));
  const [dataArray, setDataArray] = useState(new Uint8Array(0));
  const [, setRafId] = useState(null);

  const audioDataSave = useRef([]);

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
  }, [analyser, dataArray]);

  useEffect(() => {
    setRafId(requestAnimationFrame(tick));

    const cleanup = () => {
      setRafId(null);
      analyser.disconnect();
      source.disconnect();
      console.log('audio analyser cleanup');
    };

    return cleanup;
  }, [audio, analyser, source, tick]);

  useEffect(() => {
    audioDataSave.current.push(JSON.stringify({ audioTime, audioData }));
  }, [audioTime, audioData]);

  useEffect(() => {
    if (audioEnded) {
      console.log(audioDataSave.current);
    }
  }, [audioEnded]);

  return <AudioVisualiser audioData={audioData} />;
};

AudioAnalyser.propTypes = {
  audio: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default AudioAnalyser;
