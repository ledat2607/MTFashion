import React from "react";
import MemberCard from "../Layout/MemberCard";

const Card = ({ user, type }) => {
  const getGradientColor = (type) => {
    switch (type) {
      case "Bronze":
        return "linear-gradient(to right, #452109, #7c370f)";
      case "Silver":
        return "linear-gradient(to right, #3b3a3a, #aeabab)";
      case "Gold":
        return "linear-gradient(to right, #efdc37, #DBDBDB)";
      case "Platinum":
        return "linear-gradient(to right, #656359,#DBDBDB)";
      case "Diamond":
        return "linear-gradient(to right, #210f3b, #747179)";
      default:
        return "linear-gradient(to right, #452109, #7c370f)";
    }
  };
  return (
    <div className="w-full flex flex-col">
      <div
        className={`bg-gradient-to-r rounded-2xl w-[90%] h-[70%] p-4 flex`}
        style={{ background: getGradientColor(type) }}
      >
        <div className="w-[70%] flex flex-col">
          <span className="text-xl uppercase font-[800] text-white">
            Member Card
          </span>
          <span className=" mt-6 font-DancingScript text-3xl uppercase font-[700] text-white">
            {user?.surName} {user?.name}
          </span>
          <span className="mt-8 font-DM text-xl uppercase font-[700] text-white">
            {user?.createdAt.slice(0, 10)}
          </span>
          <span className="mt-8 font-DM text-xl uppercase font-[700] text-white">
            {user?.customerType}
          </span>
        </div>
        <div className="w-[30%]">
          <MemberCard />
        </div>
      </div>
    </div>
  );
};
export default Card;
