const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  rating: Number,
  text: String,
  hasSpoilers: Boolean,
  publicationDate: String,
  bookId: String,
});

module.exports = mongoose.model("Review", reviewSchema);
