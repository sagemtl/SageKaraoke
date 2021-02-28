import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/resultsModal.scss';

const ScoreRenderer = ({ number }) => {
  const [count, setCount] = useState(0);
  // const [start, set]
  // const [increment, setIncrement] = useState(0);

  useEffect(() => {
    // for count = 3, number = 10, increment should = 7
    if (number) {
      let start = count; // count = number at which each cycle starts at
      const incrementTime = 80;

      const timer = setInterval(() => {
        start += 1; // increment start until start = number, then stop interval
        setCount(start);
        if (start === Math.floor(number)) clearInterval(timer);
      }, incrementTime);

      setCount(number); // set count to number value
    }
  }, [number, count]);

  return (
    <div className="Count">
      <h1 className="final-score">
        <i>{count * 5}</i>
        {/* <i>{value}</i> */}
      </h1>
    </div>
  );
};

ScoreRenderer.propTypes = {
  number: PropTypes.number.isRequired,
};

export default ScoreRenderer;
