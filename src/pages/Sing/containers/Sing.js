import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Lyrics from 'components/Lyrics';
import AudioInput from 'components/AudioAnalyser';
import AudioRecognizer from 'components/AudioRecognizer';
import parseLrc from 'utils/parseLrc';
import { getSongByTitleId, getLyricsByTitleId } from 'utils/ktvQueries';
import Video from '../components/Video';
import FinalResultsModal from '../components/FinalResultsModal';
import { useGlobalContext } from '../../../global/context';
import Countdown from '../components/Countdown';
import { getLyricsScore } from '../../../utils/score';

const Sing = ({ match }) => {
  const {
    params: { songTitle },
  } = match;

  const globalContext = useGlobalContext();
  const [karaokeState, karaokeDispatch] = globalContext.karaoke;
  const { playSong, origVoiceOn, pinyinOn } = karaokeState;

  const [songName, setSongName] = useState('');
  const [artist, setArtist] = useState('');
  const [lrcList, setLrcList] = useState([]);
  const [playLocalSong, setPlayLocalSong] = useState(false);
  const [lrcRomanList, setLrcRomanList] = useState([]);

  const [lang, setLang] = useState('');
  const history = useHistory();

  const onTimeUpdate = useCallback(
    (event) => {
      karaokeDispatch({
        type: 'SET_AUDIO_TIME',
        payload: Math.floor(event.target.currentTime * 10) * 100,
      });
    },
    [karaokeDispatch],
  );

  // const onScoreUpdate = useCallback(
  //   (event) => {
  //     karaokeDispatch({
  //       type: 'SET_LYRICS_SCORE',
  //       payload: (getLyricsScore += getLyricsScore),
  //     });
  //   },
  //   [karaokeDispatch],
  // );

  const onEnded = useCallback(() => {
    karaokeDispatch({
      type: 'SET_AUDIO_ENDED',
      payload: true,
    });
    return <div> Score = {getLyricsScore}</div>;
  }, [karaokeDispatch]);

  const setPlaySong = (play) => {
    karaokeDispatch({
      type: 'SET_PLAYSONG',
      payload: { playSong: play },
    });
  };

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
      if (songData.lyrics_roman) {
        const romanLineList = parseLrc(songData.lyrics_roman);
        setLrcRomanList(romanLineList);
      }
    };
    getSongInfo().catch(() => {
      history.push('/404');
    });
    getSongData().catch(() => {
      history.push('/404');
    });
  }, [history, songTitle]);

  return (
    <div className="home">
      <FinalResultsModal />
      <h1>Sing Page </h1>
      <h1>{songName}</h1>
      <h1>{artist}</h1>
      {/* <h1>{lyricsScore}</h1> */}
      {/* <div className="scoreRenderer">
        <ScoreRenderer number={lyricsScore} />
      </div> */}
      {/* <ScoreRenderer number={100} /> */}
      <div>
        {/* <button type="button" onClick={() => setVoiceToggle(!origVoiceOn)}>
          toggle voice
        </button> */}
        {playLocalSong ? null : (
          <Countdown onComplete={setPlaySong} start={setPlayLocalSong} />
        )}
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
          <Lyrics
            lineList={pinyinOn && lrcRomanList.length ? lrcRomanList : lrcList}
          />
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
