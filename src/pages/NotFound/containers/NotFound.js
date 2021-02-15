import React from 'react';
import '../styles/notFound.scss';

const NotFound = () => (
  <div className="not-found">
    <img
      src="https://res.cloudinary.com/die52atcc/image/upload/v1613361014/output-onlinepngtools_lshu3u.png"
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
