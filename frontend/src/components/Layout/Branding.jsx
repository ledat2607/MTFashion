import React from "react";
import { brandingData } from "../../static/data";

const Branding = () => {
  return (
    <div className="z-1 w-[90%] my-12 border mx-auto rounded-2xl">
      <div className="w-full mx-auto hidden sm:block ">
        <div
          className={`branding flex justify-between w-full shadow-sm bg-gray-100 p-5 rounded-2xl`}
        >
          {brandingData &&
            brandingData.map((i, index) => (
              <div
                className="flex items-start cursor-pointer hover:scale-[1.2] overflow-hidden duration-300 transition-transform"
                key={index}
              >
                {i.icon}
                <div className="px-3">
                  <h3 className="font-bold text-sm md:text-base">{i.title}</h3>
                  <p className="text-xs md:text-sm">{i.Description}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Branding;
