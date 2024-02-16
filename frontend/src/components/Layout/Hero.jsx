import React from "react";
import buttonimg from "../../assets/button.png";
const Hero = () => {
  return (
    <div className="relative w-full h-[80vh] bg-teal-300/40 overflow-hidden">
      <div className="flex justify-between">
        <div className="w-[45%] my-auto flex flex-col justify-between items-center">
          <div className="font-DM sm:text-xl text-[12px] font-[600]">
            Giảm giá lên đến 70%
          </div>
          <div className="font-DM sm:text-2xl font-[700] uppercase mt-4 text-gray-800">
            Các sản phẩm cùng bộ sưu tập
          </div>
          <div className="relative w-[20%] mt-8 cursor-pointer hover:scale-[1.1] transition-transform duration-100">
            <img src={buttonimg} alt="" className="w-[250px] h-[60px]" />
            <span className="text-3xl font-[500] absolute top-2 left-6 font-DancingScript text-red-500">
              Mua ngay
            </span>
          </div>
        </div>

        <div className="h-full relative sm:block hidden">
          <img
            src="https://res.cloudinary.com/degfccw8e/image/upload/v1708006558/pexels-konstantin-mishchenko-1926769-removebg-preview_itoakb.png"
            alt=""
            className="h-[80vh]"
          />

          <img
            src="https://res.cloudinary.com/degfccw8e/image/upload/v1708006557/pexels-pixabay-157675-removebg-preview_wnbleb.png"
            alt=""
            className="absolute top-[37.5%] right-[65%] h-[50vh]"
          />
        </div>
      </div>
      <div className="before:absolute before:left-0 before:bottom-0 before:w-1/4 before:h-3/6 before:bg-gradient-to-bl before:from-transparent before:to-teal-500/60 before:rounded-tr-full"></div>
    </div>
  );
};

export default Hero;
