import React, { useState } from 'react';
// eslint-disable-next-line
import classNames from 'classnames';
import '../styles/controls.scss';

const Controls = () => {
  const [hidden, setHidden] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [isOn, setLiveVoice] = useState(false);

  const toggleHidden = () => {
    setHidden(!hidden);
  };

  const onPlayPauseClickHandler = () => {
    setPlaying(!playing);
  };

  const handleLiveVoice = () => {
    setLiveVoice(!isOn);
  };

  return (
    <div
      className={classNames('control-center', {
        'control-center--hidden': hidden,
      })}
    >
      <div
        role="button"
        tabIndex={0}
        onClick={toggleHidden}
        onKeyDown={toggleHidden}
        className="control-dismiss-tab"
      >
        <b>{hidden ? 'show' : 'hide'}</b>
      </div>
      <div className="control-icons-container">
        <div>
          {/* <div style={{ textAlign: 'center' }}>
            <b>start</b>
          </div> */}
          <button
            className="play-control record-btn-ctr record-border"
            // onClick={this.recordTrack}
            type="button"
          >
            <i className="fas fa-circle red" />
          </button>
        </div>
        <button
          className="play-control prev-track-btn-ctr"
          // onClick={this.playPrevTrack}
          type="button"
        >
          <i className="fas fa-step-backward" style={{ marginLeft: 20 }} />
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
        <button
          className="play-control next-track-btn-ctr"
          // onClick={this.playNextTrack}
          type="button"
        >
          <i className="fas fa-step-forward" style={{ marginRight: 20 }} />
        </button>
        {/* <div> */}
        {/* <div style={{ textAlign: 'center' }}>
            <b>voice</b>
          </div> */}
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
        {/* </div> */}
      </div>
    </div>
  );
};

export default Controls;
