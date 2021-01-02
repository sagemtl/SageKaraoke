import React from 'react';
import Video from './Video';

class VideoPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      play: false,
    };
  }

  componentDidMount = () => {
    setTimeout(this.togglePlay(), 500);
  };

  togglePlay() {
    this.setState((state) => ({ play: !state.play }));
  }

  render() {
    return (
      <div className="home">
        <h1>VideoPage</h1>
        <Video />
      </div>
    );
  }
}

export default VideoPage;
