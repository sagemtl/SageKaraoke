import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Preview from 'pages/Preview';
import Home from 'pages/Home';
import Sing from 'pages/Sing';
import Controls from '../../components/Controls/containers/Controls';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/preview/:songName" component={Preview} />
      <Route exact path="/sing/:songTitle" component={Sing} />
    </Switch>
    <Controls />
  </BrowserRouter>
);

export default Router;
