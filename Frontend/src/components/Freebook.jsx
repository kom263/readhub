import React, { useEffect, useState } from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import axios from "axios";

import Cards from "./Cards";

function Freebook() {
  const [book, setBook] = useState([]);

  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get("http://localhost:4001/book");
        const freeBooks = res.data.filter((item) => item.category === "Free");
        setBook(freeBooks);
      } catch (error) {
        console.error("Failed to fetch free courses:", error);
      }
    };
    getBook();
  }, []);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
      <section>
        <h1 className="font-semibold text-xl pb-2">Free Offered Courses</h1>
        <p className="mb-6 text-gray-700">
          Discover a curated collection of free courses designed to help you
          enhance your skills and jumpstart your learning journey. Explore
          these valuable resources and start growing today—completely free.
        </p>
      </section>

      <section>
        {book.length > 0 ? (
          <Slider {...settings}>
            {book.map((item) => (
              <Cards key={item._id || item.id} item={item} />
            ))}
          </Slider>
        ) : (
          <p className="text-center text-gray-500">No free courses available right now.</p>
        )}
      </section>
    </div>
  );
}

export default Freebook;
