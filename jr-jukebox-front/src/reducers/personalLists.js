import { createSelector } from 'reselect';

import {
  ADD_PERSONAL_LIST_CONTENT,
  ADD_PERSONAL_LISTS,
  EXCHANGE_POSITIONS,
  NEXT_SONG,
  PREV_SONG,
  REMOVE_PERSONAL_LIST_CONTENT,
  SET_ACTUAL_SONG,
  SET_NAME_LIST,
  SET_PERSONAL_LIST,
  SET_PERSONAL_LIST_CONTENT,
  SET_PERSONAL_LISTS
} from '../actions';

export const personalLists = (state = {}, action) => {
  switch (action.type) {
    case SET_PERSONAL_LISTS: {
      const lists = action.payload;
      return { ...state, lists };
    }
    case ADD_PERSONAL_LISTS: {
      const lists = action.payload;
      return { ...state, lists: [...state.lists, ...lists] };
    }
    case SET_PERSONAL_LIST: {
      const listId = action.payload;
      return { ...state, listId };
    }
    case SET_PERSONAL_LIST_CONTENT: {
      const listContent = action.payload;
      return { ...state, listContent, index: 0, song: listContent[0] };
    }
    case ADD_PERSONAL_LIST_CONTENT: {
      const song = action.payload;
      return { ...state, listContent: [...(state.listContent || []), song] };
    }
    case REMOVE_PERSONAL_LIST_CONTENT: {
      const index = action.payload;
      const listIn = state.listContent;
      const initial = listIn.slice(0, index);
      const final = listIn.slice(index + 1);
      const listContent = [...initial, ...final];
      const newIndex = state.index % listContent.length;
      return { ...state, listContent, index: newIndex, song: listContent[newIndex] };
    }
    case EXCHANGE_POSITIONS: {
      const index = action.payload;
      const listIn = state.listContent;
      const initial = listIn.slice(0, index);
      const final = listIn.slice(index + 2);
      const n = listIn[index];
      const n1 = listIn[index + 1];
      let newIndex = state.index;
      if (state.index == index) {
        newIndex = index + 1;
      }
      if (state.index == index + 1) {
        newIndex = index;
      }
      return { ...state, listContent: [...initial, n1, n, ...final], index: newIndex };
    }
    case SET_ACTUAL_SONG: {
      const index = action.payload;
      return { ...state, song: state.listContent[index], index };
    }
    case NEXT_SONG: {
      return { ...state, song: state.listContent[(state.index + 1) % state.listContent.length], index: (state.index + 1) % state.listContent.length };
    }
    case PREV_SONG: {
      if (state.index === 0) {
        return { ...state, song: state.listContent[state.list.length - 1], index: state.listContent.length - 1 };
      } else {
        return { ...state, song: state.listContent[state.index - 1], index: state.index - 1 };
      }
    }
    case SET_NAME_LIST: {
      const nameList = action.payload;
      return { ...state, nameList };
    }
    default:
      return state;
  }
};

export const getPersonalLists = createSelector(
  state => state.lists,
  lists => lists
);

export const getActualSong = createSelector(
  state => state.song,
  song => song || { file: '' }
);

export const getActualList = createSelector(
  state => state.listContent,
  listContent => listContent
);

export const getActualIndex = createSelector(
  state => state.index,
  index => index
);
