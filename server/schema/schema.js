const graphql = require("graphql");

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

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    books: {
      type: new GraphQLList(BookType),
      async resolve(parent, args) {
        // return _.filter(books, { authorId: parent.id });

        const idCursor = await db.query(aql`
        for user IN users
        filter user._key == ${parent.id}
        return user._id
        `);

        const id = await idCursor.all();

        const cursor = await db.query(aql`
        for book IN 1..1 OUTBOUND ${id[0]} bookshelf, reading, review
        return { id: book._key, title: book.title, description: book.description, image: book.image, numberOfPages: book.numberOfPages, publicationDate: book.publicationDate, rating: book.rating }
        `);
        return await cursor.all();
        // return Book.find({ authorId: parent.id });
      },
    },
    currentlyReadingBooks: {
      type: new GraphQLList(BookType),
      async resolve(parent, args) {
        const idCursor = await db.query(aql`
        for user IN users
        filter user._key == ${parent.id}
        return user._id
        `);

        const id = await idCursor.all();

        const cursor = await db.query(aql`
        for book IN 1..1 OUTBOUND ${id[0]} reading
        return { id: book._key, title: book.title, description: book.description, image: book.image, numberOfPages: book.numberOfPages, publicationDate: book.publicationDate, rating: book.rating }
        `);
        return await cursor.all();
      },
    },
    reviewedBooks: {
      type: new GraphQLList(BookType),
      async resolve(parent, args) {
        const idCursor = await db.query(aql`
        for user IN users
        filter user._key == ${parent.id}
        return user._id
        `);

        const id = await idCursor.all();

        const cursor = await db.query(aql`
        for book IN 1..1 OUTBOUND ${id[0]} review
        return { id: book._key, title: book.title, description: book.description, image: book.image, numberOfPages: book.numberOfPages, publicationDate: book.publicationDate, rating: book.rating }
        `);
        return await cursor.all();
      },
    },
    bookshelfBooks: {
      type: new GraphQLList(BookType),
      async resolve(parent, args) {
        const idCursor = await db.query(aql`
        for user IN users
        filter user._key == ${parent.id}
        return user._id
        `);

        const id = await idCursor.all();

        const cursor = await db.query(aql`
        for book IN 1..1 OUTBOUND ${id[0]} bookshelf
        return { id: book._key, title: book.title, description: book.description, image: book.image, numberOfPages: book.numberOfPages, publicationDate: book.publicationDate, rating: book.rating }
        `);
        return await cursor.all();
      },
    },
  }),
});

const ReadingLogType = new GraphQLObjectType({
  name: "ReadingLog",
  fields: () => ({
    id: { type: GraphQLString },
    startDate: { type: GraphQLString },
    endDate: { type: GraphQLString },
    entries: {
      type: new GraphQLList(LogEntryType),
      async resolve(parent, args) {
        const idCursor = await db.query(aql`
        for readingLog IN readingLogs
        filter readingLog._key == ${parent.id}
        return readingLog.entries
        `);

        return await idCursor.all();
      },
    },
    book: {
      type: new GraphQLList(BookType),
      async resolve(parent, args) {
        // return _.filter(books, { authorId: parent.id });

        const idCursor = await db.query(aql`
        for readingLog IN readingLogs
        filter readingLog._key == ${parent.id}
        return readingLog._id
        `);

        const id = await idCursor.all();

        const cursor = await db.query(aql`
        for book IN 1..1 INBOUND ${id[0]} log 
        return { id: book._key, title: book.title, description: book.description, image: book.image, numberOfPages: book.numberOfPages, publicationDate: book.publicationDate, rating: book.rating }
        `);

        const book = await cursor.all();
        return book[0];
        // return Book.find({ authorId: parent.id });
      },
    },

    user: {
      type: new GraphQLList(UserType),
      async resolve(parent, args) {
        // return _.filter(books, { authorId: parent.id });

        const idCursor = await db.query(aql`
        for readingLog IN readingLogs
        filter readingLog._key == ${parent.id}
        return readingLog._id
        `);

        const id = await idCursor.all();

        const cursor = await db.query(aql`
        for user IN 1..1 INBOUND ${id[0]} log 
        return {id: user._key, email: user.email, firstName: user.firstName, lastName: user.lastName}
        `);

        const book = await cursor.all();
        return book[0];
        // return Book.find({ authorId: parent.id });
      },
    },
  }),
});

