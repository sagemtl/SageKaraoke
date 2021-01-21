import React, { useState, useEffect } from 'react';
import { useGlobalContext } from 'global/context';
import PropTypes from 'prop-types';
import '../styles/Lyrics.scss';

const Lyrics = ({ lineList }) => {
  const globalContext = useGlobalContext();
  const [karaokeState] = globalContext.karaoke;
  const { audioTime, controlOpen } = karaokeState;
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    if (
      currentIndex < lineList.length - 1 &&
      audioTime >= lineList[currentIndex + 1].millisecond
    ) {
      setCurrentIndex(currentIndex + 1);
    }
  }, [currentIndex, audioTime, lineList]);

  console.log(controlOpen);

  return (
    <div className={controlOpen ? 'lyrics__higher' : 'lyrics__lower'}>
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
