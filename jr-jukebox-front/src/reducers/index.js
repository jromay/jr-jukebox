import { combineReducers } from 'redux';
import { createSelector } from 'reselect';

import { DECADES, LANGUAGES, LETTERS, TAGS } from './../constants';
import { filteredList, getFilteredList as _getFilteredList } from './filteredList';
import { filters, getDecades as _getDecades, getLanguages as _getLanguages, getLetters as _getLetters, getTags as _getTags } from './filters';
import { getManagedList as _getManagedList, managedList } from './managedList';
import {
  getActualIndex as _getActualIndex,
  getActualList as _getActualList,
  getActualSong as _getActualSong,
  getPersonalLists as _getPersonalLists,
  personalLists
} from './personalLists';

export default combineReducers({
  filteredList,
  personalLists,
  filters
});

export const getActualSong = createSelector(
  state => state.personalLists,
  _getActualSong
);
export const getActualIndex = createSelector(
  state => state.personalLists,
  _getActualIndex
);

export const getActualList = createSelector(
  state => state.personalLists,
  _getActualList
);

/*export const getManagedList = createSelector(
  state => state.managedList,
  _getManagedList
);*/

export const getPersonalLists = createSelector(
  state => state.personalLists,
  _getPersonalLists
);

export const getPersonalList = createSelector(
  state => state.personalLists,
  personalLists => personalLists.listId || ''
);

export const getSelectedListContent = createSelector(
  state => state.personalLists,
  personalLists => personalLists.listContent || []
);

export const getNameList = createSelector(
  state => state.personalLists,
  personalLists => personalLists.nameList || ''
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

export const getLanguages = createSelector(
  state => state.filters,
  _getLanguages
);

export const getOptions = state => {
  const tags = TAGS;
  const decades = DECADES;
  const letters = LETTERS;
  const languages = LANGUAGES;
  return optionType => {
    switch (optionType) {
      case tags:
        return getTags(state);
      case decades:
        return getDecades(state);
      case letters:
        return getLetters(state);
      case languages:
        return getLanguages(state);
      default:
        break;
    }
  };
};

export const getFilterQuery = createSelector(
  state => state.filters,
  filters => filters.query || ''
);

export const getFilteredList = createSelector(
  state => state.filteredList,
  filteredList => filteredList.list || []
);
