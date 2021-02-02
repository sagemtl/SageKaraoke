/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import Carousel from 'react-spring-3d-carousel';
import { useGlobalContext } from 'global/context';
import { getAllSongs } from 'utils/ktvQueries';

const AlbumCarousel = () => {
  const globalContext = useGlobalContext();
  const history = useHistory();
  const [karaokeState, karaokeDispatch] = globalContext.karaoke;
  const { selectedAlbum, albums } = karaokeState;

  useEffect(() => {
    getAllSongs().then((res) => {
      karaokeDispatch({
        type: 'SET_ALBUMS',
        payload: {
          albums: res,
        },
      });
    });
  }, [karaokeDispatch]);

  const setSelectedAlbum = (index) => {
    karaokeDispatch({
      type: 'SET_SELECTED_ALBUM',
      payload: {
        selectedAlbum: index,
      },
    });
  };

  const transformData = (data) => {
    const content = data.map((slide, index) => ({
      key: index,
      content: (
        <div className={selectedAlbum === index ? 'album--selected' : 'album'}>
          <h1 className="album__title">{slide.title}</h1>
          <p className="album__subtitle">{slide.artist}</p>
          <img src={slide.cover_photo} alt="test" className="album__cover" />
          {selectedAlbum === index && (
            <div className="album-hidden">
              <PlayCircleOutlineIcon
                className="album-hidden__button"
                style={{ fontSize: '5rem' }}
                onClick={() =>
                  history.push(`/preview/${albums[selectedAlbum].title_id}`)
                }
              />
            </div>
          )}
        </div>
      ),
    }));

    return content.map((slide, index) => ({
      ...slide,
      onClick: () => setSelectedAlbum(index),
    }));
  };

  return (
    <div style={{ width: '80%', height: '500px', margin: '0 auto' }}>
      <Carousel
        slides={transformData(albums)}
        goToSlide={selectedAlbum}
        offsetRadius={2}
      />
    </div>
  );
};

export default AlbumCarousel;
