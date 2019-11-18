import { createSelector } from 'reselect';

import {
  ADD_DECADE,
  ADD_LANGUAGE,
  ADD_LETTER,
  ADD_TAG,
  NEW_TAG,
  REMOVE_DECADE,
  REMOVE_LANGUAGE,
  REMOVE_LETTER,
  REMOVE_TAG,
  SET_DECADES,
  SET_LANGUAGES,
  SET_LETTERS,
  SET_TAGS
} from '../actions';

export const filters = (state = {}, action) => {
  switch (action.type) {
    case ADD_DECADE: {
      const decade = action.payload;
      const { decades, query } = state;
      let newDecades = changeValueActivationElement(decades, decade, true);
      let newQuery = (query || "") + "decade=" + decade + "&";
      return { ...state, decades: newDecades, query: newQuery };
    }
    case REMOVE_DECADE: {
      const decade = action.payload;
      const { decades, query } = state;
      let newDecades = changeValueActivationElement(decades, decade, false);
      let newQuery = (query || "").replace("decade=" + decade + "&", "");
      return { ...state, decades: newDecades, query: newQuery };
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
      const { letters, query } = state;
      let newLetters = changeValueActivationElement(letters, letter, true);
      let newQuery = (query || "") + "initialTitle=" + letter + "&";
      return { ...state, letters: newLetters, query: newQuery };
    }
    case REMOVE_LETTER: {
      const letter = action.payload;
      const { letters, query } = state;
      let newQuery = (query || "").replace("initialTitle=" + letter + "&", "");
      let newLetters = changeValueActivationElement(letters, letter, false);
      return { ...state, letters: newLetters, query: newQuery };
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
      const { tags, query } = state;
      let newTags = changeValueActivationElement(tags, tag, true);
      let newQuery = (query || "") + "tags=" + tag + "&";
      return { ...state, tags: newTags, query: newQuery };
    }
    case REMOVE_TAG: {
      const tag = action.payload;
      const { tags, query } = state;
      let newTags = changeValueActivationElement(tags, tag, false);
      let newQuery = (query || "").replace("tags=" + tag + "&", "");
      return { ...state, tags: newTags, query: newQuery };
    }
    case SET_TAGS: {
      const tags = action.payload;
      tags.forEach(element => {
        element.selected = element.selected || false;
      });
      return { ...state, tags: tags };
    }
    case NEW_TAG: {
      const tag = { selected: false, name: action.payload };
      return { ...state, tags: [...state.tags, tag] };
    }

    case ADD_LANGUAGE: {
      const language = action.payload;
      const { languages, query } = state;
      let newLanguages = changeValueActivationElement(
        languages,
        language,
        true
      );
      let newQuery = (query || "") + "language=" + language + "&";
      return { ...state, languages: newLanguages, query: newQuery };
    }
    case REMOVE_LANGUAGE: {
      const language = action.payload;
      const { languages, query } = state;
      let newLanguages = changeValueActivationElement(
        languages,
        language,
        false
      );
      let newQuery = (query || "").replace("language=" + language + "&", "");
      return { ...state, languages: newLanguages, query: newQuery };
    }
    case SET_LANGUAGES: {
      const languages = action.payload;
      languages.forEach(element => {
        element.selected = element.selected || false;
      });
      return { ...state, languages: languages };
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

export const getLanguages = createSelector(
  state => {
    return state.languages || [];
  },
  languages => {
    return languages;
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
