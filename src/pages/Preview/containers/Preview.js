import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useHistory } from 'react-router-dom';
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
  const history = useHistory();
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

  const videoEl = useRef(null);

  useEffect(() => {
    const getSongInfo = async () => {
      const songInfo = await getSongByTitleId(songName);
      if (!songInfo) {
        history.push('/404');
      }
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
    getSongLyrics().catch(() => {
      history.push('/404');
    });
    getLeaderboard();
  }, [history, songName]);

  const setPlaySong = useCallback(
    (play) => {
      karaokeDispatch({
        type: 'SET_PLAYSONG',
        payload: { playSong: play },
      });

      if (videoEl.current) {
        if (play) {
          videoEl.current.play();
        } else {
          videoEl.current.pause();
        }
      }
    },
    [karaokeDispatch],
  );

  useEffect(() => {
    setPlaySong(true); // play song on page loads

    return () => {
      setPlaySong(false); // stop playing when page unmount
      // original audio should be on when unmount
      karaokeDispatch({
        type: 'SET_ORIGINAL_VOICE_ON',
        payload: { origVoiceOn: true },
      });
    };
  }, [setPlaySong, karaokeDispatch]);

  useEffect(() => {
    const handleEventSpace = (e) => {
      if (e.key === ' ') {
        setPlaySong(!playSong);
      }
    };

    document.addEventListener('keydown', handleEventSpace);
    return () => {
      document.removeEventListener('keydown', handleEventSpace);
    };
  }, [playSong, setPlaySong]);

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
            <video muted className="preview__video" ref={videoEl}>
              <source
                type="video/mp4"
                src={`${process.env.PUBLIC_URL}/${songName}/${songName}_mv.mp4`}
              />
            </video>
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
