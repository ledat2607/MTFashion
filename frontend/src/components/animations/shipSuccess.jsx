import Lottie from "react-lottie";
import animationData from "../../assets/Animation - 1712374918078.json";
import React from "react";

const ShipSuccess = () => {
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
      <Lottie options={defaultOptions} width={40} height={30} />
    </div>
  );
};

export default ShipSuccess;
