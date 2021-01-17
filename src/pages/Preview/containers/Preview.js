import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import Lyrics from 'components/Lyrics';

import { getSongByTitleId, getLyricsByTitleId } from 'utils/ktvQueries';
import parseLrc from 'utils/parseLrc';
import { useGlobalContext } from '../../../global/context';

const Preview = ({ match }) => {
  const {
    params: { songName },
  } = match;
  const globalContext = useGlobalContext();
  const [karaokeState, karaokeDispatch] = globalContext.karaoke;
  const { playSong, origVoiceOn } = karaokeState;

  const [songTitle, setSongTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [lrcList, setLrcList] = useState([]);

  const onTimeUpdate = useCallback(
    (event) => {
      karaokeDispatch({
        type: 'SET_AUDIO_TIME',
        payload: Math.floor(event.target.currentTime * 10) * 100,
      });
    },
    [karaokeDispatch],
  );

  const onEnded = useCallback(() => {
    karaokeDispatch({
      type: 'SET_AUDIO_ENDED',
      payload: true,
    });
  }, [karaokeDispatch]);

  useEffect(() => {
    const getSongInfo = async () => {
      const songInfo = await getSongByTitleId(songName);
      console.log(songInfo);
      setSongTitle(songInfo.title);
      setArtist(songInfo.artist);
    };
    const getSongData = async () => {
      const songData = await getLyricsByTitleId(songName);
      const lineList = parseLrc(songData.lyrics);
      setLrcList(lineList);
    };

    getSongInfo();
    getSongData();
  }, [songName]);

  useEffect(() => {
    const setPlaySong = (play) => {
      karaokeDispatch({
        type: 'SET_PLAYSONG',
        payload: { playSong: play },
      });
    };

    setPlaySong(true); // play song on page loads
    console.log(`playsong after set true ${playSong}`);

    return () => {
      setPlaySong(false); // stop playing when page unmount
      // original audio should be on when unmount
      karaokeDispatch({
        type: 'SET_ORIGINAL_VOICE_ON',
        payload: { origVoiceOn: true },
      });
    };
  }, [karaokeDispatch]);

  return (
    <div className="home">
      <h1>Preview page</h1>
      <h3>Playing {songTitle}</h3>
      <h3>By {artist}</h3>
      {/* visuals */}
      <ReactPlayer
        url={`${process.env.PUBLIC_URL}/${songName}/${songName}_mv.mp4`}
        playing={playSong}
        muted
        controls
        height="70%"
        width="35%"
      />
      {/* music */}
      <ReactPlayer
        url={`${process.env.PUBLIC_URL}/${songName}/${songName}_music.mp3`}
        playing={playSong}
        onTimeUpdate={onTimeUpdate}
        onEnded={onEnded}
        controls
      />
      {/* vocals */}
      <ReactPlayer
        url={`${process.env.PUBLIC_URL}/${songName}/${songName}_vocals.mp3`}
        playing={playSong}
        muted={!origVoiceOn}
        controls
      />

      {lrcList.length ? (
        <>
          <Lyrics lineList={lrcList} />
        </>
      ) : null}
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
