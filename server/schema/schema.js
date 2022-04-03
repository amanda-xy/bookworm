const graphql = require("graphql");
const Book = require("../models/book");
const Author = require("../models/author");
const Review = require("../models/review");

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLFloat, GraphQLBoolean } = graphql;

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    numberOfPages: { type: GraphQLInt },
    image: { type: GraphQLString },
    rating: { type: GraphQLFloat },
    genre: { type: GraphQLString },
    publicationDate: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        // return _.find(authors, { id: parent.authorId });
        return Author.findById(parent.authorId);
      },
    },
    reviews: {
      type: new GraphQLList(ReviewType),
      resolve(parent, args) {
        return Review.find({ bookId: parent.id });
      },
    },
  }),
});

const ReviewType = new GraphQLObjectType({
  name: "Review",
  fields: () => ({
    id: { type: GraphQLID },
    rating: { type: GraphQLInt },
    text: { type: GraphQLString },
    hasSpoilers: { type: GraphQLBoolean },
    publicationDate: { type: GraphQLString },
    book: {
      type: BookType,
      resolve(parent, args) {
        return Book.findById(parent.bookId);
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    biography: { type: GraphQLString },
    birthDate: { type: GraphQLString },
    image: { type: GraphQLString },
    averageRating: { type: GraphQLFloat },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return _.filter(books, { authorId: parent.id });
        return Book.find({ authorId: parent.id });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // Code to get data from db / other source
        // return _.find(books, { id: args.id });
        return Book.findById(args.id);
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return _.find(authors, { id: args.id });
        return Author.findById(args.id);
      },
    },
    review: {
      type: ReviewType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Review.findById(args.id);
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return books;
        return Book.find({});
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        // return authors;
        return Author.find({});
      },
    },
    reviews: {
      type: new GraphQLList(ReviewType),
      resolve(parent, args) {
        return Review.find({});
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
        biography: { type: GraphQLString },
        birthdate: { type: GraphQLString },
        image: { type: GraphQLString },
      },
      resolve(parent, args) {
        let author = new Author({
          firstName: args.firstName,
          lastName: args.lastName,
          biography: args.biography,
          birthDate: args.birthDate,
          image: args.image,
          averageRating: 0,
        });
        return author.save();
      },
    },
    addBook: {
      type: BookType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
        numberOfPages: { type: GraphQLInt },
        image: { type: GraphQLString },
        genre: { type: GraphQLString },
        publicationDate: { type: GraphQLString },
        authorId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        let book = new Book({
          title: args.title,
          description: args.description,
          numberOfPages: args.numberOfPages,
          image: args.image,
          rating: 0,
          genre: args.genre,
          publicationDate: args.publicationDate,
          authorId: args.authorId,
        });
        return book.save();
      },
    },
    addReview: {
      type: ReviewType,
      args: {
        rating: { type: new GraphQLNonNull(GraphQLInt) },
        text: { type: GraphQLString },
        hasSpoilers: { type: new GraphQLNonNull(GraphQLBoolean) },
        publicationDate: { type: new GraphQLNonNull(GraphQLString) },
        bookId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        let review = new Review({
          rating: args.rating,
          text: args.text,
          hasSpoilers: args.hasSpoilers,
          publicationDate: args.publicationDate,
          bookId: args.bookId,
        });
        return review.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
