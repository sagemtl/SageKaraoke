import React, {
  createContext,
  useReducer,
  useContext,
  useEffect,
  useState,
} from 'react';
import { getAllSongs } from 'utils/ktvQueries';
import PropTypes from 'prop-types';

const KaraokeContext = createContext();

const initialState = {
  navOpen: true,
  controlOpen: true,
  playSong: false,
  origVoiceOn: true,
  audioTime: 0,
  audioEnded: false,
  lyricsScore: 0,
  selectedAlbum: 0,
  pinyinOn: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_PLAYSONG':
      return { ...state, playSong: action.payload.playSong };
    case 'SET_ORIGINAL_VOICE_ON':
      return { ...state, origVoiceOn: action.payload.origVoiceOn };
    case 'SET_AUDIO_TIME':
      return { ...state, audioTime: action.payload };
    case 'SET_AUDIO_ENDED':
      return { ...state, audioEnded: action.payload };
    case 'SET_LYRICS_SCORE':
      return { ...state, lyricsScore: action.payload };
    case 'SET_NAVBAR_OPEN':
      return { ...state, navOpen: action.payload };
    case 'SET_CONTROL_CENTER_OPEN':
      return { ...state, controlOpen: action.payload };
    case 'SET_SELECTED_ALBUM':
      return { ...state, selectedAlbum: action.payload.selectedAlbum };
    case 'SET_PINYIN_ON':
      return { ...state, pinyinOn: action.payload.pinyinOn };
    default:
      return null;
  }
};

export const KaraokeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    getAllSongs().then((res) => setAlbums(res));
  }, []);

  return (
    <KaraokeContext.Provider value={[{ ...state, albums }, dispatch]}>
      {children}
    </KaraokeContext.Provider>
  );
};

KaraokeContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useKaraokeContext = () => useContext(KaraokeContext);
