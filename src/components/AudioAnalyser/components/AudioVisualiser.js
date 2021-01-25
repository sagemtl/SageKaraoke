import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/AudioVisualiser.scss';

class AudioVisualiser extends Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
    this.mobile = window.innerWidth < 600;
  }

  componentDidUpdate() {
    this.draw();
  }

  draw() {
    const { audioData } = this.props;
    const canvas = this.canvas.current;
    const { height } = canvas;
    const { width } = canvas;
    const context = canvas.getContext('2d');
    let x = 0;
    const sliceWidth = (width * 1.0) / audioData.length;

    context.lineWidth = 2;
    context.strokeStyle = '#FFFFFF';
    context.clearRect(0, 0, width, height);

    context.beginPath();
    context.moveTo(0, height / 2);
    audioData.forEach((item) => {
      const y = (item / 255.0) * height;
      context.lineTo(x, y);
      x += sliceWidth;
    });
    context.lineTo(x, height / 2);
    context.stroke();
  }

  render() {
    return (
      <div className="audio-visuals">
        <canvas
          width={window.innerWidth * 0.8}
          height={window.innerHeight * 0.2}
          ref={this.canvas}
        />
      </div>
    );
  }
}

AudioVisualiser.propTypes = {
  audioData: PropTypes.instanceOf(Uint8Array).isRequired,
};

export default AudioVisualiser;
