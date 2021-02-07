import React from 'react';
import { useGlobalContext } from 'global/context';
import AlbumCarousel from '../components/AlbumCarousel';
import Leaderboards from '../components/Leaderboards';

const Home = () => {
  const globalContext = useGlobalContext();
  const [karaokeState] = globalContext.karaoke;
  const { selectedAlbum, albums } = karaokeState;

  return (
    <div className="home">
      <AlbumCarousel selectedAlbum={selectedAlbum} albums={albums} />
      {albums && <Leaderboards selectedAlbum={selectedAlbum} albums={albums} />}
    </div>
  );
};

export default Home;
