import { createSelector } from 'reselect';

import { ADD_SONG, EXCHANGE_POSITIONS, REMOVE_SONG, SET_MANAGED_LIST } from '../actions';

export const managedList = (state = {}, action) => {
  switch (action.type) {
    case SET_MANAGED_LIST: {
      const list = action.payload;
      return { ...state, list: list };
    }
    case ADD_SONG: {
      const song = action.payload;
      return { ...state, list: [...state.list, song] };
    }
    case EXCHANGE_POSITIONS: {
      const index = action.payload;
      const listIn = state.list;
      const initial = listIn.slice(0, index);
      const final = listIn.slice(index + 2);
      const n = listIn[index];
      const n1 = listIn[index + 1];
      return { ...state, list: [...initial, n1, n, ...final] };
    }
    case REMOVE_SONG: {
      const index = action.payload;
      const listIn = state.list;
      const initial = listIn.slice(0, index);
      const final = listIn.slice(index + 1);
      return { ...state, list: [...initial, ...final] };
    }
    default:
      return state;
  }
};

export const getManagedList = createSelector(
  state => state.list,
  list => list
);
