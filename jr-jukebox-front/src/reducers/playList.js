import { createSelector } from 'reselect';

import { NEXT_SONG, SET_ACTUAL_SONG, SET_PLAY_LIST } from './../actions';

export const playList = (state = {}, action) => {
  switch (action.type) {
    case SET_ACTUAL_SONG: {
      const { song, index } = action.payload;
      return { ...state, song, index };
    }
    case NEXT_SONG: {
      const { index } = action.payload;
      return { ...state, song: state.list[index + 1], index: state.index + 1 };
    }
    case SET_PLAY_LIST: {
      const { list } = action.payload;
      return { ...state, list, index: 0, song: list[0] };
    }
    default:
      return state;
  }
};

export const getActualSong = createSelector(
  state => state.list,
  song => song
);

export const getActualList = createSelector(
  state => state.list,
  list => list
);
