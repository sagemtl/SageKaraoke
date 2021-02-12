import React from 'react';
import Button from '@material-ui/core/Button';
import { useGlobalContext } from 'global/context';
import '../styles/controls.scss';

const SingButtons = () => {
  const globalContext = useGlobalContext();
  const [karaokeState, karaokeDispatch] = globalContext.karaoke;
  const { playSong, origVoiceOn, pinyinOn } = karaokeState;

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

  const togglePinyin = () => {
    karaokeDispatch({
      type: 'SET_PINYIN_ON',
      payload: { pinyinOn: !pinyinOn },
    });
  };

  return (
    <div className="control-icons-container">
      <div>
        <p className="sing-control-icons-label">pinyin</p>
        <Button
          variant="contained"
          className="pinyin-control"
          onClick={togglePinyin}
          color="primary"
        >
          拼
        </Button>
      </div>
      <button
        className="play-control play-pause-container"
        onClick={onPlayPauseClickHandler}
        type="button"
      >
        <p className="sing-control-icons-label">
          {playSong ? 'pause' : 'play'}
        </p>
        {playSong ? (
          <i className="fas fa-pause" />
        ) : (
          <i className="fas fa-play" />
        )}
      </button>
      <div>
        <p className="sing-control-icons-label">voice</p>
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
            style={{ background: origVoiceOn && '#6D4D83' }}
          >
            <span className="react-switch-button" />
          </label>
        </div>
      </div>
    </div>
  );
};

export default SingButtons;
