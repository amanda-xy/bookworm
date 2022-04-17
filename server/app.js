const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
// const mongoose = require("mongoose");
const dbConnection = require("./db");

const cors = require("cors");

const app = express();

app.use(express.json({ limit: "50mb" }));

// allow cross-origin requests
app.use(cors());

// mongoose.connect("mongodb+srv://amanda:3BwMFYcHW9WeWwbN@cluster0.qmivw.mongodb.net/bookworm?retryWrites=true&w=majority");
// mongoose.connection.once("open", () => {
//   console.log("connected to database");
// });
dbConnection.getConnection();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("Now listening for requests on port 4000");
});
