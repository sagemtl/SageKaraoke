import React from 'react';
import ReactPlayer from 'react-player';

const video = ({ playing, songName, origVoiceOn, onTimeUpdate, onEnded }) => (
  <div className="video">
    <ReactPlayer
      url={`${process.env.PUBLIC_URL}/${songName}/${songName}_mv.mp4`}
      playing={playing}
      muted
      className="video__video"
    />
    {/* music */}
    <ReactPlayer
      url={`${process.env.PUBLIC_URL}/${songName}/${songName}_music.mp3`}
      playing={playing}
      onTimeUpdate={onTimeUpdate}
      onEnded={onEnded}
    />
    {/* vocals */}
    <ReactPlayer
      url={`${process.env.PUBLIC_URL}/${songName}/${songName}_vocals.mp3`}
      playing={playing}
      muted={!origVoiceOn}
    />
  </div>
);
export default video;
