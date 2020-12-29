import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import parseLrc from 'utils/parseLrc';
import Songs from 'assets/data'; // Will be replaced with a fetch
import song from 'assets/yue-liang-dai-biao-wo-de-xin.mp3';

const Song = ({ match }) => {
  const {
    params: { songId },
  } = match;
  // fetch from backend API using song id/name with a useMemo

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
    <div className="home">
      <h1>Song Page</h1>
      <h2>{songId}</h2>
      <audio src={song} muted controls onTimeUpdate={onTimeUpdate}>
        Sorry, your browser doesn&apos;t support audio.
      </audio>
    </div>
  );
};

Song.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      songId: PropTypes.string,
    }),
  }).isRequired,
};

export default Song;
