// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars

const Validate = require('../utils/validate');

/**
 * Validate create song request.
 *
 * @param  {object}   body
 * @return {Promise}
 */
function songValidator(body, schema) {
  return Validate.validate(body, schema)
    .then(() => true)
    .catch(err => err);
}

module.exports = (schema = {}) => {
  return async context => {
    const { data } = context;
    let validation = await songValidator(data, schema);
    if (validation !== true) {
      throw new Error(validation.message);
    }
    return context;
  };
};
