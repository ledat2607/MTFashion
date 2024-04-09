import React, { useState } from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { IoMdPerson } from "react-icons/io";
import { MdOutlineSecurity, MdAnalytics, MdEditLocation } from "react-icons/md";
import { FaArrowRight, FaArrowDown, FaRocketchat } from "react-icons/fa";
import Loader from "../animations/Loader";

const ProfileSideBar = ({
  active,
  setActive,
  setActiveMenuProps,
  activeMenu,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const handleToggleDropdown = () => {
    if (active === 4) {
      setShowDropdown(!showDropdown);
    } else {
      setActive(4);
      setShowDropdown(true);
    }
  };

  const handleSetActive = (menuId) => {
    setActiveMenuProps(0);
    setActive(menuId);

    if (menuId !== 4) {
      setActiveMenuProps(0); // Use setActiveMenuProps here
      setShowDropdown(false);
    }
  };

  return (
    <div className="w-full h-full bg-transparent rounded-l-xl">
      <div className="w-full h-[20vh] flex justify-center items-center">
        <Link to={"/"}>
          <img src={logo} className="w-full h-full object-cover" alt="" />
        </Link>
      </div>
      <div
        onClick={() => handleSetActive(1)}
        className="hover:translate-y-2 transition-transform duration-300 p-3 hover:shadow-2xl flex items-center pl-4 cursor-pointer w-full mb-2"
      >
        <IoMdPerson size={35} color={`${active === 1 ? "red" : ""}`} />
        <p
          className={`sm:block hidden pl-4 font-[600] font-Roboto text-md ${
            active === 1 ? "text-red-500" : "text-white"
          }`}
        >
          Thông tin cá nhân
        </p>
      </div>
      <div
        onClick={() => handleSetActive(2)}
        className="hover:translate-y-2 transition-transform duration-300 p-3 hover:shadow-2xl flex items-center pl-4 cursor-pointer w-full mb-2"
      >
        <FaRocketchat size={35} color={`${active === 2 ? "red" : ""}`} />
        <Link to="/chat">
          <p className="sm:block hidden pl-4 font-[600] font-Roboto text-md">
            Trò chuyện
          </p>
        </Link>
      </div>
      <div
        onClick={() => handleSetActive(3)}
        className="hover:translate-y-2 transition-transform duration-300 p-3 hover:shadow-2xl flex items-center pl-4 cursor-pointer w-full mb-2"
      >
        <MdOutlineSecurity size={35} color={`${active === 3 ? "red" : ""}`} />
        <p
          className={`sm:block hidden pl-4 font-[600] font-Roboto text-md ${
            active === 3 ? "text-red-500" : "text-white"
          }`}
        >
          Bảo mật
        </p>
      </div>
      <div className="relative">
        <div
          onClick={handleToggleDropdown}
          className={`hover:translate-y-2 transition-transform duration-300 p-3 hover:shadow-2xl flex items-center justify-between pl-4 cursor-pointer w-full mb-2 ${
            showDropdown ? "bg-transparent shadow-2xl" : ""
          }`}
        >
          <div className="w-[80%] flex items-center">
            <MdAnalytics size={35} color={`${active === 4 ? "red" : ""}`} />
            <p
              className={`sm:block hidden pl-4 font-[600] font-Roboto text-md ${
                active === 4 ? "text-red-500" : "text-white"
              }`}
            >
              Quản lý mua hàng
            </p>
          </div>
          {showDropdown ? (
            <FaArrowDown size={20} color={`${active === 4 ? "red" : ""}`} />
          ) : (
            <FaArrowRight size={20} color={`${active === 4 ? "red" : ""}`} />
          )}
        </div>

        {showDropdown && (
          <div className=" mt-2 bg-transparent border rounded shadow-lg">
            <div
              onClick={() => setActiveMenuProps(1)}
              className={`${
                activeMenu === 1 ? "text-red-500" : "text-white"
              } p-2 cursor-pointer hover:bg-gray-200 font-[600] font-Roboto text-md`}
            >
              Đơn hàng
            </div>
            <div
              onClick={() => setActiveMenuProps(2)}
              className={`${
                activeMenu === 2 ? "text-red-500" : "text-white"
              } p-2 cursor-pointer hover:bg-gray-200 font-[600] font-Roboto text-md`}
            >
              Hoàn trả
            </div>
          </div>
        )}
      </div>

      <div
        onClick={() => handleSetActive(5)}
        className="hover:translate-y-2 transition-transform duration-300 p-3 hover:shadow-2xl flex items-center pl-4 cursor-pointer w-full mb-2"
      >
        <MdEditLocation size={35} color={`${active === 5 ? "red" : ""}`} />
        <p
          className={`sm:block hidden pl-4 font-[600] font-Roboto text-md ${
            active === 5 ? "text-red-500" : "text-white"
          }`}
        >
          Địa chỉ
        </p>
      </div>

      <div className={`${showDropdown ? "hidden" : "block"} p-3 w-full mb-2`}>
        <Loader />
      </div>
    </div>
  );
};

export default ProfileSideBar;
