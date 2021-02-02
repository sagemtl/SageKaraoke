import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useGlobalContext } from 'global/context';
import '../styles/controls.scss';

const PreviewButtons = () => {
  const globalContext = useGlobalContext();
  const [karaokeState, karaokeDispatch] = globalContext.karaoke;
  const { playSong, origVoiceOn } = karaokeState;
  const [play, setPlay] = useState(playSong);
  const history = useHistory();
  const location = useLocation();
  const [, , titleId] = location.pathname.split('/'); // Outputs song title id

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

  const goToSing = () => {
    history.push(`/sing/${titleId}`);
  };

  useEffect(() => {
    setPlay(playSong);
  }, [playSong]);

  console.log(playSong);

  return (
    <div className="control-icons-container">
      <div>
        <p className="record-label">record</p>
        <button
          className="play-control record-btn-ctr record-border"
          onClick={goToSing}
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
        <p className="control-icons-label">previous</p>
        <i className="fas fa-step-backward" />
      </button>
      <button
        className="play-control play-pause-container"
        onClick={onPlayPauseClickHandler}
        type="button"
      >
        <p className="control-icons-label">{playSong ? 'pause' : 'play'}</p>
        {play ? <i className="fas fa-pause" /> : <i className="fas fa-play" />}
      </button>
      <button
        className="play-control next-track-btn-ctr"
        // onClick={this.playNextTrack}
        type="button"
      >
        <p className="control-icons-label">next</p>
        <i className="fas fa-step-forward" />
      </button>
      <div>
        <p className="control-icons-label">voice</p>
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
    </div>
  );
};

export default PreviewButtons;
