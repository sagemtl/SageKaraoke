import React from 'react';
import PropTypes from 'prop-types';

import {
  KaraokeContextProvider,
  useKaraokeContext,
} from './providers/KaraokeProvider';
import {
  WindowContextProvider,
  useWindowContext,
} from './providers/WindowProvider';

export const GlobalContextProvider = ({ children }) => (
  <WindowContextProvider>
    <KaraokeContextProvider>{children}</KaraokeContextProvider>
  </WindowContextProvider>
);

GlobalContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useGlobalContext = () => ({
  karaoke: useKaraokeContext(),
  window: useWindowContext(),
});

export const useGlobalDispatch = () => ({});
