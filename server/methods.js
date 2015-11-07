const {graphql} = Meteor.npmRequire('graphql');
const Future = Npm.require('fibers/future');

Meteor.methods({
  'graphql.query': (query, vars) => {
    check(query, String);
    check(vars, Object);

    const f = new Future();
    graphql(TodosSchema, query, null, vars)
      .then(result => f.return(result))
      .catch(err => {throw err});

    return f.wait();
  }
});