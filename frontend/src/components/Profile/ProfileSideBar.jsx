import React, { useState } from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { IoMdPerson } from "react-icons/io";
import {
  MdAccountBalance,
  MdOutlineSecurity,
  MdAnalytics,
  MdEditLocation,
} from "react-icons/md";
import { FaArrowRight, FaArrowDown, FaIdCard } from "react-icons/fa";
import Loader from "../Layout/Loader";

const ProfileSideBar = ({ active, setActive }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeMenu, setActiveMenu] = useState(1);
  const handleToggleDropdown = () => {
    if (active === 4) {
      setShowDropdown(!showDropdown);
    } else {
      setActive(4);
      setShowDropdown(true);
    }
  };
  const handleSetActive = (menuId) => {
    setActive(menuId);

    if (menuId !== 4) {
      setActiveMenu(null);
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
          className={`sm:block hidden pl-4 ${
            active === 1 ? "text-red-500" : ""
          }`}
        >
          Thông tin cá nhân
        </p>
      </div>
      <div
        onClick={() => handleSetActive(2)}
        className="hover:translate-y-2 transition-transform duration-300 p-3 hover:shadow-2xl flex items-center pl-4 cursor-pointer w-full mb-2"
      >
        <MdAccountBalance size={35} color={`${active === 2 ? "red" : ""}`} />
        <p
          className={`sm:block hidden pl-4 ${
            active === 2 ? "text-red-500" : ""
          }`}
        >
          Thông tin tài khoản
        </p>
      </div>
      <div
        onClick={() => handleSetActive(3)}
        className="hover:translate-y-2 transition-transform duration-300 p-3 hover:shadow-2xl flex items-center pl-4 cursor-pointer w-full mb-2"
      >
        <MdOutlineSecurity size={35} color={`${active === 3 ? "red" : ""}`} />
        <p
          className={`sm:block hidden pl-4 ${
            active === 3 ? "text-red-500" : ""
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
              className={`sm:block hidden pl-4 ${
                active === 4 ? "text-red-500" : ""
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
              onClick={() => setActiveMenu(1)}
              className={`${
                activeMenu === 1 ? "text-red-500" : ""
              } p-2 cursor-pointer hover:bg-gray-200`}
            >
              Đơn hàng
            </div>
            <div
              onClick={() => setActiveMenu(2)}
              className={`${
                activeMenu === 2 ? "text-red-500" : ""
              } p-2 cursor-pointer hover:bg-gray-200`}
            >
              Hoàn trả
            </div>
            <div
              onClick={() => setActiveMenu(3)}
              className={`${
                activeMenu === 3 ? "text-red-500" : ""
              } p-2 cursor-pointer hover:bg-gray-200`}
            >
              Thống kê
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
          className={`sm:block hidden pl-4 ${
            active === 5 ? "text-red-500" : ""
          }`}
        >
          Địa chỉ
        </p>
      </div>
      <div
        onClick={() => handleSetActive(6)}
        className="hover:translate-y-2 transition-transform duration-300 p-3 hover:shadow-2xl flex items-center pl-4 cursor-pointer w-full mb-2"
      >
        <FaIdCard size={35} color={`${active === 6 ? "red" : ""}`} />
        <p
          className={`sm:block hidden pl-4 ${
            active === 6 ? "text-red-500" : ""
          }`}
        >
          Nâng cấp tài khoản
        </p>
      </div>

      <div className={`${showDropdown ? "hidden" : "block"} p-3 w-full mb-2`}>
        <Loader />
      </div>
    </div>
  );
};

export default ProfileSideBar;
