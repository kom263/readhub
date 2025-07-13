import mongoose from "mongoose";
import dotenv from "dotenv";
import axios from "axios";
import Book from "./model/book.model.js";

dotenv.config();
mongoose.connect(process.env.MongoDBURI);

async function seedFromGoogleBooks(query = "python") {
  try {
    const res = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=20`
    );

    const books = res.data.items.map((item) => {
      const info = item.volumeInfo;

      return {
        title: info.title || "Untitled",
        author: info.authors?.[0] || "Unknown",
        description: info.description || "No description available.",
        coverImage: info.imageLinks?.thumbnail || "",
        publishedDate: info.publishedDate || "N/A",
        pageCount: info.pageCount || 0,
      };
    });

    await Book.deleteMany(); // clear existing
    await Book.insertMany(books);

    console.log(`✅ Seeded database with "${query}" books from Google Books API.`);
  } catch (err) {
    console.error("❌ Error seeding database:", err.message);
  } finally {
    mongoose.disconnect();
  }
}

seedFromGoogleBooks("java"); // Change query as needed (e.g., 'nodejs', 'mongodb')
