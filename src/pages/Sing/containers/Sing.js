import React from 'react';
import PropTypes from 'prop-types';
import Lyrics from 'components/Lyrics';
import Countdown from '../components/Countdown';
import Video from '../components/Video';
import '../styles/song.scss';
import { useGlobalContext } from '../../../global/context';

const Sing = ({ match }) => {
  const {
    params: { songTitle },
  } = match;

  const globalContext = useGlobalContext();
  const [karaokeState, karaokeDispatch] = globalContext.karaoke;
  const { playSong } = karaokeState;

  const setPlaySong = (play) => {
    karaokeDispatch({
      type: 'SET_PLAYSONG',
      payload: { playSong: play },
    });
  };

  return (
    <div className="home">
      <h1>Sing Page </h1>
      <div>
        {playSong ? null : <Countdown onComplete={setPlaySong} />}
        <Video playing={playSong} />
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
