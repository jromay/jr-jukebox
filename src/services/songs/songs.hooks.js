const downloadVideo = require('../../hooks/download-video');

const checkPath = require('../../hooks/check-path');

const checkNewTags = require('../../hooks/check-new-tags');

const translateQuerySongs = require('../../hooks/translate-query-songs');

const checkNewLanguage = require('../../hooks/check-new-language');

module.exports = {
  before: {
    all: [],
    find: [translateQuerySongs()],
    get: [],
    create: [checkPath(), downloadVideo()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [checkNewTags(), checkNewLanguage()],
    update: [checkNewTags(), checkNewLanguage()],
    patch: [checkNewTags(), checkNewLanguage()],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
