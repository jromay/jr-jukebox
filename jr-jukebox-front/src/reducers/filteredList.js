import { createSelector } from 'reselect';

import { ADD_FILTERED_LIST, SET_FILTERED_LIST } from './../actions';

export const filteredList = (state = {}, action) => {
  switch (action.type) {
    case SET_FILTERED_LIST: {
      const list = action.payload;
      return { ...state, list: list };
    }
    case ADD_FILTERED_LIST: {
      const list2 = action.payload;
      return { ...state, list: [...state.list, ...list2] };
    }
    default:
      return state;
  }
};

export const getFilteredList = createSelector(
  state => state.list,
  list => list || []
);
