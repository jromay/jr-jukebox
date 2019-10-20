// Initializes the `songs` service on path `/songs`
const { Songs } = require('./songs.class');
const createModel = require('../../models/songs.model');
const hooks = require('./songs.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/songs', new Songs(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('songs');

  service.hooks(hooks);
};
