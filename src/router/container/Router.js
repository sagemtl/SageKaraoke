import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import Preview from 'pages/Preview';
import Home from 'pages/Home';
import Sing from 'pages/Sing';
import RouteWrapper from '../components/RouteWrapper';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <RouteWrapper exact path="/" component={Home} />
      <RouteWrapper exact path="/preview/:songName" component={Preview} />
      <RouteWrapper exact path="/sing/:songTitle" component={Sing} />
    </Switch>
  </BrowserRouter>
);

export default Router;
