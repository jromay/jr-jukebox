const fs = require('fs');
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    try {
      fs.readdirSync('public/videos');
    } catch (error) {
      fs.mkdirSync('public/videos');
    }
    try {
      fs.readdirSync('public/videos/' + context.data.year);
    } catch (error) {
      fs.mkdirSync('public/videos/' + context.data.year);
    }
    return context;
  };
};
