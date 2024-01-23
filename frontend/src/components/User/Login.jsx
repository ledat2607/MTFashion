import React, { useState } from "react";
import ImgLogin from "../../assets/sign-in.jpg";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
const Login = () => {
  const [visible, setVisible] = useState(false);
  const showPassword = () => {
    setVisible(!visible);
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
      <div className="hidden sm:block">
        <img src={ImgLogin} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="bg-gray-700 flex flex-col justify-center">
        <form className="max-w-[65%] w-full mx-auto bg-gray-100 px-8 rounded-lg border-2">
          <div className="h-[25vh]">
            <img
              src={logo}
              alt="logo"
              className="w-[65%] object-cover mt-[5%] h-full mx-auto"
            />
          </div>
          <h2 className="text-center text-4xl uppercase text-black font-bold">
            Đăng nhập
          </h2>
          <div className="flex flex-col mt-8 text-black py-2">
            <label>Tên đăng nhập</label>
            <input
              type="text"
              className="bg-gray-200 mt-2 p-2 focus:border-blue-500 rounded-lg focus:bg-gray-300 focus:outline-none"
            />
          </div>
          <div className="flex flex-col text-black py-2 relative">
            <label>Mật khẩu</label>
            <input
              type={visible ? "text" : "password"}
              className="bg-gray-200 mt-2 p-2 focus:border-blue-500 rounded-lg focus:bg-gray-300 focus:outline-none"
            />
            {visible ? (
              <IoEyeSharp
                size={20}
                className="absolute right-3 bottom-5 cursor-pointer hover:scale-[1.1] hover:text-teal-500"
                onClick={showPassword}
              />
            ) : (
              <FaEyeSlash
                size={20}
                className="absolute right-3 bottom-5 cursor-pointer hover:scale-[1.1] hover:text-teal-500"
                onClick={showPassword}
              />
            )}
          </div>
          <div className="flex justify-between items-center">
            <p>
              <input type="checkbox" className="mr-2" />
              Nhớ mật khẩu
            </p>
            <i>
              <Link to="/forgot-password" className="text-red-500">
                Quên mật khẩu
              </Link>
            </i>
          </div>

          <button className="w-[85%] hover:scale-[1.1] transition-transform duration-150 text-white font-bold text-[20px] uppercase bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/80 py-2 rounded-lg mt-8 ml-8">
            Đăng nhập
          </button>
          <div className="mt-8 pb-2">
            <p>
              Bạn chưa có tài khoản?
              <Link to="/sign-up" className="text-green-500 ml-3">
                Đăng ký
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
