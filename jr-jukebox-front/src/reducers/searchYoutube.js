import { createSelector } from 'reselect';

import { SET_SELECTED_VIDEO, SET_VALUE_FORM, SET_VIDEO_LIST } from './../actions';

export const youtubeList = (state = {}, action) => {
  switch (action.type) {
    case SET_VIDEO_LIST: {
      const videoList = action.payload;
      return {
        ...state,
        videoList
      };
    }
    case SET_SELECTED_VIDEO: {
      const selectedVideo = action.payload;
      return { ...state, selectedVideo };
    }
    case SET_VALUE_FORM: {
      const { field, value } = action.payload;
      return { ...state, form: { ...state.form, [field]: value } };
    }
    default:
      return state;
  }
};

export const getVideoList = createSelector(
  state => state.videoList,
  videoList => videoList
);

export const getSelectedVideo = createSelector(
  state => state.selectedVideo,
  selectedVideo => selectedVideo || { id: {}, snippet: {} }
);

export const getFormValue = createSelector(
  state => state.form,
  form => form || {}
);
