import React from 'react';
import PropTypes from 'prop-types';

const Preview = ({ match }) => {
  const {
    params: { songName },
  } = match;

  return (
    <div className="home">
      <h1>Preview page</h1>
      <h3>Playing {songName}</h3>
      <video
        width="320"
        height="240"
        src="../../../assets/moon-represent-my-heart-vid.mp4"
      >
        Sorry, your browser doesnt support embedded videos.
      </video>
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
