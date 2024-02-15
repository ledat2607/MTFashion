import React, { useState } from "react";
import Logo from "../../assets/MT.png";
import { CiSearch } from "react-icons/ci";
import Navbar from "../Layout/Navbar";
import { CiShop } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import Account from "../Account";
const Header = ({ activeHeading }) => {
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const handleSearchIconClick = () => {
    setShowSearchInput(!showSearchInput);
  };
  const handleOpenCart = () => {
    setOpenCart(!openCart);
  };
  return (
    <div className="w-full p-2 sm:h-[12vh] md:h-[10vh]  bg-teal-800/80 mx-auto flex justify-between">
      <div className="w-[15%]">
        <img
          src={Logo}
          alt=""
          className="sm:w-[200px] sm:h-[11vh] object-contain sm:ml-4 cursor-pointer"
        />
      </div>
      <div className="w-[65%]">
        <Navbar active={activeHeading} />
      </div>
      <div className="w-[20%] pr-2 flex justify-end items-center">
        <CiSearch
          size={30}
          onClick={handleSearchIconClick}
          className="cursor-pointer hover:scale-[1.1]"
          color="#ffffff"
        />
        {showSearchInput && (
          <input
            type="text"
            placeholder="Search..."
            className="rounded-md ml-2 transition-all duration-300 focus:outline-none px-2 py-1 border border-gray-300"
          />
        )}
        <Account />
        <CiShop
          className={`${
            showSearchInput ? "hidden" : "block"
          } ml-5 cursor-pointer hover:scale-[1.1]`}
          color="#ffffff"
          size={30}
          onClick={handleOpenCart}
        />
        <IoIosNotificationsOutline
          className={`${
            showSearchInput ? "hidden" : "block"
          } ml-5 cursor-pointer hover:scale-[1.1]`}
          color="#ffffff"
          size={30}
        />
        {openCart ? (
          <div className="w-full bg-[#000000] h-screen">
            <div className="w-[30%] bg-white z-[10000]">
              <div>3 sản phẩm</div>
              <RxCross1
                onClick={handleOpenCart}
                className="cursor-pointer mt-1"
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Header;
