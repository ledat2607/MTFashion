import React from "react";
import CollectionCard from "./CollectionCard.jsx";
const Collection = () => {
  return (
    <div className="w-full mt-8">
      <div className="w-[90%] ml-8">
        <h1 className="uppercase md:text-[1.3rem] font-Paci font-[500]">
          Bộ sưu tập
        </h1>
        <div className="w-full pb-4 mt-4 ml-12">
          <CollectionCard />
        </div>
      </div>
    </div>
  );
};

export default Collection;
