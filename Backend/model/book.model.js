import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  description: String,
  coverImage: String,
  publishedDate: String,
  pageCount: Number,
});
const Book = mongoose.model("Book", bookSchema);

export default Book;