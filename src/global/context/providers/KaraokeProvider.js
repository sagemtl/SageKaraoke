import React, { createContext, useReducer, useContext } from 'react';
import PropTypes from 'prop-types';

const KaraokeContext = createContext();

// TODO: Add global intitial states here

const initialState = {
  test: 0,
  playSong: false,
  origVoiceOn: true,
};

// TODO: Add global state modifier functions here

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_TEST':
      return { ...state, test: action.payload.test };
    case 'SET_PLAYSONG':
      return { ...state, playSong: action.payload.playSong };
    case 'SET_ORIGINAL_VOICE_ON':
      return { ...state, origVoiceOn: action.payload.origVoiceOn };
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
