import React from "react";
import ProductCard from "./ProductCard.jsx";
import { productData } from "../../static/data.js";
const Product = () => {
  return (
    <div className="w-full mt-8 mx-auto">
      <div className="w-[90%] ml-8">
        <h1 className="uppercase md:text-[1.3rem] font-Paci font-[500]">
          Sản phẩm
        </h1>
        <div className="w-full pb-8 ml-12 mt-6">
          <ProductCard products={productData} />
        </div>
      </div>
    </div>
  );
};

export default Product;
