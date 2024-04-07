import React from "react";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import animationData from "../../assets/Animation - 1712233481107.json";
import Lottie from "react-lottie";
import { useNavigate } from "react-router-dom";

const OrderSuccessPage = () => {
  const navigate = useNavigate();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const handleHome = () => {
    navigate("/");
  };
  const handleOrder = () => {
    navigate("/profile");
  };
  return (
    <div>
      <Header />
      <div className="w-full h-[90vh] flex justify-center items-center flex-col">
        <h1 className="mb-6 text-xl font-Poppins font-[600] uppercase text-center">
          Đã đặt hàng thành công
        </h1>
        <Lottie options={defaultOptions} width={250} height={250} />
        <div className="w-[40%] h-[10vh] mx-auto flex justify-center items-center mt-8">
          <div
            onClick={handleHome}
            className="w-[100px] h-[40px] bg-gray-300 flex justify-center items-center rounded-2xl text-lg font-[600] text-black hover:bg-blue-500 hover:text-white cursor-pointer hover:translate-x-2 transition-transform duration-300"
          >
            Trang chủ
          </div>
          <div
            onClick={handleOrder}
            className="ml-4 w-[250px] h-[40px] bg-gray-300 flex justify-center items-center rounded-2xl text-lg font-[600] text-black hover:bg-blue-500 hover:text-white cursor-pointer hover:translate-x-2 transition-transform duration-300"
          >
            Xem danh sách mua hàng
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderSuccessPage;
