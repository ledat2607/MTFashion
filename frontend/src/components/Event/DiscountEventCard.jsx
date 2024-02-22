import React from "react";
import { discountEventData } from "../../static/data";

const DiscountEventCard = () => {
  const currentDate = new Date();
  const filteredData = discountEventData
    ?.filter((item) => {
      const itemEndDate = new Date(item.end_date);
      return itemEndDate - currentDate >= 0 * 60 * 60 * 1000;
    })
    .sort((a, b) => {
      return new Date(a.start_date) - new Date(b.start_date);
    });

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 gap-4">
      {filteredData?.map((i, index) => {
        const itemStartDate = new Date(i.start_date);
        const itemEndDate = new Date(i.end_date);

        const utcCurrentDate = new Date(currentDate.toISOString());
        const utcItemStartDate = new Date(itemStartDate.toISOString());
        const utcItemEndDate = new Date(itemEndDate.toISOString());

        const isEndingSoon =
          utcItemEndDate - utcCurrentDate < 12 * 60 * 60 * 1000 &&
          utcCurrentDate.getUTCHours() < utcItemEndDate.getUTCHours();

        const isUpcoming = utcItemStartDate > utcCurrentDate;

        const isOngoing =
          utcItemStartDate <= utcCurrentDate &&
          utcCurrentDate < utcItemEndDate &&
          !isEndingSoon;
        return (
          <div
            key={index}
            className="border border-teal-500 shadow-lg shadow-teal-800/60 rounded-xl p-3 hover:shadow-lg transition-all duration-300 cursor-pointer relative"
          >
            {isEndingSoon && (
              <span className="absolute top-0 z-[800] left-0 bg-red-500 text-white py-1 px-2 rounded-tl-md rounded-br-md">
                Sắp kết thúc
              </span>
            )}
            {isUpcoming && (
              <span className="absolute top-0 z-[800] left-0 bg-blue-500 text-white py-1 px-2 rounded-tl-md rounded-br-md">
                Sắp diễn ra
              </span>
            )}
            {isOngoing && (
              <span className="absolute top-0 z-[800] left-0 bg-green-500 text-white py-1 px-2 rounded-tl-md rounded-br-md">
                Đang diễn ra
              </span>
            )}
            <div className="flex justify-center items-center sm:h-[35vh] h-[18vh]">
              <img
                src={i.img}
                alt=""
                className="sm:w-[80%] sm:h-[30vh] w-[50%] h-[10vh] sm:object-contain object-cover hover:scale-[1.1] transition-all duration-300 cursor-pointer"
              />
            </div>
            <div className="w-full flex justify-between items-center">
              <h1 className="mt-3 font-Paci text-[12px] sm:text-sm lg:text-lg md:text-md">
                {i.name}
              </h1>
              <h1 className="mt-3 font-Paci text-[12px] sm:text-sm lg:text-lg md:text-md">
                -{i.discount_rate}%
              </h1>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DiscountEventCard;
