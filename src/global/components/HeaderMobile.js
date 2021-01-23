import React, { useState } from 'react';
import InstagramIcon from '@material-ui/icons/Instagram';
import Drawer from '@material-ui/core/Drawer';
import '../styles/headerMobile.scss';

const routes = [
  {
    id: 1,
    label: 'Home',
    to: '/',
    external: false,
  },
  {
    id: 2,
    label: 'Boutique',
    to: 'https://www.sagemontreal.com/shop',
    external: true,
  },
];

const HeaderMobile = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="header-mobile">
      <Drawer open={open} onClose={() => setOpen(!open)}>
        <div className="header-mobile-drawer">
          {routes.map((route) => (
            // eslint-disable-next-line react/jsx-no-target-blank
            <a
              className="header-mobile__link"
              href={route.to}
              key={route.id}
              target={route.external ? '_blank' : ''}
              rel={route.external ? 'noreferrer' : ''}
            >
              <h2>{route.label}</h2>
            </a>
          ))}
          <hr className="header-mobile__separator" />
          <a
            href="https://www.instagram.com/sagemtl/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon className="header-mobile__icon" />
          </a>
        </div>
      </Drawer>
      <div
        role="button"
        tabIndex={0}
        className="header-mobile__logo-button"
        onClick={() => setOpen(true)}
        onKeyDown={() => setOpen(true)}
      >
        <img
          className="header-mobile__logo"
          src="https://sageimagebank.s3.ca-central-1.amazonaws.com/sage-animated.gif"
          alt="Sage Mobile Logo"
        />
      </div>
    </div>
  );
};

export default HeaderMobile;
