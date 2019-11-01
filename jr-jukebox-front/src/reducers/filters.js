import { createSelector } from 'reselect';

import { ADD_DECADE, ADD_LETTER, ADD_TAG, REMOVE_DECADE, REMOVE_LETTER, REMOVE_TAG, SET_DECADES, SET_LETTERS, SET_TAGS } from '../actions';

export const filters = (state = {}, action) => {
  switch (action.type) {
    case ADD_DECADE: {
      const decade = action.payload;
      const { decades } = state;
      let newDecades = changeValueActivationElement(decades, decade, true);
      return { ...state, decades: newDecades };
    }
    case REMOVE_DECADE: {
      const decade = action.payload;
      const { decades } = state;
      let newDecades = changeValueActivationElement(decades, decade, false);
      return { ...state, decades: newDecades };
    }
    case SET_DECADES: {
      const decades = action.payload;
      decades.forEach(element => {
        element.selected = element.selected || false;
      });
      return { ...state, decades: decades };
    }

    case ADD_LETTER: {
      const letter = action.payload;
      const { letters } = state;
      let newLetters = changeValueActivationElement(letters, letter, true);
      return { ...state, letters: newLetters };
    }
    case REMOVE_LETTER: {
      const letter = action.payload;
      const { letters } = state;
      let newLetters = changeValueActivationElement(letters, letter, false);
      return { ...state, letters: newLetters };
    }
    case SET_LETTERS: {
      const letters = action.payload;
      letters.forEach(element => {
        element.selected = element.selected || false;
      });
      return { ...state, letters: letters };
    }

    case ADD_TAG: {
      const tag = action.payload;
      const { tags } = state;
      let newTags = changeValueActivationElement(tags, tag, true);
      return { ...state, tags: newTags };
    }
    case REMOVE_TAG: {
      const tag = action.payload;
      const { tags } = state;
      let newTags = changeValueActivationElement(tags, tag, false);
      return { ...state, tags: newTags };
    }
    case SET_TAGS: {
      const tags = action.payload;
      tags.forEach(element => {
        element.selected = element.selected || false;
      });
      return { ...state, tags: tags };
    }

    default:
      return state;
  }
};

export const getTags = createSelector(
  state => {
    return state.tags || [];
  },
  tags => {
    return tags;
  }
);

export const getDecades = createSelector(
  state => {
    return state.decades || [];
  },
  decades => {
    return decades;
  }
);

export const getLetters = createSelector(
  state => {
    return state.letters || [];
  },
  letters => {
    return letters;
  }
);

const changeValueActivationElement = (list, element, value) => {
  const index = list.findIndex(function(e) {
    return element === e.name;
  });
  if (index >= 0) {
    list[index].selected = value;
  }
  return list;
};
