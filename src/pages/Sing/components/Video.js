import React from 'react';
import ReactPlayer from 'react-player';

const video = ({ playing }) => {
  console.log(playing);
  return (
    <ReactPlayer
      url="http://techslides.com/demos/sample-videos/small.mp4"
      playing={playing}
      muted
    />
  );
};
export default video;
