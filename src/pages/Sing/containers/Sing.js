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

  const setPlaySong = (play) => {
    karaokeDispatch({
      type: 'SET_PLAYSONG',
      payload: { playSong: play },
    });
  };

  console.log(karaokeState);
  return (
    <div className="home">
      <h1>Sing Page </h1>
      <div>
        <Countdown onComplete={() => setPlaySong(true)} />
        <Video playing={karaokeState} />
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
