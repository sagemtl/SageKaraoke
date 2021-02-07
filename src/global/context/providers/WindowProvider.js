import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const WindowContext = createContext({});

export const WindowContextProvider = ({ children }) => {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const handleWindowResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  return (
    <WindowContext.Provider value={{ width, height }}>
      {children}
    </WindowContext.Provider>
  );
};

WindowContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useWindowContext = () => {
  const { width, height } = useContext(WindowContext);
  return { width, height };
};
