import React from 'react';
import PropTypes from 'prop-types';

import {
  KaraokeContextProvider,
  useKaraokeContext,
} from './providers/KaraokeProvider';

export const GlobalContextProvider = ({ children }) => (
  <KaraokeContextProvider>{children}</KaraokeContextProvider>
);

GlobalContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useGlobalContext = () => ({
  karaoke: useKaraokeContext(),
});

export const useGlobalDispatch = () => ({});
