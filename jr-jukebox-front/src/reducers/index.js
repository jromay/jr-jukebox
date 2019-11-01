import { combineReducers } from 'redux';
import { createSelector } from 'reselect';

import { DECADES, LETTERS, TAGS } from './../constants';
import { filteredList, getFilteredList as _getFilteredList } from './filteredList';
import { filters, getDecades as _getDecades, getLetters as _getLetters, getTags as _getTags } from './filters';
import { getManagedList as _getManagedList, managedList } from './managedList';
import { getPersonalLists as _getPersonalLists, personalLists } from './personalLists';
import { getActualList as _getActualList, getActualSong as _getActualSong, playList } from './playList';

export default combineReducers({
  playList,
  managedList,
  filteredList,
  personalLists,
  filters
});

export const getActualSong = createSelector(
  state => state.playList,
  _getActualSong
);

export const getActualList = createSelector(
  state => state.playList,
  _getActualList
);

export const getManagedList = createSelector(
  state => state.managedList,
  _getManagedList
);

export const getDecades = createSelector(
  state => state.filters,
  _getDecades
);

export const getTags = createSelector(
  state => state.filters,
  _getTags
);

export const getLetters = createSelector(
  state => state.filters,
  _getLetters
);

export const getOptions = state => {
  const tags = TAGS;
  const decades = DECADES;
  const letters = LETTERS;
  return optionType => {
    switch (optionType) {
      case tags:
        return getTags(state);
      case decades:
        return getDecades(state);
      case letters:
        return getLetters(state);
      default:
        break;
    }
  };
};
