import React, { useState, useCallback, useMemo } from 'react';
import { useGlobalContext } from 'global/context';
import PropTypes from 'prop-types';
import parseLrc from 'utils/parseLrc';
import songFile from 'assets/yue-liang-dai-biao-wo-de-xin.mp3';
import '../styles/Lyrics.scss';

const Lyrics = ({ lrc }) => {
  const globalContext = useGlobalContext();
  const [karaokeState, karaokeDispatch] = globalContext.karaoke;
  const [currentIndex, setCurrentIndex] = useState(-1);

  const lineList = useMemo(() => parseLrc(lrc), [lrc]);

  const onTimeUpdate = useCallback(
    (event) => {
      karaokeDispatch({
        type: 'SET_AUDIO_TIME',
        payload: Math.floor(event.target.currentTime * 10) * 100,
      });

      if (
        currentIndex < lineList.length - 1 &&
        karaokeState.audioTime >= lineList[currentIndex + 1].millisecond
      ) {
        setCurrentIndex(currentIndex + 1);
        // console.log(lineList[currentIndex + 1].content);
      }
    },
    [karaokeState, karaokeDispatch, currentIndex, lineList],
  );

  return (
    <div className="lyrics-div">
      <audio src={songFile} autoPlay onTimeUpdate={onTimeUpdate}>
        Sorry, your browser doesn&apos;t support audio.
      </audio>
      <div>time: {karaokeState.audioTime}</div>
      <div className="lyrics-current">
        {currentIndex >= 0 ? lineList[currentIndex].content : null}
      </div>
      <div className="lyrics-next">
        {currentIndex < lineList.length - 1
          ? lineList[currentIndex + 1].content
          : null}
      </div>
    </div>
  );
};

Lyrics.propTypes = {
  lrc: PropTypes.string.isRequired,
};

export default Lyrics;
