import React from 'react';
import logo from '../assets/logo.png';
import '../styles/App.css';
import AudioInput from './Audio/AudioInput';

const App = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit
        <code>src/App.js</code> and save to reload.
      </p>
      <AudioInput />
    </header>
  </div>
);

export default App;
