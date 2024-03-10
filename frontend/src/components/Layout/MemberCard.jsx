import Lottie from "react-lottie";
import animationData from "../../assets/Animation - 1709811265263.json";
import React from "react";

const MemberCard = () => {
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
      <Lottie options={defaultOptions} width={200} height={150} />
    </div>
  );
};

export default MemberCard;
