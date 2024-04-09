import Lottie from "react-lottie";
import animationData from "../../assets/V9C3zaHtYD.json";
import React from "react";

const LoadUser = () => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Lottie options={defaultOptions} width={100} height={90} />
    </div>
  );
};

export default LoadUser;
