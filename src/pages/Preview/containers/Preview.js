import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';

import {
  getSongByTitleId,
  getLyricsByTitleId,
  getLeaderboardByTitleId,
} from 'utils/ktvQueries';
import parseLrc from 'utils/parseLrc';
import { useGlobalContext } from '../../../global/context';
import '../styles/preview.scss';

const Preview = ({ match }) => {
  const {
    params: { songName },
  } = match;
  const globalContext = useGlobalContext();
  const [karaokeState, karaokeDispatch] = globalContext.karaoke;
  const { playSong, origVoiceOn } = karaokeState;

  const [lrcList, setLrcList] = useState([]);
  const [songData, setSongData] = useState({
    artist: '',
    title: '',
    titleChinese: '',
    cover: '',
  });
  const [leaderboard, setLeaderboard] = useState([]);

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
      setSongData((prev) => ({
        ...prev,
        title: songInfo.title,
        artist: songInfo.artist,
        cover: songInfo.cover_photo,
      }));
    };

    const getSongLyrics = async () => {
      const songLyrics = await getLyricsByTitleId(songName);
      const lineList = parseLrc(songLyrics.lyrics);
      setLrcList(lineList);
    };

    const getLeaderboard = async () => {
      const leader = await getLeaderboardByTitleId(songName);
      setLeaderboard(leader);
    };
    console.log('in top useeffect');
    getSongInfo();
    getSongLyrics();
    getLeaderboard();
  }, [songName]);

  useEffect(() => {
    const setPlaySong = (play) => {
      karaokeDispatch({
        type: 'SET_PLAYSONG',
        payload: { playSong: play },
      });
    };

    setPlaySong(true); // play song on page loads

    return () => {
      setPlaySong(false); // stop playing when page unmount
      // original audio should be on when unmount
      karaokeDispatch({
        type: 'SET_ORIGINAL_VOICE_ON',
        payload: { origVoiceOn: true },
      });
    };
  }, [karaokeDispatch, playSong]);

  const mvStyles = {
    // border: '4px',
    // borderColor: 'black',
    // borderStyle: 'solid',
    // borderRadius: '10px',
    margin: '0 1em',
    width: '100%',
  };

  const mobile = window.innerWidth <= 600;

  return (
    <div className="preview">
      <div className="preview__container">
        <h3 className="song-title">
          {songData.title.toUpperCase()} BY {songData.artist.toUpperCase()}
        </h3>
        <div className="album-mv-container">
          <div className="left-panel">
            <img
              src={songData.cover}
              alt="album cover"
              className="left-panel__album-cover"
            />
            <div className="left-panel__lyrics">
              <h3 className="left-panel__lyrics__lyrics-title">LYRICS</h3>
              <div className="left-panel__lyrics__lyrics-body">
                {lrcList.map(({ id, content }) => (
                  <p key={id}>{content}</p>
                ))}
              </div>
            </div>
          </div>
          {/* visuals */}
          <div className="mv">
            <ReactPlayer
              url={`${process.env.PUBLIC_URL}/${songName}/${songName}_mv.mp4`}
              playing={playSong}
              muted
              // height="auto"
              width={mobile ? '90vw' : '50vw'}
              style={mvStyles}
            />
          </div>
          <div className="right-panel">
            <div className="right-panel__instructions">
              <h3>INSTRUCTIONS</h3>
              <p className="right-panel__instructions__content">
                Click the record button to play the game. Sing along the lyrics
                using the right pitch at the right time to earn a higher score.
              </p>
            </div>
            <div className="right-panel__leaderboard">
              <h3>LEADERBOARD</h3>
              {leaderboard.map(({ name, score }, index) => (
                <p key={name + score}>
                  {index + 1}. {name}: {score}
                </p>
              ))}
            </div>
          </div>
        </div>
        {/* music */}
        <ReactPlayer
          style={{ display: 'none' }}
          url={`${process.env.PUBLIC_URL}/${songName}/${songName}_music.mp3`}
          playing={playSong}
          onTimeUpdate={onTimeUpdate}
          onEnded={onEnded}
        />
        {/* vocals */}
        <ReactPlayer
          style={{ display: 'none' }}
          url={`${process.env.PUBLIC_URL}/${songName}/${songName}_vocals.mp3`}
          playing={playSong}
          muted={!origVoiceOn}
        />
      </div>
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
