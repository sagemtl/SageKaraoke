import React from 'react';
import ReactPlayer from 'react-player';
import '../styles/video.scss';

const video = ({
  playing,
  songName,
  origVoiceOn,
  onTimeUpdate,
  onEnded,
  videoRef,
}) => (
  <>
    <video muted className="video-mv" ref={videoRef}>
      <source
        type="video/mp4"
        src={`${process.env.PUBLIC_URL}/${songName}/${songName}_mv.mp4`}
      />
    </video>
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
