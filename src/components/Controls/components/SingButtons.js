import React, { useState } from 'react';
import '../styles/controls.scss';

const SingButtons = () => {
  const [playing, setPlaying] = useState(false);
  const [isOn, setLiveVoice] = useState(false);

  const onPlayPauseClickHandler = () => {
    setPlaying(!playing);
  };

  const handleLiveVoice = () => {
    setLiveVoice(!isOn);
  };

  return (
    <div className="control-icons-container">
      <button
        className="play-control"
        // onClick={this.returnHome}
        type="button"
      >
        <i className="fas fa-home" />
      </button>
      <button
        className="play-control play-pause-container"
        onClick={onPlayPauseClickHandler}
        type="button"
      >
        {playing ? (
          <i className="fas fa-pause" />
        ) : (
          <i className="fas fa-play" />
        )}
      </button>
      <div className="voice-over-btn switch">
        <input
          type="checkbox"
          id="react-switch-new"
          checked={isOn}
          onChange={handleLiveVoice}
        />
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label
          className="react-switch-label"
          htmlFor="react-switch-new"
          style={{ background: isOn && '#154734' }}
        >
          <span className="react-switch-button" />
        </label>
      </div>
    </div>
  );
};

export default SingButtons;
