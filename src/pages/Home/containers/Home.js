/* eslint-disable no-unused-vars */
import React from 'react';
import { useGlobalContext } from '../../../global/context';

const Home = () => {
  const globalContext = useGlobalContext();
  const [karaokeState, karaokeDispatch] = globalContext.karaoke;

  return (
    <div className="home">
      <h1>Home</h1>
      <h1>{karaokeState.test}</h1>
      <button
        type="button"
        onClick={() => {
          karaokeDispatch({ type: 'SET_TEST', payload: karaokeState.test + 1 });
        }}
      >
        Increment
      </button>
    </div>
  );
};

export default Home;
