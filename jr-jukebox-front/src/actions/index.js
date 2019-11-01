import { DECADES, DECADES_OPTIONS, LETTERS, LETTERS_OPTIONS, TAGS } from './../constants';

// Filters
export const ADD_LETTER = 'ADD_LETTER';
export const REMOVE_LETTER = 'REMOVE_LETTER';
export const SET_LETTERS = 'SET_LETTERS';

export const ADD_TAG = 'ADD_TAG';
export const REMOVE_TAG = 'REMOVE_TAG';
export const SET_TAGS = 'SET_TAGS';

export const ADD_DECADE = 'ADD_DECADE';
export const REMOVE_DECADE = 'REMOVE_DECADE';
export const SET_DECADES = 'SET_DECADES';

// Play list
export const SET_PLAY_LIST = 'SET_PLAY_LIST';
export const SET_ACTUAL_SONG = 'SET_ACTUAL_SONG';
export const NEXT_SONG = 'NEXT_SONG';

// Managed list
export const SET_MANAGED_LIST = 'SET_MANAGED_LIST';
export const EXCHANGE_POSITIONS = 'EXCHANGE_POSITIONS';
export const ADD_SONG = 'ADD_SONG';
export const REMOVE_SONG = 'REMOVE_SONG';

// Filtered list
export const SET_FILTERED_LIST = 'SET_FILTERED_LIST';

// Personal lists
export const SET_PERSONAL_LISTS = 'SET_PERSONAL_LISTS';

const addLetter = payload => ({ type: ADD_LETTER, payload });
const removeLetter = payload => ({ type: REMOVE_LETTER, payload });
export const setLetters = payload => ({ type: SET_LETTERS, payload });

const addTag = payload => ({ type: ADD_TAG, payload });
const removeTag = payload => ({ type: REMOVE_TAG, payload });
export const setTags = payload => {
  setLetters(payload);
  return { type: SET_TAGS, payload };
};

const addDecade = payload => ({ type: ADD_DECADE, payload });
const removeDecade = payload => ({ type: REMOVE_DECADE, payload });
export const setDecades = payload => ({ type: SET_DECADES, payload });

const setActualSong = payload => ({ type: SET_ACTUAL_SONG, payload });
const nextSong = () => ({ type: NEXT_SONG, payload: null });

export const setOptions = payload => {
  const tags = TAGS;
  const decades = DECADES;
  const letters = LETTERS;
  const letters_option = LETTERS_OPTIONS;
  const decades_options = DECADES_OPTIONS;
  return dispatch => {
    switch (payload) {
      case letters:
        return dispatch(setLetters(letters_option));
      case tags:
        return dispatch(requestTags());
      case decades:
        return dispatch(setDecades(decades_options));
      default:
        return [];
    }
  };
};

export const addOption = payload => {
  return dispatch => {
    switch (payload) {
      case LETTERS:
        return option => dispatch(addLetter(option));
      case TAGS:
        return option => dispatch(addTag(option));
      case DECADES:
        return option => dispatch(addDecade(option));
      default:
        return [];
    }
  };
};

export const removeOption = payload => {
  return dispatch => {
    switch (payload) {
      case LETTERS:
        return option => dispatch(removeLetter(option));
      case TAGS:
        return option => dispatch(removeTag(option));
      case DECADES:
        return option => dispatch(removeDecade(option));
      default:
        return () => undefined;
    }
  };
};

const requestTags = () => {
  return (dispatch, getState) => {
    const url = `${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/tags/`;
    // activar en el estado un indicador de busqueda de datos
    //dispatch(setCity(payload));
    const state = getState();
    const queryString = state;
    return fetch(url)
      .then(data => data.json())
      .then(data => {
        return dispatch(setTags(data.data));
      });
  };
};
