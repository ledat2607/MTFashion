import React from "react";
import DiscountEventCard from "../Event/DiscountEventCard.jsx";

const DiscountEvent = () => {
  return (
    <div className="w-full mt-8">
      <div className="w-[90%] sm:ml-8 mx-auto">
        <h1 className="uppercase md:text-[1.3rem] font-Paci font-[500]">
          Sự kiện giảm giá
        </h1>
        <div className="w-full pb-4 mt-4 sm:ml-12">
          <DiscountEventCard />
        </div>
      </div>
    </div>
  );
};

export default DiscountEvent;
