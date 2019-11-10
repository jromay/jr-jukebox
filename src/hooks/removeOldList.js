// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    try {
      const title = context.data.title;
      context.app.services.lists.allowsMulti({
        multi: ['remove']
      });
      await context.app.services.lists.remove(null, { query: { title: title } });
      return context;
    } catch (e) {
      console.log(e);
    }
  };
};
