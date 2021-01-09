import React from 'react';
import { Route } from 'react-router-dom';
import Layout from 'global/containers/Layout';

// eslint-disable-next-line react/prop-types
const RouteWrapper = ({ component: Component, ...rest }) => (
  <Route
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...rest}
    render={() => (
      <Layout>
        <Component />
      </Layout>
    )}
  />
);

export default RouteWrapper;
