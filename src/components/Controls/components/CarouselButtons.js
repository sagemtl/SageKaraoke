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
      {/* <div> */}
      <button
        className="play-control prev-track-btn-ctr"
        onClick={() => setSelectedAlbum(selectedAlbum - 1)}
        type="button"
      >
        <p className="control-icons-label">previous</p>
        <i className="fas fa-step-backward" />
      </button>
      {/* </div> */}

      <button
        className="play-control play-pause-container"
        onClick={onPlayPauseClickHandler}
        type="button"
      >
        <p className="control-icons-label">{playing ? 'play' : 'pause'}</p>
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
        <p className="control-icons-label">next</p>
        <i className="fas fa-step-forward" />
      </button>
    </div>
  );
};

export default CarouselButtons;
