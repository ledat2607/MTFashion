import React from "react";
import { Link } from "react-router-dom";
import { navItems } from "../../static/data";

const Navbar = ({ active }) => {
  return (
    <div className="w-[85%] mx-auto flex items-center justify-between mt-2 pt-3">
      {navItems &&
        navItems.map((i, index) => (
          <div className="sm:block hidden" key={index}>
            <Link
              to={i.url}
              className={`${
                active === index + 1
                  ? "text-white"
                  : "text-black 800px:text-[#fff]"
              } pb-[30px] text-[0.5rem] md:text-[1.1rem] lg:text-[1.4rem] sm:pb-0 font-[500] px-6 cursor-pointer font-DancingScript`}
            >
              {i.title}
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Navbar;
