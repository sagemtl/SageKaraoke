import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import { getSongByTitleId } from 'utils/ktvQueries';

const Preview = ({ match }) => {
  const {
    params: { songName },
  } = match;

  const [songTitle, setSongTitle] = useState('');
  const [artist, setArtist] = useState('');

  useEffect(() => {
    const getSongInfo = async () => {
      const songInfo = await getSongByTitleId(songName);
      console.log(songInfo);
      setSongTitle(songInfo.title);
      setArtist(songInfo.artist);
    };

    getSongInfo();
  }, []);

  return (
    <div className="home">
      <h1>Preview page</h1>
      <h3>Playing {songTitle}</h3>
      <h3>By {artist}</h3>
      <ReactPlayer url="assets/moon-represent-my-heart-vid.mp4" playing>
        {/* Sorry, your browser doesnt support embedded videos. */}
      </ReactPlayer>
    </div>
  );
};

Preview.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      songName: PropTypes.string,
    }),
  }).isRequired,
};

export default Preview;
