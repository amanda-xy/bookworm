const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: String,
  description: String,
  numberOfPages: Number,
  image: String,
  rating: Number,
  genre: String,
  publicationDate: String,
  authorId: String,
});

module.exports = mongoose.model("Book", bookSchema);
