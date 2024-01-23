import React, { useState } from "react";
import ImgLogin from "../../assets/sign-up.jpg";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
const SignUp = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const handleSubmit = () => {
    navigate("/sign-in");
  };
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
          <div className="h-[20vh]">
            <img
              src={logo}
              alt="logo"
              className="w-[65%] object-cover mt-[5%] h-full mx-auto"
            />
          </div>
          <h2 className="text-center text-4xl uppercase text-black font-bold">
            Đăng ký
          </h2>
          <div className="flex w-full justify-between">
            <div className="flex flex-col mt-8 w-[45%] text-black py-2">
              <label>Họ</label>
              <input
                type="text"
                className="bg-gray-200 mt-2 p-2 focus:border-blue-500 rounded-lg focus:bg-gray-300 focus:outline-none"
              />
            </div>
            <div className="flex flex-col w-[45%] mt-8 text-black py-2">
              <label>Tên</label>
              <input
                type="text"
                className="bg-gray-200 mt-2 p-2 focus:border-blue-500 rounded-lg focus:bg-gray-300 focus:outline-none"
              />
            </div>
          </div>
          <div className="flex w-full justify-between">
            <div className="flex flex-col mt-8 w-[45%] text-black py-2">
              <label>Email</label>
              <input
                type="email"
                className="bg-gray-200 mt-2 p-2 focus:border-blue-500 rounded-lg focus:bg-gray-300 focus:outline-none"
              />
            </div>
            <div className="w-[45%] flex">
              <div className="flex flex-col w-[60%] mt-8 text-black py-2">
                <label>Số điện thoại</label>
                <input
                  type="number"
                  className="bg-gray-200 mt-2 p-2 focus:border-blue-500 rounded-lg focus:bg-gray-300 focus:outline-none"
                />
              </div>
              <div className="flex flex-col w-[37%] ml-2 mt-8 text-black py-2">
                <label>Giới tính</label>
                <select
                  className="bg-gray-200 mt-2 p-2 focus:border-blue-500 rounded-lg focus:bg-gray-300 focus:outline-none"
                  id="gender"
                  name="gender"
                >
                  <option value="Choose">Chọn...</option>
                  <option value="male">Nam</option>
                  <option value="female">Nữ</option>
                  <option value="other">Khác</option>
                </select>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-between">
            <div className="flex flex-col w-[45%] text-black py-2">
              <label>Tên đăng nhập</label>
              <input
                type="text"
                className="bg-gray-200 p-2 focus:border-blue-500 rounded-lg focus:bg-gray-300 focus:outline-none"
              />
            </div>
            <div className="flex flex-col w-[45%] text-black py-2 relative">
              <label>Mật khẩu</label>
              <input
                type={visible ? "text" : "password"}
                className="bg-gray-200 p-2 focus:border-blue-500 rounded-lg focus:bg-gray-300 focus:outline-none"
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
          </div>

          <button
            onClick={handleSubmit}
            className="w-[85%] hover:scale-[1.1] transition-transform duration-150 text-white font-bold text-[20px] uppercase bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/80 py-2 rounded-lg mt-4 ml-8"
          >
            Đăng ký
          </button>
          <div className="mt-8 pb-2">
            <p>
              Bạn đã có tài khoản?
              <Link to="/sign-in" className="text-green-500 ml-3">
                Đăng nhập
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
