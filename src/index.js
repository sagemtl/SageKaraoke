import React from 'react';
import ReactDOM from 'react-dom';
<<<<<<< HEAD
// import Countdown from 'react-countdown';
// import Router from './router';
=======
import { GlobalContextProvider } from './global/context';
import Router from './router';
>>>>>>> 9adf6214fcb46be86a8030d208dfd2e528b9260a
import './styles/main.scss';
// import renderer from './pages/Home/containers/timer';
// import Router from './router/container/Router';
import Layout from './components/Layout';

ReactDOM.render(
<<<<<<< HEAD
  <React.StrictMode>
    <Layout />
    {/* <Countdown date={Date.now() + 5000} renderer={Router} />, */}
  </React.StrictMode>,
=======
  <GlobalContextProvider>
    <Router />
  </GlobalContextProvider>,
>>>>>>> 9adf6214fcb46be86a8030d208dfd2e528b9260a
  document.getElementById('root'),
);
