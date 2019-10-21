// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    if (context.params.query) {
      if (context.params.query.initialTitle) {
        context.params.query.initialTitle = arrayToOrSyntax(context.params.query.initialTitle);
      }
      if (context.params.query.initialAuthor) {
        context.params.query.initialAuthor = arrayToOrSyntax(context.params.query.initialAuthor);
      }
      if (context.params.query.decade) {
        context.params.query.decade = arrayToOrSyntax(context.params.query.decade, true);
      }
      if (context.params.query.language) {
        context.params.query.language = arrayToOrSyntax(context.params.query.language);
      }
      if (context.params.query.tags) {
        context.params.query['$or'] = [];
        for (let x = 1; x <= 4; x++) {
          context.params.query['$or'].push(JSON.parse('{ "tag' + x + '": ' + JSON.stringify(arrayToOrSyntax(context.params.query.tags)) + '}'));
        }
        delete context.params.query.tags;
      }
    }
    return context;
  };
};

function arrayToOrSyntax(array, convertInt) {
  if (typeof array === 'string') {
    if (convertInt) {
      return +array;
    } else {
      return array;
    }
  } else {
    if (convertInt) {
      let array2 = [];
      array.forEach(element => {
        array2.push(+element);
      });
      return { $in: array2 };
    } else {
      return { $in: array };
    }
  }
}
