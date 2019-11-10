import { DECADES, DECADES_OPTIONS, LANGUAGES, LETTERS, LETTERS_OPTIONS, TAGS } from './../constants';

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

export const ADD_LANGUAGE = 'ADD_LANGUAGE';
export const REMOVE_LANGUAGE = 'REMOVE_LANGUAGE';
export const SET_LANGUAGES = 'SET_LANGUAGES';

// Play list
export const SET_PLAY_LIST = 'SET_PLAY_LIST';
export const SET_ACTUAL_SONG = 'SET_ACTUAL_SONG';
export const NEXT_SONG = 'NEXT_SONG';
export const PREV_SONG = 'PREV_SONG';

// Managed list
export const SET_MANAGED_LIST = 'SET_MANAGED_LIST';
export const EXCHANGE_POSITIONS = 'EXCHANGE_POSITIONS';
export const ADD_SONG = 'ADD_SONG';
export const REMOVE_SONG = 'REMOVE_SONG';

// Filtered list
export const SET_FILTERED_LIST = 'SET_FILTERED_LIST';
export const ADD_FILTERED_LIST = 'ADD_FILTERED_LIST';

// Personal lists
export const SET_PERSONAL_LISTS = 'SET_PERSONAL_LISTS';
export const ADD_PERSONAL_LISTS = 'ADD_PERSONAL_LISTS';
export const SET_PERSONAL_LIST = 'SET_PERSONAL_LIST';
export const SET_PERSONAL_LIST_CONTENT = 'SET_PERSONAL_LIST_CONTENT';
export const ADD_PERSONAL_LIST_CONTENT = 'ADD_PERSONAL_LIST_CONTENT';
export const REMOVE_PERSONAL_LIST_CONTENT = 'REMOVE_PERSONAL_LIST_CONTENT';

export const SET_NAME_LIST = 'SET_NAME_LIST';

const addLetter = payload => ({ type: ADD_LETTER, payload });
const removeLetter = payload => ({ type: REMOVE_LETTER, payload });
export const setLetters = payload => ({ type: SET_LETTERS, payload });

const addTag = payload => ({ type: ADD_TAG, payload });
const removeTag = payload => ({ type: REMOVE_TAG, payload });
export const setTags = payload => {
  return { type: SET_TAGS, payload };
};

const addDecade = payload => ({ type: ADD_DECADE, payload });
const removeDecade = payload => ({ type: REMOVE_DECADE, payload });
export const setDecades = payload => ({ type: SET_DECADES, payload });

const addLanguage = payload => ({ type: ADD_LANGUAGE, payload });
const removeLanguage = payload => ({ type: REMOVE_LANGUAGE, payload });
export const setLanguages = payload => {
  return { type: SET_LANGUAGES, payload };
};

export const setActualSong = payload => ({ type: SET_ACTUAL_SONG, payload });
export const setPlayList = payload => ({ type: SET_PLAY_LIST, payload });
export const nextSong = () => ({ type: NEXT_SONG, payload: null });
export const prevSong = () => ({ type: PREV_SONG, payload: null });
export const exchangePositions = payload => ({ type: EXCHANGE_POSITIONS, payload: payload });
export const removeSong = payload => ({ type: REMOVE_PERSONAL_LIST_CONTENT, payload: payload });

export const setFilteredList = payload => ({ type: SET_FILTERED_LIST, payload });
export const addFilteredList = payload => ({ type: ADD_FILTERED_LIST, payload });

export const setPersonalLists = payload => ({ type: SET_PERSONAL_LISTS, payload });
export const addPersonalLists = payload => ({ type: ADD_PERSONAL_LISTS, payload });
export const setPersonalList = payload => ({ type: SET_PERSONAL_LIST, payload });
export const setPersonalListContent = payload => ({ type: SET_PERSONAL_LIST_CONTENT, payload });
export const addPersonalListContent = payload => ({ type: ADD_PERSONAL_LIST_CONTENT, payload });

export const setNameList = payload => ({ type: SET_NAME_LIST, payload });

export const setOptions = payload => {
  const tags = TAGS;
  const decades = DECADES;
  const letters = LETTERS;
  const languages = LANGUAGES;
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
      case languages:
        return dispatch(requestLanguages());
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
      case LANGUAGES:
        return option => dispatch(addLanguage(option));
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
      case LANGUAGES:
        return option => dispatch(removeLanguage(option));
      default:
        return () => undefined;
    }
  };
};

const requestTags = () => {
  return (dispatch, getState) => {
    const url = `${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/tags/`;
    const state = getState();
    return fetch(url)
      .then(data => data.json())
      .then(data => {
        return dispatch(setTags(data.data));
      });
  };
};

const requestLanguages = () => {
  return (dispatch, getState) => {
    const url = `${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/languages/`;
    const state = getState();
    return fetch(url)
      .then(data => data.json())
      .then(data => {
        return dispatch(setLanguages(data.data));
      });
  };
};

export const requestSongs = () => {
  return (dispatch, getState) => {
    const state = getState();
    const query = state.filters.filterQuery || '';
    const url = `${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/songs/?${query}`;
    return fetch(url)
      .then(data => data.json())
      .then(data => {
        return dispatch(setFilteredList(data.data));
      });
  };
};
