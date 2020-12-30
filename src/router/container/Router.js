import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from '../../pages/Home';
import Preview from '../../pages/Preview';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/preview/:name" component={Preview} />
    </Switch>
  </BrowserRouter>
);

export default Router;
