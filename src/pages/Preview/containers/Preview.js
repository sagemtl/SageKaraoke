import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import { getSongByTitleId } from 'utils/ktvQueries';
import { useGlobalContext } from '../../../global/context';

const Preview = ({ match }) => {
  const {
    params: { songName },
  } = match;
  const globalContext = useGlobalContext();
  const [karaokeState, karaokeDispatch] = globalContext.karaoke;

  const [songTitle, setSongTitle] = useState('');
  const [artist, setArtist] = useState('');

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
  }, [songName]);

  useEffect(() => {
    setPlaySong(true); // play song on page loads
    return () => {
      setPlaySong(false); // stop playing when page unmount
      // original audio should be on when unmount
      karaokeDispatch({
        type: 'SET_ORIGINAL_VOICE_ON',
        payload: { origVoiceOn: true },
      });
      console.log(`inside preview cleanup, playSong: ${karaokeState.playSong}`);
    };
  }, []);

  return (
    <div className="home">
      <h1>Preview page</h1>
      <h3>Playing {songTitle}</h3>
      <h3>By {artist}</h3>
      {/* visuals */}
      <ReactPlayer
        url={`${process.env.PUBLIC_URL}/${songName}/${songName}-mv.mp4`}
        playing={karaokeState.playSong}
        muted
        controls
      />
      {/* music */}
      <ReactPlayer
        url={`${process.env.PUBLIC_URL}/${songName}/${songName}_music.mp3`}
        playing={karaokeState.playSong}
        controls
      />
      {/* vocals */}
      <ReactPlayer
        url={`${process.env.PUBLIC_URL}/${songName}/${songName}_vocals.mp3`}
        playing={karaokeState.playSong}
        muted={!karaokeState.origVoiceOn}
        controls
      />
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
