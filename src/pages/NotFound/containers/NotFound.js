import React from 'react';
import '../styles/notFound.scss';

const NotFound = () => (
  <div className="not-found">
    <img
      src="/404-octopus.png"
      alt="404 Not Found"
      className="octopus-image"
    />
    <div className="not-found-title">404 | NOT FOUND</div>
    <p className="not-found-content">
      You just hit a route that doesn&apos;t exist... the sadness.
    </p>
  </div>
);

export default NotFound;
