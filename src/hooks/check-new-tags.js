// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    //const tags = context.data.tags;
    for (let x = 1; x <= 4 && context.data['tag' + x]; x++) {
      let tag = await context.app.services.tags.find({ query: { name: context.data['tag' + x] } });
      if (tag.data.length == 0) {
        await context.app.services.tags.create({ name: context.data['tag' + x] });
      }
      tag = undefined;
    }
    return context;
  };
};
