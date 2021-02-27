import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Lyrics from 'components/Lyrics';
import AudioInput from 'components/AudioAnalyser';
import AudioRecognizer from 'components/AudioRecognizer';
import parseLrc from 'utils/parseLrc';
import { getLyricsByTitleId } from 'utils/ktvQueries';
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
  const { width } = globalContext.window;

  const [lrcList, setLrcList] = useState([]);
  const [playLocalSong, setPlayLocalSong] = useState(false);
  const [lrcRomanList, setLrcRomanList] = useState([]);

  const [lang, setLang] = useState('');
  const history = useHistory();

  const videoEl = useRef(null);

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

    getSongData().catch(() => {
      history.push('/404');
    });
  }, [history, songTitle]);

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

  const mobile = width <= 600;

  return (
    <div className="sing">
      <FinalResultsModal titleid={songTitle} />
      {/* <h1>{lyricsScore}</h1> */}
      {/* <div className="scoreRenderer">
        <ScoreRenderer number={lyricsScore} />
      </div> */}
      {/* <ScoreRenderer number={100} /> */}
      {playLocalSong ? null : (
        <Countdown onComplete={setPlaySong} start={setPlayLocalSong} />
      )}
      <div className="sing-video">
        <Video
          playing={playSong}
          songName={songTitle}
          origVoiceOn={origVoiceOn}
          onTimeUpdate={onTimeUpdate}
          onEnded={onEnded}
          mobile={mobile}
          videoRef={videoEl}
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
