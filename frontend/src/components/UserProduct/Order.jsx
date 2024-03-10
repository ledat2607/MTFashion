import React from "react";
import { CgDetailsMore } from "react-icons/cg";
import { RiDeleteBack2Fill } from "react-icons/ri";
const Order = () => {
  function formatVietnameseCurrency(number) {
    const roundedNumber = Math.round(number / 1000) * 1000;
    const formattedNumber = roundedNumber.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });

    return formattedNumber;
  }
  return (
    <div className="w-full mx-auto border h-[82vh] bg-white">
      <h1 className="text-2xl uppercase font-[700] font-DM pt-4 text-center">
        Tất cả đơn hàng
      </h1>
      <div
        className="w-[95%] mx-auto rounded-2xl mt-4 h-[20vh] border-l-2 border-b-4 border-r-2 border-r-black flex"
        style={{
          background:
            "linear-gradient(to top right, #B6C0C5, #18A5A7, #CBE7E3, #FDABDD ,#B6C0C5)",
        }}
      >
        <div className="w-[20%]  h-full flex flex-col justify-center items-center">
          <h1 className="w-full bg-gray-300 rounded-tl-2xl text-xl text-center">
            Hình ảnh
          </h1>
          <div className="bg-transparent w-[80%] h-[80%] mt-[6px]">
            <img
              src="https://printyfly.com/wp-content/uploads/2023/06/printyfly-men-fashion-collection-2023-7.webp"
              alt=""
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        <div className="w-[20%] h-full flex flex-col justify-center items-center">
          <h1 className="w-full bg-gray-300 text-xl text-center">Ngày đặt</h1>
          <div className="bg-transparent w-full h-full">
            <span className="flex justify-center items-center w-full h-full">
              2024.03.10
            </span>
          </div>
        </div>
        <div className="w-[20%] h-full flex flex-col justify-center items-center">
          <h1 className="w-full bg-gray-300 text-xl text-center">
            Ngày giao hàng
          </h1>
          <div className="bg-transparent w-full h-full">
            <span className="flex justify-center items-center w-full h-full">
              2024.03.10
            </span>
          </div>
        </div>
        <div className="w-[20%] h-full flex flex-col justify-center items-center">
          <h1 className="w-full bg-gray-300 text-xl text-center">Giá tiền</h1>
          <div className="bg-transparent w-full h-full">
            <span className="flex justify-center items-center w-full h-full">
              {formatVietnameseCurrency(549000)}
            </span>
          </div>
        </div>
        <div className="w-[20%] h-full flex flex-col justify-center items-center">
          <h1 className="w-full bg-gray-300 rounded-tr-2xl text-xl text-center">
            Chức năng
          </h1>
          <div className="bg-transparent w-full h-full flex justify-center items-center">
            <CgDetailsMore
              size={25}
              className="hover:cursor-pointer  hover:translate-x-2 transition-transform duration-200"
            />
            <RiDeleteBack2Fill
              size={25}
              className="ml-4 hover:cursor-pointer hover:text-red-500 hover:translate-x-2 transition-transform duration-200"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
