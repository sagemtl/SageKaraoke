import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Lyrics from 'components/Lyrics';
import Countdown from '../components/Countdown';
import Video from '../components/Video';
import '../styles/song.scss';

const Sing = ({ match }) => {
  const {
    params: { songTitle },
  } = match;

  const [complete, setComplete] = useState(false);

  return (
    <div className="home">
      <h1>Sing Page</h1>
      <div>
        <Countdown onComplete={() => setComplete(true)} />
        <Video playing={complete} />
      </div>
      <Lyrics songTitle={songTitle} />
    </div>
  );
};

Sing.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      songTitle: PropTypes.string,
    }),
  }).isRequired,
};

export default Sing;
