/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import AudioInput from 'components/Audio/AudioInput';
import { useGlobalContext } from 'global/context';

const Home = () => {
  const globalContext = useGlobalContext();
  const [karaokeState, karaokeDispatch] = globalContext.karaoke;

  return (
    <div className="home">
      <h1>Home</h1>
      <Link to="/sing/yue-liang-dai-biao-wo-de-xin">月亮代表我的心</Link>
      <h1>{karaokeState.test}</h1>
      <button
        type="button"
        onClick={() => {
          karaokeDispatch({ type: 'SET_TEST', payload: karaokeState.test + 1 });
        }}
      >
        Increment
      </button>
      <AudioInput />
    </div>
  );
};

export default Home;
