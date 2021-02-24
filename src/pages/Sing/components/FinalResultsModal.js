// import Modal from 'react-modal';
import { useGlobalContext } from 'global/context';
import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
// import TextField from '@matesrial-ui/core/TextField';
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
  const [nameLeaderboard, setNameLeaderboard] = useState('');
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

  const submitLeaderboard = (event) => {
    console.log(`entered name ${nameLeaderboard}`);

    event.preventDefault();
  };

  useEffect(() => {
    console.log(audioEnded);
    if (true) {
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
          <ScoreRenderer number={getFinalScore()} />
          <div className="leaderboard-info">
            To display on the leaderboard, please enter your name
          </div>
          <form onSubmit={(e) => submitLeaderboard(e)}>
            <label htmlFor="nameLeaderboard">
              Name:
              <input
                id="nameLeaderboard"
                type="text"
                name="name"
                value={nameLeaderboard}
                onChange={(e) => setNameLeaderboard(e.target.value)}
              />
            </label>
            <input type="submit" value="Submit" />
          </form>
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
