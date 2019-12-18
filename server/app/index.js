const express = require('express');
const graphqlHTTP = require('express-graphql');
// local requires
const schema = require('./schema/schema');

const app = express();

// setup graphql
app.use('/graphql', graphqlHTTP({
  schema,
}));

// done! we export it so we can start the server in server.js
module.exports = app;
