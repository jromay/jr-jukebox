// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const languages = context.data.language;
    let language = await context.app.services.languages.find({ query: { name: languages } });
    if (language.data.length == 0) {
      await context.app.services.languages.create({ name: languages });
    }
    return context;
  };
};
