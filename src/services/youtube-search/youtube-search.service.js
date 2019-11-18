// Initializes the `youtubeSearch` service on path `/search`
const { YoutubeSearch } = require('./youtube-search.class');
const hooks = require('./youtube-search.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/search', new YoutubeSearch(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('search');

  service.hooks(hooks);
};
