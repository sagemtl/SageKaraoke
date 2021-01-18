import React, { useState, useCallback } from 'react';
import { useGlobalContext } from 'global/context';
import PropTypes from 'prop-types';
import songFile from 'assets/yue-liang-dai-biao-wo-de-xin.mp3';
import '../styles/Lyrics.scss';

const Lyrics = ({ lineList }) => {
  const globalContext = useGlobalContext();
  const [karaokeState, karaokeDispatch] = globalContext.karaoke;
  const [currentIndex, setCurrentIndex] = useState(-1);

  const { audioTime, controlOpen } = karaokeState;

  const onTimeUpdate = useCallback(
    (event) => {
      karaokeDispatch({
        type: 'SET_AUDIO_TIME',
        payload: Math.floor(event.target.currentTime * 10) * 100,
      });

      if (
        currentIndex < lineList.length - 1 &&
        audioTime >= lineList[currentIndex + 1].millisecond
      ) {
        setCurrentIndex(currentIndex + 1);
      }
    },
    [audioTime, karaokeDispatch, currentIndex, lineList],
  );

  const onEnded = useCallback(() => {
    karaokeDispatch({
      type: 'SET_AUDIO_ENDED',
      payload: true,
    });
  }, [karaokeDispatch]);

  console.log(controlOpen);

  return (
    <div className={controlOpen ? 'lyrics__higher' : 'lyrics__lower'}>
      <audio
        src={songFile}
        autoPlay
        // muted
        onTimeUpdate={onTimeUpdate}
        onEnded={onEnded}
      >
        Sorry, your browser doesn&apos;t support audio.
      </audio>
      <div>time: {audioTime}</div>
      <div className="lyrics__current">
        {currentIndex >= 0 ? lineList[currentIndex].content : null}
      </div>
      <div className="lyrics__next">
        {currentIndex < lineList.length - 1
          ? lineList[currentIndex + 1].content
          : null}
      </div>
    </div>
  );
};

Lyrics.propTypes = {
  lineList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      millisecond: PropTypes.number.isRequired,
      content: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default Lyrics;
