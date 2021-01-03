import React, { useState } from 'react';
import Countdown from './Countdown';
import Video from './Video';

const VideoPage = () => {
  const [complete, setComplete] = useState(false);
  return (
    <div className="home">
      <h1>VideoPage</h1>
      <Countdown onComplete={() => setComplete(true)} />
      <Video playing={complete} />
    </div>
  );
};
export default VideoPage;
