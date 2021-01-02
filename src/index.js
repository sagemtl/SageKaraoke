import React from 'react';
import ReactDOM from 'react-dom';
// import Countdown from 'react-countdown';
// import Router from './router';
import './styles/main.scss';
// import renderer from './pages/Home/containers/timer';
// import Router from './router/container/Router';
import Layout from './components/Layout';

ReactDOM.render(
  <React.StrictMode>
    <Layout />
    {/* <Countdown date={Date.now() + 5000} renderer={Router} />, */}
  </React.StrictMode>,
  document.getElementById('root'),
);
