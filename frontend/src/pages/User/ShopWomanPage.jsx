import React from "react";
import { productData } from "../../static/data";
import ProductCard from "../../components/Product/ProductCard";
import Header from "../../components/Layout/Header";

const ShopWomanPage = () => {
  const filteredProducts = productData.filter(
    (product) => product.category === "woman"
  );
  return (
    <div>
      <Header activeHeading={3} />
      <div className="w-[90%] mx-auto">
        <ProductCard products={filteredProducts} />
      </div>
    </div>
  );
};

export default ShopWomanPage;
