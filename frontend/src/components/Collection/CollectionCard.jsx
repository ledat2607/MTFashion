import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { collection } from "../../static/data";

const CollectionCard = () => {
  // Sắp xếp mảng collection theo ngày giảm dần
  const sortedCollection = collection.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  // Ngày hiện tại
  const currentDate = new Date();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {sortedCollection?.map((i, index) => {
        const itemDate = new Date(i.date);

        const daysDiff = Math.floor(
          (currentDate - itemDate) / (1000 * 60 * 60 * 24)
        );

        const isNew = daysDiff <= 15;

        return (
          <div className="p-4">
            <div
              key={index}
              className="border border-teal-500 shadow-lg shadow-teal-800/60 rounded-xl hover:shadow-lg transition-all duration-300 cursor-pointer relative p-4"
            >
              {isNew && (
                <span className="absolute top-0 z-4 left-0 bg-green-500 text-white py-1 px-2 rounded-tl-md rounded-br-md">
                  Mới
                </span>
              )}
              <div>
                <img
                  src={i.img}
                  alt=""
                  className="w-full h-[25vh] object-contain hover:scale-[1.1] transition-all duration-300 cursor-pointer"
                />
              </div>
              <h1 className="mt-3 font-DM font-[600]">{i.title}</h1>
            </div>
          </div>
        );
      })}
    </Slider>
  );
};

export default CollectionCard;
