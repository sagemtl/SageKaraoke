import React, { useState } from 'react';
import '../../../styles/controls.scss';

const CarouselButtons = () => {
  const [playing, setPlaying] = useState(false);

  const onPlayPauseClickHandler = () => {
    setPlaying(!playing);
  };

  return (
    <div className="control-icons-container">
      <button
        className="play-control prev-track-btn-ctr"
        // onClick={this.playPrevTrack}
        type="button"
      >
        <i className="fas fa-step-backward" />
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
        <i className="fas fa-step-forward" />
      </button>
    </div>
  );
};

export default CarouselButtons;
