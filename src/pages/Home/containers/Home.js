import React, { useState, useEffect } from 'react';
import { useGlobalContext } from 'global/context';
import { getAllSongs } from 'utils/ktvQueries';
import AlbumCarousel from '../components/AlbumCarousel';
import Leaderboards from '../components/Leaderboards';

const Home = () => {
  const globalContext = useGlobalContext();
  const [karaokeState] = globalContext.karaoke;
  const { selectedAlbum } = karaokeState;
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    getAllSongs().then((res) => {
      setAlbums(res);
    });
  }, []);

  return (
    <div className="home">
      <AlbumCarousel selectedAlbum={selectedAlbum} albums={albums} />
      {albums && <Leaderboards selectedAlbum={selectedAlbum} albums={albums} />}
    </div>
  );
};

export default Home;
