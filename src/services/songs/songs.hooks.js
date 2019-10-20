const downloadVideo = require('../../hooks/download-video');

const checkPath = require('../../hooks/check-path');

const checkNewTags = require('../../hooks/check-new-tags');

module.exports = {
  before: {
    all: [],
    find: [],
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
    create: [checkNewTags()],
    update: [checkNewTags()],
    patch: [checkNewTags()],
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
