import React, { useState } from 'react';
import classNames from 'classnames';
import '../../styles/controls.scss';

const Controls = () => {
  const [hidden, setHidden] = useState(false);

  const toggleHidden = () => {
    setHidden(!hidden);
  };

  return (
    <div
      className={classNames('control-center', {
        'control-center--hidden': hidden,
      })}
    >
      <div
        role="button"
        tabIndex={0}
        onClick={toggleHidden}
        onKeyDown={toggleHidden}
        className="control-dismiss-tab"
      >
        <b>{hidden ? 'show' : 'hide'}</b>
      </div>
    </div>
  );
};

export default Controls;
