import React, { createContext, useReducer, useContext } from 'react';
import PropTypes from 'prop-types';

const KaraokeContext = createContext();

const initialState = {
  navOpen: true,
  audioTime: 0,
  audioEnded: false,
  lyricsScore: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_AUDIO_TIME':
      return { ...state, audioTime: action.payload };
    case 'SET_AUDIO_ENDED':
      return { ...state, audioEnded: action.payload };
    case 'SET_LYRICS_SCORE':
      return { ...state, lyricsScore: action.payload };
    case 'SET_NAVBAR_OPEN':
      return { ...state, navOpen: action.payload };
    default:
      return null;
  }
};

export const KaraokeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <KaraokeContext.Provider value={[state, dispatch]}>
      {children}
    </KaraokeContext.Provider>
  );
};

KaraokeContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useKaraokeContext = () => useContext(KaraokeContext);
