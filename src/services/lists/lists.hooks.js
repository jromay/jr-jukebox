const validator = require('../../hooks/validator');

const Joi = require('joi');

const SCHEMA = {
  title: Joi.string()
    .label('title')
    .required(),
  ids: Joi.array()
    .label('ids')
    .required()
};

const transformResultList = require('../../hooks/transform-result-list');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [validator(SCHEMA)],
    update: [validator(SCHEMA)],
    patch: [validator(SCHEMA)],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [transformResultList()],
    create: [],
    update: [],
    patch: [],
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
