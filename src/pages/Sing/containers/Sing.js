import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Lyrics from 'components/Lyrics';
import '../styles/song.scss';
import AudioInput from 'components/AudioAnalyser';
import AudioRecognizer from 'components/AudioRecognizer';
import { getLyricsByTitleId } from 'utils/ktvQueries';
import parseLrc from 'utils/parseLrc';
import Video from '../components/Video';
import { useGlobalContext } from '../../../global/context';
import Countdown from '../components/Countdown';

const Sing = ({ match }) => {
  const {
    params: { songTitle },
  } = match;

  const globalContext = useGlobalContext();
  const [karaokeState, karaokeDispatch] = globalContext.karaoke;
  const { playSong, origVoiceOn } = karaokeState;

  const [lang, setLang] = useState('');
  const [lrcList, setLrcList] = useState([]);

  const setPlaySong = (play) => {
    karaokeDispatch({
      type: 'SET_PLAYSONG',
      payload: { playSong: play },
    });
  };

  useEffect(() => {
    const getSongData = async () => {
      const songData = await getLyricsByTitleId(songTitle);
      const lineList = parseLrc(songData.lyrics);
      setLang(songData.language);
      setLrcList(lineList);
    };
    getSongData();
  }, [songTitle]);

  return (
    <div className="home">
      <h1>Sing Page </h1>
      <div>
        {playSong ? null : <Countdown onComplete={setPlaySong} />}
        <Video
          playing={playSong}
          songName={songTitle}
          origVoiceOn={origVoiceOn}
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
