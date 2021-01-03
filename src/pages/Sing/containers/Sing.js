import React from 'react';
import PropTypes from 'prop-types';
import Lyrics from 'components/Lyrics';
import Song from 'assets/data'; // TO-DO: Will be replaced with a fetch
import AudioInput from 'components/Audio/AudioInput';

const Sing = ({ match }) => {
  const {
    params: { songTitle },
  } = match;

  // TO-DO: fetch from backend API using song id/name with a useMemo
  console.log(songTitle);

  const { lang, lrc } = Song;

  return (
    <div className="home">
      <h1>Sing Page</h1>
      <AudioInput lang={lang} />
      <Lyrics lrc={lrc} />
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
