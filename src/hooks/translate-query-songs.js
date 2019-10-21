// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    if (context.params.query.initialTitle) {
      context.params.query.initialTitle = arrayToOrSyntax(context.params.query.initialTitle);
    }
    if (context.params.query.initialAuthor) {
      context.params.query.initialAuthor = arrayToOrSyntax(context.params.query.initialAuthor);
    }
    if (context.params.query.decade) {
      context.params.query.decade = arrayToOrSyntax(context.params.query.decade);
    }
    if (context.params.query.language) {
      context.params.query.language = arrayToOrSyntax(context.params.query.language);
    }
    context.params.query['$sort'] = { title: 1 };
    return context;
  };
};

function arrayToOrSyntax(array) {
  if (array.length == 1) {
    return array[0];
  } else {
    return { $in: array };
  }
}
