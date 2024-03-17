import React, { useEffect, useState } from "react";
import DiscountEventCard from "../Event/DiscountEventCard.jsx";
import { productData } from "../../static/data.js";

const DiscountEvent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const filteredProducts = productData.filter(
      (item) => item?.isOnSales?.status === true
    );
    setData(filteredProducts);
  }, []);
  return (
    <div className="w-full mt-8">
      <div className="w-[90%] sm:ml-8 mx-auto">
        <h1 className="uppercase md:text-[1.5rem] font-Poppins font-[700]">
          Giảm giá chấn động
        </h1>
        <div className="w-full pb-4 mt-4 sm:ml-12">
          <DiscountEventCard data={data} />
        </div>
      </div>
    </div>
  );
};

export default DiscountEvent;
