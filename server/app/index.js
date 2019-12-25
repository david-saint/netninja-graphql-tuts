const express = require('express');
const mongoose = require('mongoose');
const graphqlHTTP = require('express-graphql');
// local requires
const schema = require('./schema/schema');

const app = express();

// connect to the mlab db
const { MONGO_DB_USER, MONGO_DB_PASSWORD } = process.env;

mongoose.connect(
  `mongodb://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@ds127153.mlab.com:27153/gql-ninja`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
);

mongoose.connection.once('open', () => {
  console.log('Connected to the Database!');
});

// setup graphql
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

// done! we export it so we can start the server in server.js
module.exports = app;
