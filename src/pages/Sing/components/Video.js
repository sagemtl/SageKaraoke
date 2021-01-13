import React from 'react';
import ReactPlayer from 'react-player';

const video = ({ playing, songName, origVoiceOn }) => (
  <div>
    <ReactPlayer
      url={`${process.env.PUBLIC_URL}/${songName}/${songName}_mv.mp4`}
      playing={playing}
      muted
    />
    <ReactPlayer
      url={`${process.env.PUBLIC_URL}/${songName}/${songName}_music.mp3`}
      playing={playing}
      controls
    />
    {/* vocals */}
    <ReactPlayer
      url={`${process.env.PUBLIC_URL}/${songName}/${songName}_vocals.mp3`}
      playing={playing}
      muted={!origVoiceOn}
      controls
    />
  </div>
);
export default video;
