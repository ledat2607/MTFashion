import React from "react";
import { Link } from "react-router-dom";
import { navItems } from "../../static/data";

const Navbar = ({ activeHeading }) => {
  return (
    <div className="w-[85%] mx-auto flex items-center justify-between">
      {navItems &&
        navItems.map((i, index) => (
          <div className="lg:block sm:hidden hidden" key={index}>
            <Link
              to={i.url}
              className={`${
                activeHeading === index + 1
                  ? "text-white underline"
                  : "text-gray-400 800px:text-[#fff]"
              } pb-[30px] text-[13px] md:text-[1.2rem] lg:text-[1.3rem] sm:pb-0 px-6 cursor-pointer font-Protest`}
            >
              {i.title}
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Navbar;
