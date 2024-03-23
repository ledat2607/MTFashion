import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";

const SuggessProduct = ({ data }) => {
  const { products } = useSelector((state) => state.products);

  const [sugData, setSugData] = useState([]);
  useEffect(() => {
    const d = products && products.filter((i) => i.category === data.category);
    setSugData(d);
  }, [data, products]);
  return (
    <div>
      {data ? (
        <div className="p-4 w-[90%] mx-auto bg-white">
          <h2 className="text-[25px] font-[500] border-b mb-5">
            Các sản phẩm liên quan
          </h2>
          <div className="w-full pb-8">
            {sugData && <ProductCard products={sugData} />}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SuggessProduct;
