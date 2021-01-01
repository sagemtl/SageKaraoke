import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import parseLrc from 'utils/parseLrc';
import Songs from 'assets/data'; // Will be replaced with a fetch
import song from 'assets/yue-liang-dai-biao-wo-de-xin.mp3';
import '../styles/Lyrics.scss';

const Lyrics = ({ songTitle }) => {
  // fetch from backend API using song id/name with a useMemo
  console.log(songTitle);

  const [currentTime, setCurrentTime] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const { lrc } = Songs;
  const lineList = useMemo(() => parseLrc(lrc), [lrc]);

  const onTimeUpdate = useCallback(
    (event) => {
      setCurrentTime(event.target.currentTime * 1000);
      if (
        currentIndex < lineList.length - 1 &&
        currentTime >= lineList[currentIndex + 1].millisecond
      ) {
        setCurrentIndex(currentIndex + 1);
        console.log(lineList[currentIndex + 1].content);
      }
    },
    [currentTime, currentIndex, lineList],
  );

  return (
    <div className="lyrics-div">
      <audio src={song} autoPlay onTimeUpdate={onTimeUpdate}>
        Sorry, your browser doesn&apos;t support audio.
      </audio>
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
  songTitle: PropTypes.string.isRequired,
};

export default Lyrics;
