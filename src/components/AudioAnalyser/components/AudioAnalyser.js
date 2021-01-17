import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useGlobalContext } from 'global/context';
import PropTypes from 'prop-types';
import { getScore } from 'utils/ktvQueries';
import AudioVisualiser from './AudioVisualiser';

const AudioAnalyser = ({ audio, songTitle }) => {
  const globalContext = useGlobalContext();
  const [karaokeState] = globalContext.karaoke;
  const { audioEnded, audioTime } = karaokeState;

  const [audioEnv, setAudioEnv] = useState({ analyser: null, source: null });
  const [audioData, setAudioData] = useState(new Uint8Array(0));
  const [dataArray, setDataArray] = useState(new Uint8Array(0));
  const [, setRafId] = useState(null);

  const audioDataSave = useRef([]);

  const tick = useCallback(() => {
    audioEnv.analyser.getByteTimeDomainData(dataArray);
    setAudioData(dataArray);
    setRafId(requestAnimationFrame(tick));
  }, [audioEnv.analyser, dataArray]);

  // Handle analyser and source setup
  useEffect(() => {
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();

    const analyserObj = audioContext.createAnalyser();
    analyserObj.fftSize = 256;

    setDataArray(new Uint8Array(analyserObj.frequencyBinCount));

    const sourceObj = audioContext.createMediaStreamSource(audio);
    sourceObj.connect(analyserObj);

    console.log(analyserObj, sourceObj);
    setAudioEnv({ analyser: analyserObj, source: sourceObj });
  }, [audio]);

  // Handle on each audio data
  useEffect(() => {
    audioDataSave.current.push({ audioTime, audioData: Array.from(audioData) });
  }, [audioTime, audioData]);

  // Handle when audio has ended
  useEffect(() => {
    if (audioEnded) {
      const getPitchScore = async () => {
        const score = await getScore(
          songTitle,
          JSON.stringify(audioDataSave.current),
        );
        console.log(score);
      };
      getPitchScore();
    }
  }, [audioEnded, songTitle]);

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
    </>
  );
};

AudioAnalyser.propTypes = {
  audio: PropTypes.objectOf(PropTypes.object).isRequired,
  songTitle: PropTypes.string.isRequired,
};

export default AudioAnalyser;
