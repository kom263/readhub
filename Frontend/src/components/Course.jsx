import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import axios from "axios";
import { Link } from "react-router-dom";

function Course() {
  const [book, setBook] = useState([]);

  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get("http://localhost:4001/book");
        console.log(res.data);
        setBook(res.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    getBook();
  }, []);

  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div className="mt-28 flex flex-col items-center text-center">
          <h1 className="text-2xl md:text-4xl font-semibold">
            We're delighted to have you{" "}
            <span className="text-pink-500">here! :)</span>
          </h1>
          <p className="mt-8 text-gray-600 max-w-3xl">
            Explore our carefully curated collection of books designed to help you
            master modern web development. Whether you're just starting out or
            refining your skills, we have resources that will guide and inspire you
            on your learning journey.
          </p>
          <Link to="/">
            <button className="mt-6 bg-pink-500 text-white px-6 py-2 rounded-md hover:bg-pink-700 transition duration-300">
              Back to Home
            </button>
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          {book.length > 0 ? (
            book.map((item) => <Cards key={item._id} item={item} />)
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No books available at the moment.
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default Course;