const LogEntryType = new GraphQLObjectType({
  name: "LogEntry",
  fields: () => ({
    date: { type: new GraphQLNonNull(GraphQLString) },
    pageNumber: { type: new GraphQLNonNull(GraphQLInt) },
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
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        // return _.find(authors, { id: args.id });
        const cursor = await db.query(aql`
        for user in users 
          filter user._key == ${args.id}
            return {id: user._key, firstName: user.firstName, lastName: user.lastName, email: user.email, password: user.password }
        `);

        const users = await cursor.all();
        return users[0];
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

    users: {
      type: new GraphQLList(UserType),
      async resolve(parent, args) {
        const cursor = await db.query(aql`
        for user in users
        return {id: user._key, firstName: user.firstName, lastName: user.lastName, email: user.email, password: user.password }
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

        const idCursor = await db.query(aql`
        for author IN authors
        filter author._key == ${args.authorId}
        return author._id
        `);

        const id = await idCursor.all();

        const booksCollection = await dbConnection.getCollection("books");
        const writtenByCollection = await dbConnection.getCollection("writtenBy");

        const newBook = await booksCollection.save(book);
        const edge = {
          _from: newBook._id,
          _to: id[0],
        };

        await writtenByCollection.save(edge);
      },
    },
    addUser: {
      type: UserType,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        let user = {
          firstName: args.firstName,
          lastName: args.lastName,
          email: args.email,
          password: args.password,
        };

        const usersCollection = await dbConnection.getCollection("users");
        usersCollection.save(user).then(
          () => console.log("Saved!"),
          (err) => console.log("failed to save")
        );
      },
    },

    addToBookshelf: {
      type: UserType,
      args: {
        userId: { type: new GraphQLNonNull(GraphQLID) },
        bookId: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args) {
        const userIdCursor = await db.query(aql`
        for user IN users
        filter user._key == ${args.userId}
        return user._id
        `);

        const userId = await userIdCursor.all();

        const bookIdCursor = await db.query(aql`
        for book IN books
        filter book._key == ${args.bookId}
        return book._id
        `);

        const bookId = await bookIdCursor.all();

        let bookshelfEdge = {
          _from: userId[0],
          _to: bookId[0],
        };

        const bookshelfCollection = await dbConnection.getCollection("bookshelf");
        bookshelfCollection.save(bookshelfEdge);
      },
    },
    addReadingLog: {
      type: ReadingLogType,
      args: {
        userId: { type: new GraphQLNonNull(GraphQLID) },
        bookId: { type: new GraphQLNonNull(GraphQLID) },
        startDate: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        const userIdCursor = await db.query(aql`
        for user IN users
        filter user._key == ${args.userId}
        return user._id
        `);

        const userId = await userIdCursor.all();

        const bookIdCursor = await db.query(aql`
        for book IN books
        filter book._key == ${args.bookId}
        return book._id
        `);

        const bookId = await bookIdCursor.all();

        let readingLog = {
          startDate: args.startDate,
          entries: [{ date: args.startDate, pageNumber: 0 }],
        };

        const readingLogsCollection = await dbConnection.getCollection("readingLogs");
        readingLog = await readingLogsCollection.save(readingLog);

        let logEdgeUser = {
          _from: userId[0],
          _to: readingLog._id,
        };

        const logCollection = await dbConnection.getCollection("log");
        await logCollection.save(logEdgeUser);

        let logEdgeBook = {
          _from: readingLog._id,
          _to: bookId[0],
        };

        await logCollection.save(logEdgeBook);

        let readingEdge = {
          _from: userId[0],
          _to: bookId[0],
          readingLogId: readingLog._id,
        };

        const readingCollection = await dbConnection.getCollection("reading");
        await readingCollection.save(readingEdge);
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
