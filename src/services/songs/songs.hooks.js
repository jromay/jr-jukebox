const downloadVideo = require('../../hooks/download-video');

const checkPath = require('../../hooks/check-path');

const checkNewTags = require('../../hooks/check-new-tags');

const translateQuerySongs = require('../../hooks/translate-query-songs');

const checkNewLanguage = require('../../hooks/check-new-language');

const validator = require('../../hooks/validator');

const Joi = require('joi');

const SCHEMA = {
  title: Joi.string()
    .label('title')
    .required(),
  author: Joi.string()
    .label('author')
    .required(),
  youtubeid: Joi.string()
    .label('youtubeid')
    .required(),
  language: Joi.string()
    .label('language')
    .required(),
  year: Joi.number()
    .label('year')
    .required(),
  tags: Joi.array()
    .label('tags')
    .required()
};

module.exports = {
  before: {
    all: [],
    find: [translateQuerySongs()],
    get: [],
    create: [validator(SCHEMA), checkPath(), downloadVideo()],
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
