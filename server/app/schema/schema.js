const _ = require('lodash');
const graphql = require('graphql');

const Book = require('../models/book');
const Author = require('../models/author');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLInt,
  GraphQLID,
} = graphql;

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    age: { type: GraphQLInt },
    name: { type: GraphQLString },
    books: {
      type: new GraphQLList(BookType), // eslint-disable-line
      resolve(parent) {
        return _.filter(books, { authorId: parent.id });
      },
    },
  }),
});

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent) {
        return _.find(authors, { id: parent.authorId });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: { // this is the identify for a single book query
      type: BookType,
      args: { id: { type: GraphQLID } }, // this means thet when you query for book, you have to specify id
      resolve(parent, args) { // this is how we determine how to retrieve data from datasource
        return _.find(books, { id: args.id });
      },
    },
    author: { // this is the identify for a single book query
      type: AuthorType,
      args: { id: { type: GraphQLID } }, // this means thet when you query for book, you have to specify id
      resolve(parent, args) { // this is how we determine how to retrieve data from datasource
        return _.find(authors, { id: args.id });
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve() {
        return books;
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve() {
        return authors;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
