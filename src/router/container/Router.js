import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from 'pages/Home';
import Song from 'pages/Song';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/song/:songId" component={Song} />
    </Switch>
  </BrowserRouter>
);

export default Router;
