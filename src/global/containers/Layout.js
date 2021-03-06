import React from 'react';
import PropTypes from 'prop-types';
import HeaderDesktop from '../components/HeaderDesktop';
import HeaderMobile from '../components/HeaderMobile';
import Controls from '../../components/Controls/containers/Controls';

const Layout = ({ children }) => (
  <>
    <HeaderDesktop />
    <HeaderMobile />
    <div className="layout">{children}</div>
    <Controls />
  </>
);

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Layout;
