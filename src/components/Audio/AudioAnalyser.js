import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AudioVisualiser from './AudioVisualiser';
import getScore from '../../utils/score';

class AudioAnalyser extends Component {
  constructor(props) {
    super(props);
    const { lang } = props;
    this.state = { audioData: new Uint8Array(0) };
    this.tick = this.tick.bind(this);

    this.recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition ||
      window.mozSpeechRecognition ||
      window.msSpeechRecognition)();

    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = lang;

    this.recognition.start();

    console.log(this.recognition);

    this.recognition.onresult = (event) => {
      const result = event.results[event.results.length - 1];
      if (result.isFinal) {
        console.log(result[0].transcript);
        const score = getScore(result[0].transcript);
        console.log(score);
      }
    };

    // this.recognition.onend = () => {
    //   this.recognition.stop();
    // };
  }

  componentDidMount() {
    this.audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    this.analyser = this.audioContext.createAnalyser();
    // this.analyser.fftSize = 256;
    this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    const { audio } = this.props;
    this.source = this.audioContext.createMediaStreamSource(audio);
    this.source.connect(this.analyser);
    this.rafId = requestAnimationFrame(this.tick);
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.rafId);
    this.analyser.disconnect();
    this.source.disconnect();
    this.recognition.stop();
  }

  tick() {
    this.analyser.getByteTimeDomainData(this.dataArray);
    this.setState({ audioData: this.dataArray });
    this.rafId = requestAnimationFrame(this.tick);
  }

  render() {
    const { audioData } = this.state;
    return <AudioVisualiser audioData={audioData} />;
  }
}

AudioAnalyser.propTypes = {
  audio: PropTypes.objectOf(PropTypes.object).isRequired,
  lang: PropTypes.string.isRequired,
};

export default AudioAnalyser;
