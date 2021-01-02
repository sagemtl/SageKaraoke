import React from 'react';
import sample from '../video/small.mp4';

const video = () => (
  <video id="myVideo" className="videoTag" autoPlay loop muted>
    <source src={sample} type="video/mp4" />
  </video>
);

export default video;
