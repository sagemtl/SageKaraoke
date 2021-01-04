/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../../global/context';
import AlbumCarousel from '../components/AlbumCarousel';

const Home = () => {
  const globalContext = useGlobalContext();
  const [karaokeState, karaokeDispatch] = globalContext.karaoke;

  return (
    <div className="home">
      <AlbumCarousel />
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
    </div>
  );
};

export default Home;
