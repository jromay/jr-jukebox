// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    let query = {
      _id: { $in: context.result.ids },
      ...context.arguments[1].query
    };
    context.result = await context.app.services.songs.find({ query: query });
    return context;
  };
};
