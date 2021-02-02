/* eslint-disable no-nested-ternary */
import React from 'react';
import { useGlobalContext } from 'global/context';
import { useLocation } from 'react-router-dom';
import CarouselButtons from '../components/CarouselButtons';
import PreviewButtons from '../components/PreviewButtons';
import SingButtons from '../components/SingButtons';
import '../styles/controls.scss';

const Controls = () => {
  const globalContext = useGlobalContext();
  const [karaokeState, karaokeDispatch] = globalContext.karaoke;
  const { controlOpen } = karaokeState;
  let location = useLocation();

  // eslint-disable-next-line prefer-destructuring
  location = location.pathname.split('/')[1]; // outputs currently active route

  const toggleOpen = () => {
    karaokeDispatch({
      type: 'SET_CONTROL_CENTER_OPEN',
      payload: !controlOpen,
    });
  };

  return (
    <div
      className={
        controlOpen ? 'control-center__open' : 'control-center__hidden'
      }
    >
      <div
        role="button"
        tabIndex={0}
        onClick={toggleOpen}
        onKeyDown={toggleOpen}
        className="control-dismiss-tab"
      >
        <b>{controlOpen ? 'hide' : 'show'}</b>
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
