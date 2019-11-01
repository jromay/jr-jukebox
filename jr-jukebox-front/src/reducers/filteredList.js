import { createSelector } from 'reselect';

import { SET_FILTERED_LIST } from './../actions';

export const filteredList = (state = {}, action) => {
  switch (action.type) {
    case SET_FILTERED_LIST: {
      const list = action.payload;
      return { ...state, [list]: list };
    }
    default:
      return state;
  }
};

export const getFilteredList = createSelector(
  state => state.list,
  list => list
);
