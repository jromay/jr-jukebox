import { createSelector } from 'reselect';

import { SET_PERSONAL_LISTS } from '../actions';

export const personalLists = (state = {}, action) => {
  switch (action.type) {
    case SET_PERSONAL_LISTS: {
      const lists = action.payload;
      return { ...state, lists };
    }
    default:
      return state;
  }
};

export const getPersonalLists = createSelector(
  state => state.lists,
  lists => lists
);
