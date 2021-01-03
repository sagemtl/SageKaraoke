import React from 'react';
import PropTypes from 'prop-types';
import Lyrics from 'components/Lyrics';

const Sing = ({ match }) => {
  const {
    params: { songTitle },
  } = match;

  return (
    <div className="home">
      <h1>Sing Page</h1>
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
