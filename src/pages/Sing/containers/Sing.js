import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Lyrics from 'components/Lyrics';
import AudioInput from 'components/AudioAnalyser';
import AudioRecognizer from 'components/AudioRecognizer';
import parseLrc from 'utils/parseLrc';
import { getSongByTitleId, getLyricsByTitleId } from 'utils/ktvQueries';
import Video from '../components/Video';
import { useGlobalContext } from '../../../global/context';
// import Countdown from '../components/Countdown';
import { getLyricsScore } from '../../../utils/score';

const Sing = ({ match }) => {
  const {
    params: { songTitle },
  } = match;

  const globalContext = useGlobalContext();
  const [karaokeState, karaokeDispatch] = globalContext.karaoke;
  const { playSong, origVoiceOn } = karaokeState;

  const [songName, setSongName] = useState('');
  const [artist, setArtist] = useState('');
  const [lrcList, setLrcList] = useState([]);

  const [lang, setLang] = useState('');

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
    return <div> Score = {getLyricsScore}</div>;
  }, [karaokeDispatch]);

  // const setPlaySong = (play) => {
  //   karaokeDispatch({
  //     type: 'SET_PLAYSONG',
  //     payload: { playSong: play },
  //   });
  // };

  useEffect(() => {
    const getSongInfo = async () => {
      const songInfo = await getSongByTitleId(songTitle);
      console.log(songInfo);
      setSongName(songInfo.title);
      setArtist(songInfo.artist);
    };
    const getSongData = async () => {
      const songData = await getLyricsByTitleId(songTitle);
      const lineList = parseLrc(songData.lyrics);
      setLrcList(lineList);
      setLang(songData.language);
      setLrcList(lineList);
    };

    getSongInfo();
    getSongData();
  }, [songTitle]);
  return (
    <div className="sing">
      <h1 className="sing__title">{songName}</h1>
      <h1 className="sing__title">{artist}</h1>
      <div className="sing-video">
        {/* {playSong ? null : <Countdown onComplete={setPlaySong} />} */}
        <Video
          playing={playSong}
          songName={songTitle}
          origVoiceOn={origVoiceOn}
          onTimeUpdate={onTimeUpdate}
          onEnded={onEnded}
        />
      </div>
      {lang && lrcList.length ? (
        <>
          <AudioInput songTitle={songTitle} />
          <AudioRecognizer lang={lang} lineList={lrcList} />
          <Lyrics lineList={lrcList} />
        </>
      ) : null}
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
