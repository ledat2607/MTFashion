import React from "react";
import buttonimg from "../../assets/button.png";
const Hero = () => {
  return (
    <div
      style={{
        background:
          "linear-gradient(to top right, #FFD3E0, #B5EAD7, #B6C0C5, #CBE7E3 ,#353A5F)",
      }}
      className="relative w-full h-[80vh] overflow-hidden"
    >
      <div className="flex justify-between flex-col sm:flex-row">
        <div className="sm:w-[45%] mx-auto mt-4 w-[90%] sm:my-auto flex flex-col justify-between items-center">
          <div className="font-DM sm:text-2xl text-[12px] font-[600]">
            Giảm giá lên đến 70%
          </div>
          <div className="font-Poppins sm:text-4xl font-[700] uppercase mt-4 text-gray-800">
            Các sản phẩm cùng bộ sưu tập
          </div>
          <div className="relative sm:w-[20%] w-[40%] mt-8 cursor-pointer hover:scale-[1.1] transition-transform duration-100">
            <img
              src={buttonimg}
              alt=""
              className="sm:w-[250px] w-full h-[60px]"
            />
            <span className="text-2xl font-[500] absolute top-2 left-6 font-Roboto text-red-500">
              Mua ngay
            </span>
          </div>
        </div>

        <div className="h-full sm:mt-0 mt-9 relative">
          <img
            src="https://res.cloudinary.com/degfccw8e/image/upload/v1708006558/pexels-konstantin-mishchenko-1926769-removebg-preview_itoakb.png"
            alt=""
            className="sm:h-[80vh] sm:ml-0 ml-[15%] h-[50vh]"
          />

          <img
            src="https://res.cloudinary.com/degfccw8e/image/upload/v1708006557/pexels-pixabay-157675-removebg-preview_wnbleb.png"
            alt=""
            className="absolute sm:top-[37.5%] sm:right-[65%] sm:h-[50vh] h-[30vh] bottom-0 right-[20%]"
          />
        </div>
      </div>
      <div className="before:absolute before:left-0 before:bottom-0 sm:before:w-1/4 w-[20px] h-[20px] sm:before:h-3/6 before:bg-gradient-to-bl before:from-[#bfffc7] before:to-[#11a5a7] before:rounded-tr-full"></div>
    </div>
  );
};

export default Hero;
