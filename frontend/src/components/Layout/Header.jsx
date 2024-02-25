import React, { useState } from "react";
import Logo from "../../assets/MT.png";
import { CiShop, CiHeart } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import Account from "../Account";
import Navbar from "../Layout/Navbar";
import SearchInformation from "../function/SearchInformation";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Header = ({ activeHeading }) => {
  const [openCart, setOpenCart] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);
  const loginHandle = () => {
    navigate("/sign-in");
    window.location.reload(true);
  };
  return (
    <div className="relative">
      <div className="w-full p-2 sm:h-[12vh] md:h-[12vh] lg:h-[10vh] bg-teal-800/90 mx-auto flex relative">
        <div className="w-[10%]">
          <img
            src={Logo}
            alt=""
            className="sm:w-[200px] sm:h-[11vh] object-contain sm:ml-4 cursor-pointer"
          />
        </div>
        <div className="w-[60%] flex justify-center items-center ">
          <Navbar activeHeading={activeHeading} size={85} />
        </div>
        <div className="md:w-[40%] lg:w-[30%] pr-2 justify-end items-center sm:flex hidden">
          <SearchInformation />
          {isAuthenticated ? (
            <Account />
          ) : (
            <div
              onClick={loginHandle}
              className="text-white cursor-pointer hover:scale-[1.1] transition-transform duration-300 pl-4"
            >
              Đăng nhập
            </div>
          )}
          <CiShop
            className="w-[30px] h-[30px] ml-5 cursor-pointer hover:scale-[1.1]"
            color="#ffffff"
            onClick={(e) => setOpenCart(!openCart)}
          />
          <IoIosNotificationsOutline
            className="ml-5 cursor-pointer hover:scale-[1.1]"
            color="#ffffff"
            size={30}
          />
          <CiHeart
            className="ml-5 cursor-pointer hover:scale-[1.1]"
            color="#ffffff"
            size={30}
          />
        </div>
        {openCart ? (
          <div className="fixed top-0 left-0 w-full bg-[#0000004b] min-h-[100vh] z-10">
            <div className="fixed top-0 right-0 min-h-[100vh] sm:w-[25%] w-[80%] shadow-sm bg-white">
              <RxCross1
                className="flex justify-center items-end absolute right-3 top-3 cursor-pointer"
                size={30}
                onClick={(e) => setOpenCart(!openCart)}
              />
              <div className="flex items-center justify-center mt-[50%]">
                Chưa có sản phẩm nào trong giỏ hàng của bạn !
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Header;
