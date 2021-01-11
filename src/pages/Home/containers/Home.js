/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useGlobalContext } from '../../../global/context';
import AlbumCarousel from '../components/AlbumCarousel';

const Home = () => {
  const globalContext = useGlobalContext();
  const [karaokeState, karaokeDispatch] = globalContext.karaoke;

  useEffect(() => {
    console.log(`test is ${karaokeState.test}`);
  });
  return (
    <div className="home">
      <AlbumCarousel />
    </div>
  );
};

export default Home;
