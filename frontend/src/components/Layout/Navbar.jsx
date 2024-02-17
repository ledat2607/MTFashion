import React, { useState } from "react";
import { Link } from "react-router-dom";
import { navItems } from "../../static/data";

const Navbar = ({ activeHeading }) => {
  const [hoveredTitle, setHoveredTitle] = useState(null);
  const [showSubmenu, setShowSubmenu] = useState(false);

  const handleMouseEnter = (index) => {
    setHoveredTitle(index + 1);
    setShowSubmenu(true);
  };

  const handleMouseLeave = () => {
    setHoveredTitle(null);
    setShowSubmenu(false);
  };

  return (
    <div className="w-[85%] mx-auto flex items-center justify-between relative">
      {navItems &&
        navItems.map((item, index) => (
          <div
            className="lg:block sm:hidden hidden relative"
            key={index}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
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
            {showSubmenu && hoveredTitle === index + 1 && item.submenu && (
              <div
                className="absolute z-[100] transform -translate-x-6 w-full min-w-[45vw] h-[30vh] bg-white transition-all duration-300 overflow-hidden flex"
                style={{
                  top: "100%",
                  borderRadius: "8px",
                }}
              >
                {/* Phần trái của submenu */}
                <div className="flex-grow w-1/2 overflow-hidden relative">
                  {item.submenu.map((subItem, subIndex) => (
                    <div key={subIndex} className="h-[100%] relative">
                      {item.imgLink && (
                        <>
                          <img
                            src={item.imgLink}
                            alt={item.title}
                            className="w-full h-full object-contain p-4 absolute top-0 left-0 z-[100]"
                          />
                          <div
                            className="w-full h-full object-contain p-4"
                            style={{
                              background: `radial-gradient(circle, #fdaddb, #374a5a)`,
                            }}
                          ></div>
                        </>
                        //#fdaddb, #374a5a
                      )}
                    </div>
                  ))}
                </div>
                <div
                  className="w-2 h-full bg-green-500"
                  style={{ width: "2px" }}
                ></div>
                <div className="flex-grow w-1/2 bg-white overflow-hidden">
                  {item.submenu.map((subItem, subIndex) => (
                    <div
                      key={subIndex}
                      className="py-2 px-4 hover:bg-gray-200 transition-all duration-300"
                    >
                      <Link to={subItem.url} className="text-black font-DM">
                        {subItem.title}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default Navbar;
