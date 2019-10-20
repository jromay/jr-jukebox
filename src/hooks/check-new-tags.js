// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const tags = context.data.tags;
    for (let x = 0; x < tags.length; x++) {
      let tag = await context.app.services.tags.find({ query: { name: tags[x] } });
      if (tag.data.length == 0) {
        await context.app.services.tags.create({ name: tags[x] });
      }
      tag = undefined;
    }
    return context;
  };
};
