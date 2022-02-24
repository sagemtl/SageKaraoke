import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { useGlobalContext } from 'global/context';
import '../styles/headerDesktop.scss';

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

const HeaderDesktop = () => {
  const globalContext = useGlobalContext();
  const [karaokeState, karaokeDispatch] = globalContext.karaoke;
  const { navOpen } = karaokeState;

  const openNavbar = (open) => {
    karaokeDispatch({
      type: 'SET_NAVBAR_OPEN',
      payload: open,
    });
  };

  return (
    <div className="header-desktop">
      <div
        role="button"
        tabIndex={0}
        className={navOpen ? 'header-button--closed' : 'header-button'}
        onClick={() => openNavbar(true)}
        onKeyDown={() => openNavbar(true)}
      >
        <ArrowForwardIosIcon className="header-button__icon" />
      </div>
      <div className={navOpen ? 'navbox' : 'navbox--closed'}>
        <IconButton
          aria-label="close"
          className="header-desktop__close"
          size="small"
          onClick={() => openNavbar(false)}
          onKeyDown={() => openNavbar(false)}
        >
          <HighlightOffIcon fontSize="small" className="header-desktop__icon" />
        </IconButton>
        <a
          tabIndex={-1}
          onClick={() => openNavbar(false)}
          onKeyDown={() => openNavbar(false)}
          className="navbox-logo-wrapper"
          href="/"
        >
          <video
            src="/logo.mp4"
            className="navbox__logo"
            muted
            loop
            onMouseOver={(e) => e.target.play()}
            onFocus={(e) => e.target.play()}
            onMouseOut={(e) => e.target.pause()}
            onBlur={(e) => e.target.pause()}
          />
        </a>
        {routes.map((route) => (
          // eslint-disable-next-line react/jsx-no-target-blank
          <a
            className="navbox__link"
            href={route.to}
            key={route.id}
            target={route.external ? '_blank' : ''}
            rel={route.external ? 'noreferrer' : ''}
          >
            <h2 className="navbox__text">{route.label}</h2>
          </a>
        ))}
      </div>
    </div>
  );
};

export default HeaderDesktop;
