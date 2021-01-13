/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';
import CarouselButtons from './CarouselButtons';
import PreviewButtons from './PreviewButtons';
import SingButtons from './SingButtons';
import '../../../styles/controls.scss';

const Controls = () => {
  const [hidden, setHidden] = useState(false);
  let location = useLocation();
  // eslint-disable-next-line prefer-destructuring
  location = location.pathname.split('/')[1]; // outputs currently active route

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
      {!location ? (
        <CarouselButtons />
      ) : location === 'preview' ? (
        <PreviewButtons />
      ) : (
        <SingButtons />
      )}
    </div>
  );
};

export default Controls;
