import React from 'react';
import ReactPlayer from 'react-player';

const video = ({
  playing,
  songName,
  origVoiceOn,
  onTimeUpdate,
  onEnded,
  mobile,
}) => (
  <>
    <ReactPlayer
      url={`${process.env.PUBLIC_URL}/${songName}/${songName}_mv.mp4`}
      playing={playing}
      muted
      height={mobile ? '100vh' : 'auto'}
      width={mobile ? 'auto' : '100vw'}
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
