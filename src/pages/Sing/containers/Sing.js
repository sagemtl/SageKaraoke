import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Lyrics from 'components/Lyrics';
import AudioInput from 'components/Audio/AudioInput';
import { getLyricsByTitleId } from 'utils/ktvQueries';

const Sing = ({ match }) => {
  const {
    params: { songTitle },
  } = match;

  const [lang, setLang] = useState('');
  const [lrc, setLrc] = useState('');

  useEffect(() => {
    const getSongData = async () => {
      const songData = await getLyricsByTitleId(songTitle);
      setLang(songData.language);
      setLrc(songData.lyrics);
    };
    getSongData();
  }, [songTitle]);

  return (
    <div className="home">
      <h1>Sing Page</h1>
      <AudioInput lang={lang} />
      <Lyrics lrc={lrc} />
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
