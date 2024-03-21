import React from "react";
import { useSelector } from "react-redux";

const AllProduct = () => {
  const { products } = useSelector((state) => state.products);
  return (
    <div>
      {products ? (
        <div>Sản phẩm</div>
      ) : (
        <div className="w-full h-full">Chưa có sản phẩm nào</div>
      )}
    </div>
  );
};

export default AllProduct;
