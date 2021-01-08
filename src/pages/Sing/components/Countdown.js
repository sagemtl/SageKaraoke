import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Countdown = ({ onComplete }) => {
  const [counter, setCounter] = useState(3);

  useEffect(() => {
    if (counter > 0) setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  if (counter === 0) {
    onComplete(true);
    return null;
  }
  return (
    <div className="App">
      <div>Countdown: {counter}</div>
    </div>
  );
};

Countdown.propTypes = {
  onComplete: PropTypes.func.isRequired,
};
export default Countdown;
