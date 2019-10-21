const Joi = require('joi');
const Validate = require('../..//utils/validate');

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

/**
 * Validate create song request.
 *
 * @param  {object}   req
 * @param  {object}   res
 * @param  {function} next
 * @return {Promise}
 */
function songValidator(body) {
  return Validate.validate(body, SCHEMA)
    .then(() => true)
    .catch(err => err);
}

module.exports = { songValidator };
