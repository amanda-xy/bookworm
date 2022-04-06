const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  numberOfPages: Number,
  image: String,
  rating: Number,
  genre: String,
  publicationDate: String,
  authorId: { type: String, required: true },
});

module.exports = mongoose.model("Book", bookSchema);
