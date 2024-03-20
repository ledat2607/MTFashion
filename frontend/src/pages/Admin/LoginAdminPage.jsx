import React, { useState } from "react";
import animationData from "../../assets/Animation - 1710424612510.json";
import Lottie from "react-lottie";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
const LoginAdminPage = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [view, setView] = useState(false);
  const AnimationAdminPage = () => {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Lottie options={defaultOptions} width={400} height={250} />
      </div>
    );
  };
  const showPassword = () => {
    setView(!view);
  };
  const handleLoginAdmin = () => {
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const data = {
      userName: userName,
      password: password,
    };
    axios
      .post(
        `${server}/admin/login-admin`,
        data,
        { withCredentials: true },
        config
      )
      .then((res) => {
        toast.success(res.data.message);
        setTimeout(() => {
          window.location.reload();
          navigate("/admin");
        }, 1000);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  return (
    <div className="w-full h-[100vh] flex">
      <div className="w-[50%] hidden bg-slate-400 sm:flex justify-center items-center">
        <AnimationAdminPage />
      </div>
      <div
        style={{
          background:
            "linear-gradient(to top right, #18A5A7 , #B5EAD7, #9EBAF3, #B6C0C5 ,#112D60)",
        }}
        className="sm:w-[50%] w-full flex justify-center items-center"
      >
        <div className="sm:w-[80%] w-[95%] sm:h-[40vh] bg-slate-100 shadow-2xl sm:p-6 border-4 rounded-2xl">
          <h1 className="text-center sm:text-2xl font-[600] font-Roboto uppercase">
            Đăng nhập tài khoản
          </h1>
          <div className="sm:w-[80%] w-[95%] mx-auto mt-8 flex justify-between items-center">
            <label className="sm:text-xl font-[500] font-Protest">
              Tên đăng nhập
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Username/email......"
              className="w-[70%] h-[40px] p-2 ml-4 rounded-xl focus:outline-none bg-gray-400/20 focus:bg-gray-300"
            />
          </div>
          <div className="sm:w-[80%] w-[95%] mx-auto mt-8 flex justify-between items-center relative">
            <label className="sm:text-xl font-[500] font-Protest">
              Mật khẩu
            </label>
            <input
              type={view ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mật khẩu..."
              className="w-[70%] rounded-2xl p-2 bg-gray-400/20 focus:bg-gray-300 outline-none focus:text-black"
            />
            {view ? (
              <FaEye
                size={25}
                onClick={showPassword}
                className="cursor-pointer absolute bottom-2 right-4"
              />
            ) : (
              <FaEyeSlash
                size={25}
                onClick={showPassword}
                className="cursor-pointer absolute bottom-2 right-4"
              />
            )}
          </div>
          <div
            onClick={handleLoginAdmin}
            className="cursor-pointer text-lg font-[600] uppercase text-black hover:text-white mx-auto mt-8 flex justify-center items-center sm:w-[30%] w-[50%] h-[40px] bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 rounded-2xl transition-all duration-300"
          >
            Đăng nhập
          </div>
          <div className="w-full mt-8 flex">
            <span className="text-lg font-[600] text-green-500">
              Bạn chưa có tài khoản
            </span>
            <Link to={"/admin/sign-up"}>
              <p className="ml-4 text-lg font-[700] font-Poppins cursor-pointer hover:translate-x-3 transition-transform duration-300">
                Đăng ký
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginAdminPage;
