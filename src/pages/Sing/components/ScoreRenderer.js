import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const ScoreRenderer = ({ number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
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
      if (start === number) clearInterval(timer);
    }, incrementTime);
  }, [number]);

  return (
    <div className="Count">
      <h3>
        <i>{count}</i>
      </h3>
    </div>
  );
};

ScoreRenderer.propTypes = {
  number: PropTypes.number.isRequired,
};

export default ScoreRenderer;
