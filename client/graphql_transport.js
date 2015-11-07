/*
  Simple GraphQL transport which send queries to a GraphQL endpoint
*/
GraphQLTransport = class {
  constructor(path = "/graphql") {
    this.path = path;
  }

  sendQuery(query, vars = {}) {
    const result = this.fetch(query, vars)
      .then(({data, errors}) => {
        if(errors) {
          const errMessage = errors[0] && errors[0].message;
          const err = new Error(`GraphQL error: ${errMessage}`);
          err.errors = errors;
          throw err;
        }

        return data;
      });

    return result;
  }

  fetch(query, variables) {
    return new Promise((resolve, reject) => {
      Meteor.call('graphql.query', query, variables, function(err, res) {
        if(err) {
          return reject(err);
        }

        return resolve(res);
      });
    });
  }
}