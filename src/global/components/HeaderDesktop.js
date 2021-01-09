import React from 'react';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { useGlobalContext } from 'global/context';
import '../styles/headerDesktop.scss';

const routes = [
  {
    label: 'Home',
    to: 'https://www.sagemontreal.com/',
  },
  {
    label: 'Boutique',
    to: 'https://www.sagemontreal.com/shop',
  },
];

const HeaderDesktop = () => {
  const globalContext = useGlobalContext();
  const [karaokeState, karaokeDispatch] = globalContext.karaoke;
  const { navOpen } = karaokeState;

  const openNavbar = (open) => {
    karaokeDispatch({
      type: 'SET_NAVBAR_OPEN',
      payload: {
        navOpen: open,
      },
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
        <header>
          <div
            role="button"
            tabIndex={-1}
            onClick={() => openNavbar(false)}
            onKeyDown={() => openNavbar(false)}
            className="navbox-logo-wrapper"
          >
            <video
              src="https://res.cloudinary.com/sagemontreal-com/video/upload/v1596165122/Logo_vyryy9.mp4"
              poster="https://sageimagebank.s3.ca-central-1.amazonaws.com/poster.gif"
              className="navbox__logo"
              muted
              playsInline
              loop
              onMouseOver={(e) => e.target.play()}
              onFocus={(e) => e.target.play()}
              onMouseOut={(e) => e.target.pause()}
              onBlur={(e) => e.target.pause()}
            />
          </div>
        </header>
        {routes.map((route) => (
          <a className="navbox__link" href={route.to}>
            <h2 className="navbox__text">{route.label}</h2>
          </a>
        ))}
      </div>
    </div>
  );
};

export default HeaderDesktop;
