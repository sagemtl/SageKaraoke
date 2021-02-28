// import Modal from 'react-modal';
import { useGlobalContext } from 'global/context';
import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
// import TextField from '@matesrial-ui/core/TextField';
import Slide from '@material-ui/core/Slide';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { updateLeaderboard } from 'utils/ktvQueries';
import ScoreRenderer from './ScoreRenderer';
import '../styles/resultsModal.scss';

const Transition = React.forwardRef((props, ref) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Slide direction="up" ref={ref} {...props} />
));

const FinalResultsModal = ({ titleid }) => {
  const globalContext = useGlobalContext();
  const [karaokeState, karaokeDispatch] = globalContext.karaoke;
  const { pitchScore, audioEnded, lyricsScore } = karaokeState;
  const [modal, setModal] = useState(false);
  const [nameLeaderboard, setNameLeaderboard] = useState('');
  const [rankMessage, setRankMessage] = useState('');
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

  const submitLeaderboard = async () => {
    const ranking = await updateLeaderboard(
      titleid,
      nameLeaderboard,
      getFinalScore(),
    );

    setRankMessage(`You placed ${ranking.rank} out of ${ranking.total}!`);
  };

  const submitWithKey = (e) => {
    if (e.charCode === 13) {
      submitLeaderboard();
    }
  };

  useEffect(() => {
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
          <h3 className="leaderboard-info">
            To display on the leaderboard, please enter your name
          </h3>
          <div className="contact-form">
            <p className="contact-form__label">Name:</p>
            <input
              name="message"
              type="text"
              onChange={(e) => setNameLeaderboard(e.target.value)}
              value={nameLeaderboard}
              className="contact-form__input"
            />
            <button
              type="button"
              onClick={submitLeaderboard}
              onKeyDown={submitWithKey}
              disabled={nameLeaderboard.length === 0}
              className="contact-form__button"
            >
              Send
            </button>
          </div>

          <h2 className="leaderboard-info__ranking">{rankMessage}</h2>
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

FinalResultsModal.propTypes = {
  titleid: PropTypes.string.isRequired,
};

export default FinalResultsModal;
