import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/resultsModal.scss';
import { useGlobalContext } from '../../../global/context';

const ScoreRenderer = ({ number }) => {
  const [count, setCount] = useState(0);
  const globalContext = useGlobalContext();
  const [karaokeState] = globalContext.karaoke;
  const { lyricsScore } = karaokeState;

  useEffect(() => {
    if (number) {
      console.log(
        `getPrevLyricsScore in score renderer (increment)= ${number}`,
      );
      let start = Math.round(lyricsScore) - number;
      console.log(`start= ${start}`);
      console.log(`lyricsScore= ${lyricsScore}`);

      // first three numbers from props
      // if zero, return
      if (start === number) return;

      // find duration per increment
      const incrementTime = (5 / number) * 1000;

      // timer increments start counter
      // then updates count
      // ends if start reaches end
      const timer = setInterval(() => {
        start += 1;
        setCount(String(start));
        // console.log(count);
        if (start === Math.floor(lyricsScore)) clearInterval(timer);
      }, incrementTime);
    }
  }, [number]);

  return (
    <div className="Count">
      <h1 className="final-score">
        <i>{count}</i>
        {/* <i>{value}</i> */}
      </h1>
    </div>
  );
};

ScoreRenderer.propTypes = {
  number: PropTypes.number.isRequired,
};

export default ScoreRenderer;
