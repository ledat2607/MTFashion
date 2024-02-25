import React from "react";
import BlogCard from "./BlogCard";
const Blog = () => {
  return (
    <div className="w-full mt-8">
      <div className="w-[90%] sm:ml-8 mx-auto ">
        <h1 className="uppercase md:text-[1.3rem] font-Paci font-[500]">
          Tin tức thời trang
        </h1>
        <div className="w-full pb-4 mt-4 sm:ml-12 ml-0">
          <BlogCard />
        </div>
      </div>
    </div>
  );
};

export default Blog;
