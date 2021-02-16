import React from 'react';
import ReactPlayer from 'react-player';

const video = ({ playing, songName, origVoiceOn, onTimeUpdate, onEnded }) => (
  <>
    <ReactPlayer
      url={`${process.env.PUBLIC_URL}/${songName}/${songName}_mv.mp4`}
      playing={playing}
      muted
      style={{
        minWidth: '110vw',
        minHeight: '110vh',
        objectFit: 'cover',
        zIndex: -10,
        position: 'fixed',
        margin: 'auto',
        textAlign: 'center',
        backgroundSize: 'cover',
        top: '-3em',
      }}
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
  </>
);
export default video;
