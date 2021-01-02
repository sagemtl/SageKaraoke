import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// import Home from 'pages/Home';
import Sing from 'pages/Sing';
import renderer from '../../pages/Home/containers/TimerRenderer';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={renderer} />
      {/* <Route exact path="/" component={Home} /> */}
      <Route exact path="/sing/:songTitle" component={Sing} />
    </Switch>
  </BrowserRouter>
);

export default Router;
