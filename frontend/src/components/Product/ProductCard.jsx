import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { discountEventData } from "../../static/data";

const ProductCard = ({ products }) => {
  const [wishlistStates, setWishlistStates] = useState(
    products.map(() => false)
  );

  const toggleWishlist = (index) => {
    const newWishlistStates = [...wishlistStates];
    newWishlistStates[index] = !newWishlistStates[index];
    setWishlistStates(newWishlistStates);
  };
  //sắp xếp dữ liệu theo giảm
  const sortedProduct = products.sort(
    (a, b) => new Date(b.start_date) - new Date(a.start_date)
  );

  const currentDate = new Date();
  //Lấy thông tin khuyến mãi
  const discountInfo = discountEventData.reduce((acc, event) => {
    acc[event.collection] = event.discount_rate;
    return acc;
  }, {});
  //Cập nhật giá cho sản phẩm
  const updatedProducts = sortedProduct.map((product) => {
    const discountRate = discountInfo[product.collection] || 0;
    const discountedPrice =
      product.discount_price - (product.discount_price * discountRate) / 100;

    return {
      ...product,
      discountedPrice,
    };
  });
  //format định dạng tiền tệ
  function formatVietnameseCurrency(number) {
    const roundedNumber = Math.round(number / 1000) * 1000;
    const formattedNumber = roundedNumber.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });

    return formattedNumber;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-8">
      {updatedProducts.map((i, index) => {
        const itemDate = new Date(i.date);
        const daysDiff = Math.floor(
          (currentDate - itemDate) / (1000 * 60 * 60 * 24)
        );
        const isNew = daysDiff <= 15;

        return (
          <div key={index}>
            <div className="border border-teal-500 shadow-lg shadow-teal-800/60 rounded-xl p-3 hover:shadow-lg transition-all duration-300 cursor-pointer relative">
              {isNew && (
                <span className="absolute top-0 z-[800] left-0 bg-green-500 text-white py-1 px-2 rounded-tl-md rounded-br-md">
                  Mới
                </span>
              )}
              <div
                className={`${
                  wishlistStates[index] ? "bg-white" : "bg-teal-500/80"
                } absolute w-8 h-8 top-1 flex justify-center items-center rounded-full right-1`}
              >
                <FaHeart
                  onClick={() => toggleWishlist(index)}
                  size={20}
                  className={`${
                    wishlistStates[index] ? "text-teal-500" : "text-white"
                  } transition-all duration-300`}
                />
              </div>

              <div className="mt-8 flex justify-center">
                <img
                  src={i.image_Url[0].url}
                  alt=""
                  className="w-[90%] h-[25vh] rounded-xl object-cover hover:scale-[1.1] transition-all duration-300 cursor-pointer"
                />
              </div>
              <Link to={`/product/${i.name}`}>
                <h1 className="mt-3 font-Paci">{i.name}</h1>
              </Link>

              <div className="flex items-center mt-2">
                <div className="w-40 h-1 bg-gray-300 rounded-md overflow-hidden">
                  <div
                    className="h-full bg-green-500"
                    style={{ width: `${(i.rating / 5) * 100}%` }}
                  ></div>
                </div>
                <span className="ml-2">({i.rating}/5)</span>
              </div>
              <div className="w-full flex items-center justify-between h-[30px] ">
                <div className="relative flex justify-center items-center">
                  <span className="text-green-500  text-[10px] sm:text-sm lg:text-lg md:text-md">
                    {formatVietnameseCurrency(i.discountedPrice)}
                  </span>
                  {discountInfo[i.collection] > 0 ? (
                    <div className="sm:w-8 sm:h-8 w-6 h-6 bg-red-500 rounded-full ml-2 flex justify-center items-center">
                      <span className="absolute sm:text-[10px] text-[8px] text-white">
                        - {discountInfo[i.collection] || 0}%
                      </span>
                    </div>
                  ) : null}
                </div>
                <h1 className="text-red-500 line-through text-[10px] sm:text-sm lg:text-lg md:text-md">
                  {formatVietnameseCurrency(i.price)}
                </h1>
              </div>
              <span className="text-[10px] sm:text-sm lg:text-lg md:text-md">
                Đã bán: {i.total_sell}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductCard;
