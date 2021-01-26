import React from 'react';
import { useHistory } from 'react-router-dom';
import { useGlobalContext } from 'global/context';
import '../styles/controls.scss';

const SingButtons = () => {
  const globalContext = useGlobalContext();
  const [karaokeState, karaokeDispatch] = globalContext.karaoke;
  const { playSong, origVoiceOn } = karaokeState;
  const history = useHistory();

  const onPlayPauseClickHandler = () => {
    karaokeDispatch({
      type: 'SET_PLAYSONG',
      payload: { playSong: !playSong },
    });
  };

  const handleLiveVoice = () => {
    karaokeDispatch({
      type: 'SET_ORIGINAL_VOICE_ON',
      payload: { origVoiceOn: !origVoiceOn },
    });
  };

  const returnHome = () => {
    history.push('/');
  };

  return (
    <div className="control-icons-container">
      <button className="play-control" onClick={returnHome} type="button">
        <p className="control-icons-label">home</p>
        <i className="fas fa-home" />
      </button>
      <button
        className="play-control play-pause-container"
        onClick={onPlayPauseClickHandler}
        type="button"
      >
        <p className="control-icons-label">{playSong ? 'play' : 'pause'}</p>
        {playSong ? (
          <i className="fas fa-pause" />
        ) : (
          <i className="fas fa-play" />
        )}
      </button>
      <div className="voice-over-btn switch">
        <input
          type="checkbox"
          id="react-switch-new"
          checked={origVoiceOn}
          onChange={handleLiveVoice}
        />
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label
          className="react-switch-label"
          htmlFor="react-switch-new"
          style={{ background: origVoiceOn && '#154734' }}
        >
          <span className="react-switch-button" />
        </label>
      </div>
    </div>
  );
};

export default SingButtons;
