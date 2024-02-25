import React from "react";
import { blogData } from "../../static/data";

const BlogCard = () => {
  const sortedData = blogData?.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );
  const [firstItem, secondItem, thirdItem] = sortedData?.slice(0, 3) || [];
  const truncateText = (text, maxChars) => {
    if (text.length <= maxChars) {
      return text;
    }
    return text.slice(0, maxChars) + "...";
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-6 mt-8">
      <div className="w-full flex justify-between items-center">
        <div className="w-[45%] h-[84vh] border border-teal-500 shadow-md hover:shadow-teal-500/80 relative overflow-hidden rounded-2xl">
          <img
            src={firstItem.img}
            alt=""
            className="w-full rounded-tl-2xl rounded-tr-2xl hover:scale-[1.1] cursor-pointer transition-transform duration-300 object-contain"
          />
          <h1 className="w-full pt-8 bg-teal-500">{firstItem.name}</h1>
          <div>{truncateText(firstItem.description, 150)}</div>
        </div>
        <div className="w-[45%]">
          <div className="w-full h-[40vh] border border-teal-500 shadow-md hover:shadow-teal-500/80 flex relative overflow-hidden rounded-tl-3xl rounded-br-3xl">
            <img
              src={secondItem.img}
              alt=""
              className="w-[50%] h-full hover:scale-[1.1] rounded-tl-3xl cursor-pointer transition-transform duration-300 object-cover"
            />
            <div>
              <h1 className="w-full pl-6 bg-teal-500 text-white sm:text-xl font-DM text-center">
                {secondItem.name}
              </h1>
              <div className="ml-6 font-DM">
                {truncateText(secondItem.description, 150)}
              </div>
            </div>
          </div>
          <div className="mt-8 w-full h-[40vh] border border-teal-500 shadow-md hover:shadow-teal-500/80  relative overflow-hidden flex rounded-tl-3xl rounded-br-3xl">
            <img
              src={thirdItem.img}
              alt=""
              className="w-[50%] h-full hover:scale-[1.1] rounded-tl-3xl cursor-pointer transition-transform duration-300 object-cover"
            />
            <div>
              <h1 className="w-full pl-6 bg-teal-500 text-white sm:text-xl font-DM text-center">
                {thirdItem.name}
              </h1>
              <div className="ml-6 font-DM">
                {truncateText(thirdItem.description, 150)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
