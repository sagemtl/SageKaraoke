/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from 'global/context';
import Controls from '../../../components/Controls/Controls';

const Home = () => {
  const globalContext = useGlobalContext();
  const [karaokeState, karaokeDispatch] = globalContext.karaoke;

  useEffect(() => {
    console.log(`test is ${karaokeState.test}`);
  });
  return (
    <div className="home">
      <h1>Home</h1>
      <div>
        <Link to="/preview/yue-liang-dai-biao">月亮代表我的心 preview</Link>
      </div>
      <Link to="/sing/yue-liang-dai-biao">月亮代表我的心</Link>
      <h1>{karaokeState.test}</h1>
      <button
        type="button"
        onClick={() => {
          karaokeDispatch({
            type: 'SET_TEST',
            payload: { test: karaokeState.test + 1 },
          });
        }}
      >
        Increment
      </button>
      <Controls />
    </div>
  );
};

export default Home;
