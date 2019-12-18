const _ = require('lodash');
const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

// Dummy data to test out the ish
const books = [
  { name: 'Hello World', genre: 'beauty', id: 1 },
  { name: 'The Final Empire', genre: 'Fantasy', id: 2 },
  { name: 'The Long Lost Earth', genre: 'Sci-Fi', id: 3 },
];

const BookType = new GraphQLObjectType({
  namae: 'Book',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: { // this is the identify for a single book query
      type: BookType,
      args: { id: { type: GraphQLString } }, // this means thet when you query for book, you have to specify id
      resolve(parent, args) { // this is how we determine how to retrieve data from datasource
        return _.find(books, { id: args.id });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
