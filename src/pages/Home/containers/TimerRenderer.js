import React from 'react';
import VideoPage from './VideoPage';

const renderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return <VideoPage />;
  }
  // Render a countdown
  return (
    <span>
      {hours}:{minutes}:{seconds}
    </span>
  );
};

export default renderer;
