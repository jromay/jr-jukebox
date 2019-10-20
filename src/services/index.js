const songs = require('./songs/songs.service.js');
const tags = require('./tags/tags.service.js');
const lists = require('./lists/lists.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(songs);
  app.configure(tags);
  app.configure(lists);
};
