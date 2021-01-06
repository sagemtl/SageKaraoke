import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import { getSongByTitleId } from 'utils/ktvQueries';
import yueInstr from 'assets/moon-represent-my-heart-instr.mp3';
import song from 'assets/yue-liang-dai-biao-wo-de-xin.mp3';
import { useGlobalContext } from '../../../global/context';

const Preview = ({ match }) => {
  const {
    params: { songName },
  } = match;
  const globalContext = useGlobalContext();
  const [karaokeState, karaokeDispatch] = globalContext.karaoke;

  const [songTitle, setSongTitle] = useState('');
  const [artist, setArtist] = useState('');
  // const [play, setPlay] = useState(true);

  const setPlaySong = (play) => {
    karaokeDispatch({
      type: 'SET_PLAYSONG',
      payload: { playSong: play },
    });
  };

  useEffect(() => {
    const getSongInfo = async () => {
      const songInfo = await getSongByTitleId(songName);
      console.log(songInfo);
      setSongTitle(songInfo.title);
      setArtist(songInfo.artist);
    };

    getSongInfo();

    setPlaySong(true);
  }, [songName, setPlaySong]);

  return (
    <div className="home">
      <h1>Preview page</h1>
      <h3>Playing {songTitle}</h3>
      <h3>By {artist}</h3>
      <ReactPlayer
        url={`${process.env.PUBLIC_URL}/videos/${songName}-mv.mp4`}
        playing={karaokeState.playSong}
        muted
      />
      <audio src={yueInstr} autoPlay controls>
        Sorry, your browser doesn&apos;t support audio.
      </audio>

      <audio src={song} autoPlay controls>
        Sorry, your browser doesn&apos;t support audio.
      </audio>
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
