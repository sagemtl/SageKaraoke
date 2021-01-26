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

  return (
    <div className="preview">
      <h2>
        Playing {songData.title} By {songData.artist}
      </h2>
      <div className="album-mv-container">
        <img src={songData.cover} alt="album cover" className="album-cover" />
        {/* visuals */}
        <ReactPlayer
          url={`${process.env.PUBLIC_URL}/${songName}/${songName}_mv.mp4`}
          playing={playSong}
          muted
          controls
          height="70%"
          width="50%"
        />
        <div>
          <h3>leaderboard</h3>
          {leaderboard.map(({ name, score }, index) => (
            <p key={name + score}>
              {index + 1}. {name}: {score}
            </p>
          ))}
        </div>
        <div>
          <h3>Lyrics</h3>
          {lrcList.map(({ id, content }) => (
            <p key={id}>{content}</p>
          ))}
        </div>
      </div>
      {/* music */}
      <ReactPlayer
        url={`${process.env.PUBLIC_URL}/${songName}/${songName}_music.mp3`}
        playing={playSong}
        onTimeUpdate={onTimeUpdate}
        onEnded={onEnded}
      />
      {/* vocals */}
      <ReactPlayer
        url={`${process.env.PUBLIC_URL}/${songName}/${songName}_vocals.mp3`}
        playing={playSong}
        muted={!origVoiceOn}
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
