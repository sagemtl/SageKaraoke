import React, { useState } from 'react';
import Carousel from 'react-spring-3d-carousel';
import AlbumCover1 from 'assets/albumCover1.jpg';

const AlbumCarousel = () => {
  const [album, setAlbum] = useState(0);

  const albums = [
    {
      title: 'The Moon Represents my Heart',
      artist: 'Teresa Teng',
      coverImage: AlbumCover1,
    },
    {
      title: 'Friends',
      artist: 'Emil Wakin Chau',
      coverImage: AlbumCover1,
    },
    {
      title: 'Take me to your heart',
      artist: 'Michael Learns to Rock',
      coverImage: AlbumCover1,
    },
    {
      title: 'Red Bean',
      artist: 'Faye Wong',
      coverImage: AlbumCover1,
    },
    {
      title: 'Yi Jian Mei',
      artist: 'Fei Yu Ching',
      coverImage: AlbumCover1,
    },
    {
      title: '光辉岁月',
      artist: 'Beyond',
      coverImage: AlbumCover1,
    },
    {
      title: '上海滩',
      artist: '叶丽仪',
      coverImage: AlbumCover1,
    },
    {
      title: 'Ju Hua Tai',
      artist: 'Jay Chou',
      coverImage: AlbumCover1,
    },
    {
      title: 'Nobody',
      artist: 'Wonder Girls',
      coverImage: AlbumCover1,
    },
    {
      title: 'Tong Hua',
      artist: 'Michael',
      coverImage: '',
    },
  ];

  const transformData = (data) => {
    const content = data.map((slide, index) => ({
      key: index,
      content: (
        <div className="album">
          <h1 className="album__title">{slide.title}</h1>
          <p className="album__subtitle">{slide.artist}</p>
          <img src={AlbumCover1} alt="test" className="album__cover" />
        </div>
      ),
    }));

    return content.map((slide, index) => ({
      ...slide,
      onClick: () => setAlbum(index),
    }));
  };

  return (
    <div style={{ width: '80%', height: '500px', margin: '0 auto' }}>
      <Carousel
        slides={transformData(albums)}
        goToSlide={album}
        offsetRadius={2}
      />
    </div>
  );
};

export default AlbumCarousel;
