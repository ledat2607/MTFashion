import Lottie from "react-lottie";
import animationData from "../../assets/Animation - 1712374350734.json";
import React from "react";

const Shipping = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Lottie options={defaultOptions} width={60} height={40} />
    </div>
  );
};

export default Shipping;
