import React, { useState } from "react";
import ProductCard from "./ProductCard.jsx";
import { productData } from "../../static/data.js";

const Product = () => {
  const sortedProduct = productData?.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = sortedProduct?.slice(startIndex, endIndex);
  const totalPages = Math.ceil(productData.length / itemsPerPage);
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="w-full mt-8 mx-auto">
      <div className="w-[90%] sm:ml-8 mx-auto">
        <h1 className="uppercase md:text-[1.3rem] font-Paci font-[500]">
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
