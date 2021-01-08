import { useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useGlobalContext } from 'global/context';
import getScore from 'utils/score';

const AudioRecogniser = ({ lang }) => {
  const globalContext = useGlobalContext();
  const [karaokeState] = globalContext.karaoke;
  const { audioEnded } = karaokeState;

  const recognition = useMemo(() => {
    const recognitionObj = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition ||
      window.mozSpeechRecognition ||
      window.msSpeechRecognition)();

    recognitionObj.continuous = true;
    recognitionObj.interimResults = true;
    recognitionObj.lang = lang;

    console.log(recognitionObj);

    recognitionObj.onresult = (event) => {
      const result = event.results[event.results.length - 1];
      if (result.isFinal) {
        console.log(result[0].transcript);
        const score = getScore(result[0].transcript);
        console.log(score);
      }
    };

    recognitionObj.onend = () => {
      recognitionObj.start();
    };

    return recognitionObj;
  }, [lang]);

  useEffect(() => {
    console.log('start');
    recognition.start();
    const cleanup = () => {
      recognition.abort();
      console.log('audio recogniser cleanup');
    };
    return cleanup;
  }, [recognition]);

  useEffect(() => {
    if (audioEnded) {
      recognition.stop();
    }
  }, [recognition, audioEnded]);

  return <></>;
};

AudioRecogniser.propTypes = {
  lang: PropTypes.string.isRequired,
};

export default AudioRecogniser;
