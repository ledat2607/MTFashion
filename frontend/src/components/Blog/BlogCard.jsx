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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 mt-8">
      <div>
        <div className="sm:w-[77%] w-full sm:h-[75vh] border border-teal-500 shadow-md hover:shadow-teal-500/80 relative overflow-hidden rounded-2xl">
          <img
            src={firstItem.img}
            alt=""
            className="w-full sm:h-[55vh] rounded-tl-2xl rounded-tr-2xl hover:scale-[1.1] cursor-pointer transition-transform duration-300 object-contain"
          />
          <h1 className="w-full pt-8 bg-teal-500 z-[400]">{firstItem.name}</h1>
          <div>{truncateText(firstItem.description, 150)}</div>
        </div>
      </div>
      <div className="w-full sm:flex sm:flex-col justify-center items-center">
        <div className="sm:w-[90%] h-[40vh] border border-teal-500 shadow-md hover:shadow-teal-500/80 flex relative overflow-hidden rounded-tl-3xl rounded-br-3xl">
          <img
            src={secondItem.img}
            alt=""
            className="w-[50%] h-full hover:scale-[1.1] rounded-tl-3xl cursor-pointer transition-transform duration-300 sm:object-cover object-fit"
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
        <div className="mt-8 sm:w-[90%] h-[40vh] border border-teal-500 shadow-md hover:shadow-teal-500/80  relative overflow-hidden flex rounded-tl-3xl rounded-br-3xl">
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
  );
};

export default BlogCard;
