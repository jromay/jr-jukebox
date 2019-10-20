const Joi = require('joi');
const options = require('./customJoiOptions').options;

/**
 * Utility helper for Joi validation.
 *
 * @param  {object}  data
 * @param  {object}  schema
 * @return {Promise}
 */
function validate(data, schema) {
  return Joi.validate(data, schema, options, err => {
    if (err) {
      return Promise.reject(err);
    }

    return Promise.resolve(null);
  });
}

module.exports = { validate };
