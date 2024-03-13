import React, { useState } from "react";
import { Link } from "react-router-dom";
import { navItems } from "../../static/data";

const Navbar = ({ activeHeading }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="w-[85%] mx-auto flex items-center justify-between relative">
      {navItems &&
        navItems.map((item, index) => (
          <div
            className="lg:block sm:hidden hidden relative"
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <Link
              to={item.url}
              className={`${
                activeHeading === index + 1
                  ? "text-white underline"
                  : "text-gray-400 800px:text-[#fff]"
              } pb-[30px] text-[13px] hover:text-white md:text-[1.2rem] lg:text-[1.3rem] sm:pb-0 px-6 cursor-pointer font-Protest relative`}
            >
              {item.title}
            </Link>

            {item.subMenu && hoveredIndex === index && (
              <div className="absolute w-[40vw] flex top-full z-[1000] left-0 bg-white h-[40vh] p-4">
                {item.subMenu.map((subItem, subIndex) => (
                  <div key={subIndex}>
                    <p
                      to={subItem.link}
                      className="font-bold pr-8 hover:cursor-pointer pb-4"
                    >
                      {subItem.categoryName}
                    </p>
                    {subItem.subCategories && (
                      <ul>
                        {subItem.subCategories.map(
                          (subCategory, subCatIndex) => (
                            <li key={subCatIndex}>
                              <p to={subCategory.url}>
                                <p className="text-gray-800 hover:cursor-pointer mb-6 hover:text-teal-500 transition-transform duration-150 hover:translate-x-3">
                                  {subCategory.title}
                                </p>
                              </p>
                            </li>
                          )
                        )}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default Navbar;
