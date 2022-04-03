const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authorSchema = new Schema({
  firstName: String,
  lastName: String,
  biography: String,
  birthDate: String,
  image: String,
  averageRating: Number,
});

module.exports = mongoose.model("Author", authorSchema);
