import React, { useEffect, useState } from "react";
import DiscountEventCard from "../Event/DiscountEventCard.jsx";
import { useSelector } from "react-redux";

const DiscountEvent = () => {
  const [data, setData] = useState([]);
  const { products } = useSelector((state) => state.products);
  useEffect(() => {
    const filteredProducts = products?.filter(
      (item) => item?.isOnSale?.status === true
    );
    setData(filteredProducts);
  }, [products]);
  return (
    <div className="w-full mt-8">
      <div className="w-[90%] mx-auto flex flex-col items-center">
        <h1 className="uppercase md:text-[2rem] text-center font-Poppins font-[700]">
          Giảm giá chấn động
        </h1>
        <div className="w-[80%] pb-4 mt-4 sm:ml-12">
          <DiscountEventCard data={data} />
        </div>
      </div>
    </div>
  );
};

export default DiscountEvent;
