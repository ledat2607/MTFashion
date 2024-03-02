import React from "react";
import { collection } from "../../static/data";

const CollectionCard = () => {
  // Sắp xếp mảng collection theo ngày giảm dần
  const sortedCollection = collection.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  // Ngày hiện tại
  const currentDate = new Date();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {sortedCollection?.map((i, index) => {
        const itemDate = new Date(i.date);

        const daysDiff = Math.floor(
          (currentDate - itemDate) / (1000 * 60 * 60 * 24)
        );

        const isNew = daysDiff <= 15;

        return (
          <div
            key={index}
            className="border border-teal-500 shadow-lg shadow-teal-800/60 rounded-xl p-3 hover:shadow-lg transition-all duration-300 cursor-pointer relative"
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
            <h1 className="mt-3 font-Paci">{i.title}</h1>
          </div>
        );
      })}
    </div>
  );
};

export default CollectionCard;
