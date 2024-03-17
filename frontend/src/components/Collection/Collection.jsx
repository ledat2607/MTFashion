import React from "react";
import CollectionCard from "./CollectionCard.jsx";
const Collection = () => {
  return (
    <div className="w-full mt-8">
      <div className="w-[90%] sm:ml-8 mx-auto">
        <h1 className="uppercase md:text-[1.5rem] font-Poppins font-[700]">
          Bộ sưu tập
        </h1>
        <div className="w-full pb-4 mt-4 sm:ml-12">
          <CollectionCard />
        </div>
      </div>
    </div>
  );
};

export default Collection;
