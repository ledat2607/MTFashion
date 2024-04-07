import React, { useState } from "react";
import {
  FaChartBar,
  FaComment,
  FaShoppingBag,
  FaUserFriends,
  FaBarcode,
  FaDatabase,
} from "react-icons/fa";
import { MdDiscount } from "react-icons/md";
import { AiOutlineLogout } from "react-icons/ai";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const AdminSidebar = ({ setActiveItem, activeItem }) => {
  const navigate = useNavigate();
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const logoutHandled = () => {
    axios
      .get(`${server}/admin/logout-admin`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        setTimeout(() => {
          navigate("/admin/login");
          window.location.reload(true);
        }, 1500);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  const handleLogout = () => {
    setShowLogoutPopup(true);
  };

  const handleClosePopup = () => {
    setShowLogoutPopup(false);
  };

  const confirmLogout = () => {
    logoutHandled();
    setShowLogoutPopup(false);
  };
  return (
    <div className="w-[100%] mt-4 sm:h-[70vh] h-[67vh] bg-white rounded-3xl">
      <div
        onClick={() => setActiveItem(1)}
        className={`cursor-pointer hover:bg-gray-300 transition-all duration-200 w-full h-[10vh] p-4 mx-auto items-center flex ${
          activeItem === 1 && "bg-gray-300"
        }`}
      >
        <FaChartBar
          size={25}
          className={`${activeItem === 1 && "text-red-500"}`}
        />
        <label
          className={`${
            activeItem === 1 && "text-red-500"
          } ml-4 text-md sm:text-lg font-[600]`}
        >
          Quản lý chung
        </label>
      </div>
      <div
        onClick={() => setActiveItem(2)}
        className={`cursor-pointer hover:bg-gray-300 transition-all duration-200 w-full h-[10vh] p-4 mx-auto items-center flex ${
          activeItem === 2 && "bg-gray-300"
        }`}
      >
        <FaUserFriends
          size={25}
          className={`${activeItem === 2 && "text-red-500"}`}
        />
        <label
          className={`${
            activeItem === 2 && "text-red-500"
          } ml-4 text-md sm:text-lg font-[600]`}
        >
          Quản lý người dùng
        </label>
      </div>
      <div
        onClick={() => setActiveItem(3)}
        className={`cursor-pointer hover:bg-gray-300 transition-all duration-200 w-full h-[10vh] p-4 mx-auto items-center flex ${
          activeItem === 3 && "bg-gray-300"
        }`}
      >
        <FaDatabase
          size={25}
          className={`${activeItem === 3 && "text-red-500"}`}
        />
        <label
          className={`${
            activeItem === 3 && "text-red-500"
          } ml-4 text-md sm:text-lg font-[600]`}
        >
          Quản lý sản phẩm
        </label>
      </div>
      <div
        onClick={() => setActiveItem(4)}
        className={`cursor-pointer hover:bg-gray-300 transition-all duration-200 w-full h-[10vh] p-4 mx-auto items-center flex ${
          activeItem === 4 && "bg-gray-300"
        }`}
      >
        <MdDiscount
          size={25}
          className={`${activeItem === 4 && "text-red-500"}`}
        />
        <label
          className={`${
            activeItem === 4 && "text-red-500"
          } ml-4 text-md sm:text-lg font-[600]`}
        >
          Quản lý khuyến mãi
        </label>
      </div>
      <div
        onClick={() => setActiveItem(5)}
        className={`cursor-pointer hover:bg-gray-300 transition-all duration-200 w-full h-[10vh] p-4 mx-auto items-center flex ${
          activeItem === 5 && "bg-gray-300"
        }`}
      >
        <FaShoppingBag
          size={25}
          className={`${activeItem === 5 && "text-red-500"}`}
        />
        <label
          className={`${
            activeItem === 5 && "text-red-500"
          } ml-4 text-md sm:text-lg font-[600]`}
        >
          Quản lý đơn hàng
        </label>
      </div>
      <div
        onClick={() => setActiveItem(6)}
        className={`cursor-pointer hover:bg-gray-300 transition-all duration-200 w-full h-[10vh] p-4 mx-auto items-center flex ${
          activeItem === 6 && "bg-gray-300"
        }`}
      >
        <FaBarcode
          size={25}
          className={`${activeItem === 6 && "text-red-500"}`}
        />
        <label
          className={`${
            activeItem === 6 && "text-red-500"
          } ml-4 text-md sm:text-lg font-[600]`}
        >
          Mã khuyến mãi
        </label>
      </div>
      <div className="w-full sm:mt-6 flex justify-center items-center">
        <Link to="/admin/chat">
          <FaComment
            onClick={() => setActiveItem(7)}
            size={30}
            className={`${
              activeItem === 7 && "text-red-500"
            } mr-4 hover:translate-x-3 transition-transform cursor-pointer duration-300`}
          />
        </Link>
        <AiOutlineLogout
          onClick={handleLogout}
          size={30}
          className="ml-4 opacity-25 hover:text-red-600 hover:opacity-100 hover:translate-x-3 transition-transform cursor-pointer duration-300"
        />
        {showLogoutPopup && (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500 bg-opacity-50 z-[100]">
            <div className="bg-white rounded-3xl sm:h-[25vh] h-fit sm:w-[40%] w-[90%]">
              <div className="w-full text-md sm:text-lg font-Poppins font-[600] uppercase h-[45%] flex justify-center items-center">
                Bạn có chắc muốn thoát khỏi phiên làm việc ?
              </div>
              <div className="w-[60%] h-[55%] mx-auto flex justify-center items-center">
                <div
                  onClick={confirmLogout}
                  className="hover:opacity-100 text-md sm:text-lg cursor-pointer hover:bg-red-400 hover:translate-x-3 transition-transform duration-300 flex justify-center items-center h-[40px] w-[150px] bg-gray-300 opacity-50 rounded-3xl"
                >
                  Xác nhận
                </div>
                <div
                  onClick={handleClosePopup}
                  className="ml-8 h-[40px] text-md sm:text-lg text-white cursor-pointer hover:translate-x-3 transition-transform duration-300 flex justify-center items-center w-[80px] bg-blue-500 rounded-3xl"
                >
                  Đóng
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSidebar;
