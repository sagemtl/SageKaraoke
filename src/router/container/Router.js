import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import renderer from '../../pages/Home/containers/TimerRenderer';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={renderer} />
    </Switch>
  </BrowserRouter>
);

export default Router;
