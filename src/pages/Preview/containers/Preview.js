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
  const [play, setPlay] = useState(true);

  useEffect(() => {
    const getSongInfo = async () => {
      const songInfo = await getSongByTitleId(songName);
      console.log(songInfo);
      setSongTitle(songInfo.title);
      setArtist(songInfo.artist);
    };

    getSongInfo();

    // TODO: delete this setPlay line, it's just to prevent errors for now
    setPlay(true);
  }, [songName]);

  return (
    <div className="home">
      <h1>Preview page</h1>
      <h3>Playing {songTitle}</h3>
      <h3>By {artist}</h3>
      <ReactPlayer
        url={`${process.env.PUBLIC_URL}/videos/moon-represent-my-heart-vid.mp4`}
        playing={play}
        muted
      />
      {/* Sorry, your browser doesnt support embedded videos. */}
      {/* <video
        muted
        autoPlay
        src={`${process.env.PUBLIC_URL}/videos/moon-represent-my-heart-vid.mp4`}
        type="video/mp4"
      /> */}
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
