import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Preview from 'pages/Preview';
import Home from 'pages/Home';
import Sing from 'pages/Sing';
import Layout from 'global/containers/Layout';

const Router = () => (
  <BrowserRouter>
    <Layout>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/preview/:songName" component={Preview} />
        <Route exact path="/sing/:songTitle" component={Sing} />
      </Switch>
    </Layout>
  </BrowserRouter>
);

export default Router;
