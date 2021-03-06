// Initializes the `lists` service on path `/lists`
const { Lists } = require('./lists.class');
const createModel = require('../../models/lists.model');
const hooks = require('./lists.hooks');

module.exports = function(app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate,
    multi: true
  };

  // Initialize our service with any options it requires
  app.use('/lists', new Lists(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('lists');

  service.hooks(hooks);
};
