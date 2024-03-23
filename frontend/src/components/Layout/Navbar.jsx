import React from "react";
import { Link } from "react-router-dom";
import { navItems } from "../../static/data";

const Navbar = ({ activeHeading }) => {
  return (
    <div className="w-[100%] mx-auto flex items-center justify-center relative">
      {navItems &&
        navItems.map((item, index) => (
          <div className="lg:block sm:hidden hidden relative" key={index}>
            <Link
              to={item.url}
              className={`${
                activeHeading === index + 1
                  ? "text-white underline"
                  : "text-gray-400 800px:text-[#fff]"
              } pb-[30px] text-[13px] hover:text-white md:text-[1.2rem] font-[600] lg:text-[1.3rem] sm:pb-0 px-6 cursor-pointer font-DM relative`}
            >
              {item.title}
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Navbar;
