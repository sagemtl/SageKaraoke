import React, { useState } from 'react';
import { useGlobalContext } from 'global/context';
import '../styles/controls.scss';

const CarouselButtons = () => {
  const globalContext = useGlobalContext();
  const [karaokeState, karaokeDispatch] = globalContext.karaoke;
  const { selectedAlbum } = karaokeState;

  const [playing, setPlaying] = useState(false);

  const onPlayPauseClickHandler = () => {
    setPlaying(!playing);
  };

  const setSelectedAlbum = (index) => {
    karaokeDispatch({
      type: 'SET_SELECTED_ALBUM',
      payload: {
        selectedAlbum: index,
      },
    });
  };

  return (
    <div className="control-icons-container">
      <button
        className="play-control prev-track-btn-ctr"
        onClick={() => setSelectedAlbum(selectedAlbum - 1)}
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
        onClick={() => setSelectedAlbum(selectedAlbum + 1)}
        type="button"
      >
        <i className="fas fa-step-forward" />
      </button>
    </div>
  );
};

export default CarouselButtons;
