import React, { useEffect, useState } from "react";
import { productData } from "../../static/data";
import ProductCard from "./ProductCard";

const SuggessProduct = ({ data }) => {
  const [sugData, setSugData] = useState([]);
  useEffect(() => {
    const d =
      productData && productData.filter((i) => i.category === data.category);
    setSugData(d);
  }, [data]);
  return (
    <div>
      {data ? (
        <div className="p-4 w-[90%] mx-auto bg-white">
          <h2 className="text-[25px] font-[500] border-b mb-5">
            Các sản phẩm liên quan
          </h2>
          <div className="w-full">
            {sugData && <ProductCard products={sugData} />}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SuggessProduct;
