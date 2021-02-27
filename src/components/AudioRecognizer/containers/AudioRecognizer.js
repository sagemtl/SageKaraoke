import { useMemo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useGlobalContext } from 'global/context';
import { getWordList, getLyricsScore } from 'utils/score';

const AudioRecognizer = ({ lang, lineList }) => {
  const globalContext = useGlobalContext();
  const [karaokeState, karaokeDispatch] = globalContext.karaoke;
  const { audioEnded, lyricsScore } = karaokeState;

  const wordListRef = useRef();

  const recognition = useMemo(() => {
    const recognitionObj = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition ||
      window.mozSpeechRecognition ||
      window.msSpeechRecognition)();

    recognitionObj.continuous = true;
    recognitionObj.interimResults = true;
    recognitionObj.lang = lang;

    recognitionObj.onend = () => {
      recognitionObj.start();
    };

    return recognitionObj;
  }, [lang]);

  useEffect(() => {
    recognition.start();
    wordListRef.current = getWordList(lineList, lang);
    const cleanup = () => {
      recognition.abort();
    };
    return cleanup;
  }, [recognition, lineList, lang]);

  useEffect(() => {
    if (audioEnded) {
      recognition.stop();
    }
  }, [recognition, audioEnded]);

  useEffect(() => {
    recognition.onresult = (event) => {
      const result = event.results[event.results.length - 1];
      if (result.isFinal) {
        const score = getLyricsScore(wordListRef.current, result[0].transcript);
        karaokeDispatch({
          type: 'SET_LYRICS_SCORE',
          payload: score + lyricsScore,
        });
      }
    };
  }, [recognition, karaokeDispatch, lyricsScore]);

  return <></>;
};

AudioRecognizer.propTypes = {
  lang: PropTypes.string.isRequired,
  lineList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      millisecond: PropTypes.number.isRequired,
      content: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default AudioRecognizer;
