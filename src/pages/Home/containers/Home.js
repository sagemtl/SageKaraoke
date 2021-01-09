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
    </div>
  );
};

export default Home;
