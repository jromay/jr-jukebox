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
  SET_ORDER,
  SET_TAGS
} from '../actions';

export const filters = (state = {}, action) => {
  switch (action.type) {
    case ADD_DECADE: {
      const decade = action.payload;
      const { decades, query, queryTitle, queryAuthor } = state;
      let newDecades = changeValueActivationElement(decades, decade, true);
      let newQuery = (query || "") + "decade=" + decade + "&";
      let newQueryTitle = (queryTitle || "") + "decade=" + decade + "&";
      let newQueryAuthor = (queryAuthor || "") + "decade=" + decade + "&";
      return {
        ...state,
        decades: newDecades,
        query: newQuery,
        queryAuthor: newQueryAuthor,
        queryTitle: newQueryTitle
      };
    }
    case REMOVE_DECADE: {
      const decade = action.payload;
      const { decades, query, queryTitle, queryAuthor } = state;
      let newDecades = changeValueActivationElement(decades, decade, false);
      let newQuery = (query || "").replace("decade=" + decade + "&", "");
      let newQueryTitle = (queryTitle || "").replace(
        "decade=" + decade + "&",
        ""
      );
      let newQueryAuthor = (queryAuthor || "").replace(
        "decade=" + decade + "&",
        ""
      );
      return {
        ...state,
        decades: newDecades,
        query: newQuery,
        queryAuthor: newQueryAuthor,
        queryTitle: newQueryTitle
      };
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
      const { letters, queryTitle, queryAuthor } = state;
      let newLetters = changeValueActivationElement(letters, letter, true);
      let newQueryTitle = (queryTitle || "") + "initialTitle=" + letter + "&";
      let newQueryAuthor =
        (queryAuthor || "") + "initialAuthor=" + letter + "&";
      let newQuery =
        state.queryType === "author" ? newQueryAuthor : newQueryTitle;
      return {
        ...state,
        letters: newLetters,
        queryTitle: newQueryTitle,
        queryAuthor: newQueryAuthor,
        query: newQuery
      };
    }
    case REMOVE_LETTER: {
      const letter = action.payload;
      const { letters, queryTitle, queryAuthor } = state;
      let newQueryTitle = (queryTitle || "").replace(
        "initialTitle=" + letter + "&",
        ""
      );
      let newQueryAuthor = (queryAuthor || "").replace(
        "initialAuthor=" + letter + "&",
        ""
      );
      let newLetters = changeValueActivationElement(letters, letter, false);
      return {
        ...state,
        letters: newLetters,
        queryTitle: newQueryTitle,
        queryAuthor: newQueryAuthor,
        query: state.queryType === "author" ? newQueryAuthor : newQueryTitle
      };
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
      const { tags, query, queryTitle, queryAuthor } = state;
      let newTags = changeValueActivationElement(tags, tag, true);
      let newQuery = (query || "") + "tags=" + tag + "&";
      let newQueryAuthor = (queryAuthor || "") + "tags=" + tag + "&";
      let newQueryTitle = (queryTitle || "") + "tags=" + tag + "&";
      return {
        ...state,
        tags: newTags,
        query: newQuery,
        queryAuthor: newQueryAuthor,
        queryTitle: newQueryTitle
      };
    }
    case REMOVE_TAG: {
      const tag = action.payload;
      const { tags, query, queryTitle, queryAuthor } = state;
      let newTags = changeValueActivationElement(tags, tag, false);
      let newQuery = (query || "").replace("tags=" + tag + "&", "");
      let newQueryAuthor = (queryAuthor || "").replace("tags=" + tag + "&", "");
      let newQueryTitle = (queryTitle || "").replace("tags=" + tag + "&", "");
      return {
        ...state,
        tags: newTags,
        query: newQuery,
        queryAuthor: newQueryAuthor,
        queryTitle: newQueryTitle
      };
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
      const { languages, query, queryTitle, queryAuthor } = state;
      let newLanguages = changeValueActivationElement(
        languages,
        language,
        true
      );
      let newQuery = (query || "") + "language=" + language + "&";
      let newQueryAuthor = (queryAuthor || "") + "language=" + language + "&";
      let newQueryTitle = (queryTitle || "") + "language=" + language + "&";
      return {
        ...state,
        languages: newLanguages,
        query: newQuery,
        queryAuthor: newQueryAuthor,
        queryTitle: newQueryTitle
      };
    }
    case REMOVE_LANGUAGE: {
      const language = action.payload;
      const { languages, query, queryTitle, queryAuthor } = state;
      let newLanguages = changeValueActivationElement(
        languages,
        language,
        false
      );
      let newQuery = (query || "").replace("language=" + language + "&", "");
      let newQueryAuthor = (queryAuthor || "").replace(
        "language=" + language + "&",
        ""
      );
      let newQueryTitle = (queryTitle || "").replace(
        "language=" + language + "&",
        ""
      );
      return {
        ...state,
        languages: newLanguages,
        query: newQuery,
        queryAuthor: newQueryAuthor,
        queryTitle: newQueryTitle
      };
    }
    case SET_LANGUAGES: {
      const languages = action.payload;
      languages.forEach(element => {
        element.selected = element.selected || false;
      });
      return { ...state, languages: languages };
    }
    case SET_ORDER: {
      const order = action.payload;
      let newOrder;
      let newQuery;
      if (order === "author") {
        newOrder = "$sort[author]=1&$sort[title]=1&";
        newQuery = state.queryAuthor;
      } else {
        newOrder = "$sort[title]=1&$sort[author]=1&";
        newQuery = state.queryTitle;
      }
      return { ...state, order: newOrder, queryType: order, query: newQuery };
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

export const getOrder = createSelector(
  state => {
    return state.order || "$sort[title]=1&$sort[author]=1&";
  },
  order => {
    return order;
  }
);
