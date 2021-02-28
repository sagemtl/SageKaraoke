// import Modal from 'react-modal';
import { useGlobalContext } from 'global/context';
import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import { useHistory } from 'react-router-dom';
import ScoreRenderer from './ScoreRenderer';
import '../styles/resultsModal.scss';

const Transition = React.forwardRef((props, ref) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Slide direction="up" ref={ref} {...props} />
));

const FinalResultsModal = () => {
  const globalContext = useGlobalContext();
  const [karaokeState, karaokeDispatch] = globalContext.karaoke;
  const { pitchScore, audioEnded, lyricsScore } = karaokeState;
  const [modal, setModal] = useState(false);
  const history = useHistory();

  const closeModal = () => {
    setModal(false);
  };

  const returnHome = () => {
    history.push('/');
    karaokeDispatch({
      type: 'SET_AUDIO_ENDED',
      payload: false,
    });
  };

  const restartSong = () => {
    history.go(0);
  };

  const getFinalScore = () => {
    if (pitchScore) {
      return Math.round(0.5 * lyricsScore + 0.5 * pitchScore);
    }
    return Math.round(lyricsScore);
  };

  useEffect(() => {
    console.log(audioEnded);
    if (audioEnded) {
      setModal(true);
    }
  }, [audioEnded]);

  useEffect(
    () => () => {
      karaokeDispatch({
        type: 'SET_AUDIO_ENDED',
        payload: false,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <>
      <Dialog
        open={modal}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        onClose={closeModal}
        maxWidth="sm"
        transitionDuration={{ enter: 2000, exit: 1000 }}
        fullWidth
      >
        <div className="modal-content">
          <img
            className="score-results-title"
            src="https://res.cloudinary.com/sagemontreal-com/image/upload/v1612838969/final-score_lbohbx.png"
            alt="Your Score Is"
          />
          <ScoreRenderer number={Math.round(getFinalScore())} />
          <div className="buttons">
            <button
              className="return-home-btn"
              onClick={returnHome}
              type="button"
            >
              <i className="fas fa-home home-btn" />
              <h1 className="buttons-label">Return Home</h1>
            </button>
            <button
              className="return-home-btn"
              onClick={restartSong}
              type="button"
            >
              <i className="fas fa-redo home-btn" />
              <h1 className="buttons-label">Try Again</h1>
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default FinalResultsModal;
