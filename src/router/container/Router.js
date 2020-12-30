import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from '../../pages/Home';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/preview" component={Home} />
    </Switch>
  </BrowserRouter>
);

export default Router;
