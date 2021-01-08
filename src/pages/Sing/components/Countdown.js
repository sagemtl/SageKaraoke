import React from 'react';
import PropTypes from 'prop-types';

const Countdown = ({ onComplete }) => {
  const [counter, setCounter] = React.useState(3);

  // Third Attempts
  React.useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  if (counter === 0) {
    onComplete();
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
