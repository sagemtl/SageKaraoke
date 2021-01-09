import React from 'react';
import PropTypes from 'prop-types';
import HeaderDesktop from '../components/HeaderDesktop';
import HeaderMobile from '../components/HeaderMobile';

const Layout = ({ children }) => (
  <>
    <HeaderDesktop />
    <HeaderMobile />
    <div className="layout">{children}</div>
  </>
);

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Layout;
