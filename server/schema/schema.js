const graphql = require("graphql");
const Book = require("../models/book");
const Author = require("../models/author");
// const Review = require("../models/review");

const dbConnection = require("../db");
const arangojs = require("arangojs");
const aql = arangojs.aql;
const db = dbConnection.getConnection();

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLFloat } = graphql;

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    numberOfPages: { type: GraphQLInt },
    image: { type: GraphQLString },
    rating: { type: GraphQLFloat },
    genre: { type: GraphQLString },
    publicationDate: { type: GraphQLString },
    author: {
      type: AuthorType,
      async resolve(parent, args) {
        // return _.find(authors, { id: parent.authorId });
        const idCursor = await db.query(aql`
        for book in books 
          filter book._key == ${parent.id}
            return book._id
        `);

        const id = await idCursor.all();

        const cursor = await db.query(aql`
        for author IN 1..1 OUTBOUND ${id[0]} writtenBy
        return {id: author._key, firstName: author.firstName, lastName: author.lastName, image: author.image, biography: author.biography, birthDate: author.birthDate, averageRating: author.averageRating }
        `);

        const authors = await cursor.all();
        return authors[0];
      },
    },
    // reviews: {
    //   type: new GraphQLList(ReviewType),
    //   resolve(parent, args) {
    //     return Review.find({ bookId: parent.id });
    //   },
    // },
  }),
});

// const ReviewType = new GraphQLObjectType({
//   name: "Review",
//   fields: () => ({
//     id: { type: GraphQLID },
//     rating: { type: GraphQLInt },
//     text: { type: GraphQLString },
//     hasSpoilers: { type: GraphQLBoolean },
//     publicationDate: { type: GraphQLString },
//     book: {
//       type: BookType,
//       resolve(parent, args) {
//         return Book.findById(parent.bookId);
//       },
//     },
//   }),
// });

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    biography: { type: GraphQLString },
    birthDate: { type: GraphQLString },
    image: { type: GraphQLString },
    averageRating: { type: GraphQLFloat },
    books: {
      type: new GraphQLList(BookType),
      async resolve(parent, args) {
        // return _.filter(books, { authorId: parent.id });

        const idCursor = await db.query(aql`
        for author IN authors
        filter author._key == ${parent.id}
        return author._id
        `);

        const id = await idCursor.all();

        const cursor = await db.query(aql`
        for book IN 1..1 INBOUND ${id[0]} writtenBy
        return { id: book._key, title: book.title, description: book.description, image: book.image, numberOfPages: book.numberOfPages, publicationDate: book.publicationDate, rating: book.rating }
        `);
        return await cursor.all();
        // return Book.find({ authorId: parent.id });
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
      async resolve(parent, args) {
        // Code to get data from db / other source
        // return _.find(books, { id: args.id });

        const cursor = await db.query(aql`
        for book in books 
          filter book._key == ${args.id}
            return { id: book._key, title: book.title, description: book.description, image: book.image, numberOfPages: book.numberOfPages, publicationDate: book.publicationDate, rating: book.rating }
        `);

        const books = await cursor.all();
        return books[0];
        // return Book.findById(args.id);
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        // return _.find(authors, { id: args.id });
        const cursor = await db.query(aql`
        for author in authors 
          filter author._key == ${args.id}
            return {id: author._key, firstName: author.firstName, lastName: author.lastName, image: author.image, biography: author.biography, birthDate: author.birthDate, averageRating: author.averageRating }
        `);

        const authors = await cursor.all();
        return authors[0];
        // return Author.findById(args.id);
      },
    },
    // review: {
    //   type: ReviewType,
    //   args: { id: { type: GraphQLID } },
    //   resolve(parent, args) {
    //     return Review.findById(args.id);
    //   },
    // },
    books: {
      type: new GraphQLList(BookType),
      async resolve(parent, args) {
        // return books;
        // return Book.find({});
        const cursor = await db.query(aql`
        for book in books
        return { id: book._key, title: book.title, description: book.description, image: book.image, numberOfPages: book.numberOfPages, publicationDate: book.publicationDate, rating: book.rating }
        `);
        return await cursor.all();
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      async resolve(parent, args) {
        // return authors;
        // return Author.find({});
        const cursor = await db.query(aql`
        for author in authors
        return {id: author._key, firstName: author.firstName, lastName: author.lastName, image: author.image, biography: author.biography, birthDate: author.birthDate, averageRating: author.averageRating }
        `);
        return await cursor.all();
      },
    },
    // reviews: {
    //   type: new GraphQLList(ReviewType),
    //   resolve(parent, args) {
    //     return Review.find({});
    //   },
    // },
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
      async resolve(parent, args) {
        let author = {
          firstName: args.firstName,
          lastName: args.lastName,
          biography: args.biography,
          birthDate: args.birthDate,
          image: args.image,
          averageRating: 0,
        };

        const authorsCollection = await dbConnection.getCollection("authors");
        authorsCollection.save(author).then(
          () => console.log("Saved!"),
          (err) => console.log("failed to save")
        );
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
      async resolve(parent, args) {
        let book = {
          title: args.title,
          description: args.description,
          numberOfPages: args.numberOfPages,
          image: args.image,
          rating: 0,
          genre: args.genre,
          publicationDate: args.publicationDate,
        };

        const booksCollection = await dbConnection.getCollection("books");
        const writtenByCollection = await dbConnection.getCollection("writtenBy");

        const newBook = await booksCollection.save(book);
        const edge = {
          _from: newBook._id,
          _to: args.authorId,
        };

        await writtenByCollection.save(edge);
      },
    },
    // addReview: {
    //   type: ReviewType,
    //   args: {
    //     rating: { type: new GraphQLNonNull(GraphQLInt) },
    //     text: { type: GraphQLString },
    //     hasSpoilers: { type: new GraphQLNonNull(GraphQLBoolean) },
    //     publicationDate: { type: new GraphQLNonNull(GraphQLString) },
    //     bookId: { type: new GraphQLNonNull(GraphQLID) },
    //   },
    //   resolve(parent, args) {
    //     let review = new Review({
    //       rating: args.rating,
    //       text: args.text,
    //       hasSpoilers: args.hasSpoilers,
    //       publicationDate: args.publicationDate,
    //       bookId: args.bookId,
    //     });
    //     return review.save();
    //   },
    // },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
