import React, { useState, useEffect } from 'react';
import { useGlobalContext } from 'global/context';
import PropTypes from 'prop-types';
import '../styles/Lyrics.scss';

const Lyrics = ({ lineList }) => {
  const globalContext = useGlobalContext();
  const [karaokeState] = globalContext.karaoke;
  const { audioTime } = karaokeState;
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    if (
      currentIndex < lineList.length - 1 &&
      audioTime >= lineList[currentIndex + 1].millisecond
    ) {
      setCurrentIndex(currentIndex + 1);
    }
  }, [currentIndex, audioTime, lineList]);

  return (
    <div className="lyrics-div">
      {/* pull this into audio wth background */}
      {/* <audio
        src={songFile}
        autoPlay
        muted
        onTimeUpdate={onTimeUpdate}
        onEnded={onEnded}
      > 
        Sorry, your browser doesn&apos;t support audio.
      </audio> */}
      <div>time: {audioTime}</div>
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
  lineList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      millisecond: PropTypes.number.isRequired,
      content: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default Lyrics;
