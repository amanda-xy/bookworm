const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authorSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  biography: String,
  birthDate: String,
  image: String,
  averageRating: Number,
});

module.exports = mongoose.model("Author", authorSchema);
