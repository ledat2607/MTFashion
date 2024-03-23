import React, { useState } from "react";
import ProductCard from "./ProductCard.jsx";
import { useSelector } from "react-redux";

const Product = () => {
  const { products } = useSelector((state) => state.products);
  const sortedProduct =
    products &&
    products
      .slice()
      .sort(
        (a, b) =>
          new Date(b?.createdAt?.slice(0, 10)) -
          new Date(a?.createdAt?.slice(0, 10))
      );

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = sortedProduct?.slice(startIndex, endIndex);
  const totalPages = Math.ceil(products?.length / itemsPerPage);
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="w-full mt-8 mx-auto">
      <div className="w-[90%] sm:ml-8 mx-auto">
        <h1 className="uppercase md:text-[1.5rem] font-Poppins font-[700]">
          Sản phẩm
        </h1>
        <div className="w-full pb-8 sm:ml-12 mt-6 min-h-screen">
          <ProductCard products={currentProducts} />
        </div>
        <div className="mt-4 ml-12">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={`mr-2 px-3 py-2 rounded ${
                currentPage === index + 1
                  ? "bg-gray-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
