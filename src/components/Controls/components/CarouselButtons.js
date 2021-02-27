import React from 'react';
import { useGlobalContext } from 'global/context';
import { useHistory } from 'react-router-dom';
import '../styles/controls.scss';

const CarouselButtons = () => {
  const globalContext = useGlobalContext();
  const history = useHistory();
  const [karaokeState, karaokeDispatch] = globalContext.karaoke;
  const { albums, selectedAlbum } = karaokeState;

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
        onClick={() =>
          setSelectedAlbum(selectedAlbum === 0 ? 8 : selectedAlbum - 1)
        }
        type="button"
      >
        <p className="carousel-control-icons-labels">previous</p>
        <i className="fas fa-step-backward" />
      </button>

      <button
        className="play-control play-pause-container"
        onClick={() =>
          history.push(`/preview/${albums[selectedAlbum].title_id}`)
        }
        type="button"
      >
        <p className="carousel-control-icons-labels">play</p>
        <i className="fas fa-play" />
      </button>
      <button
        className="play-control next-track-btn-ctr"
        onClick={() => setSelectedAlbum((selectedAlbum + 1) % 9)}
        type="button"
      >
        <p className="carousel-control-icons-labels">next</p>
        <i className="fas fa-step-forward" />
      </button>
    </div>
  );
};

export default CarouselButtons;
