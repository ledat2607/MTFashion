import React, { useState } from "react";
import animationData from "../../assets/Animation - 1710336169560.json";
import Lottie from "react-lottie";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
const SignUpAdmin = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [avatar, setAvatar] = useState("");
  const [view, setView] = useState(false);
  const [viewConfirm, setViewConfirm] = useState(false);
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
        <Lottie options={defaultOptions} width={400} height={280} />
      </div>
    );
  };

  const handleShowPassword = () => {
    setView(!view);
  };
  const handleShowPasswordConfirm = () => {
    setViewConfirm(!viewConfirm);
  };
  const handleChangeImageInput = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64Data = reader.result.split(",")[1];
        setAvatar(base64Data);
      };

      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = () => {
    const config = { headers: { "Content-Type": "multipart/form-data" } };

    axios
      .post(
        `${server}/admin/create-new-admin`,
        { avatar, email, userName, password },
        config
      )
      .then((res) => {
        toast.success(res.data.message);
        setTimeout(() => {
          navigate("/admin/login");
        }, 1000);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  return (
    <div className="w-full h-[100vh] bg-gray-400 bg-opacity-60 flex justify-between items-center">
      <div className="sm:w-[40%] sm:block hidden">
        <AnimationAdminPage />
      </div>
      <div
        style={{
          background:
            "linear-gradient(to top right, #FFD3E0, #B5EAD7, #B6C0C5, #CBE7E3 ,#353A5F)",
        }}
        className="sm:w-[60%] w-full h-[100vh] flex justify-center items-center"
      >
        <div className="sm:w-[60%] w-[95%] border-2 bg-slate-100 sm:p-4 p-2 rounded-2xl shadow-2xl shadow-teal-200">
          <h1 className="text-xl text-center pt-4 font-[600] font-Roboto uppercase">
            Đăng ký tài khoản
          </h1>
          <div className="w-full flex-col flex">
            <div className="w-full">
              <input
                type="file"
                name="avatar"
                id="file-input"
                accept=".jpg,.jpeg,.png"
                className="sr-only"
                onChange={handleChangeImageInput}
              />
              <label
                htmlFor="file-input"
                className="inline-block w-full overflow-hidden rounded-full cursor-pointer"
              >
                <div className="flex overflow-hidden  justify-center mt-4 sm:h-[8vh] h-[10vh] sm:w-full rounded-full">
                  {avatar ? (
                    <img
                      src={`data:image/jpeg;base64,${avatar}`}
                      className="h-full sm:w-[4vw] w-[22vw] object-cover rounded-full"
                      alt="img-avatar"
                    />
                  ) : (
                    <RxAvatar className="rounded-full h-full w-full" />
                  )}
                </div>
              </label>
            </div>
            <label className="text-xl font-[500] font-Protest">
              Tên đăng nhập
            </label>
            <input
              value={userName}
              type="text"
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Tên đăng nhập của bạn"
              className="rounded-2xl p-2 bg-gray-400/20 focus:bg-gray-300 outline-none focus:text-black"
            />
          </div>
          <div className="w-full sm:mt-8 mt-4 flex-col flex">
            <label className="text-xl font-[500] font-Protest">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email của bạn"
              className="rounded-2xl p-2 bg-gray-400/20 focus:bg-gray-300 outline-none focus:text-black"
            />
          </div>
          <div className="w-full sm:mt-8 mt-4  flex-col flex relative">
            <label className="text-xl font-[500] font-Protest">Mật khẩu</label>
            <input
              type={view ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mật khẩu..."
              className="rounded-2xl p-2 bg-gray-400/20 focus:bg-gray-300 outline-none focus:text-black"
            />
            {view ? (
              <FaEye
                size={25}
                onClick={handleShowPassword}
                className="cursor-pointer absolute bottom-2 right-4"
              />
            ) : (
              <FaEyeSlash
                size={25}
                onClick={handleShowPassword}
                className="cursor-pointer absolute bottom-2 right-4"
              />
            )}
          </div>
          <div className="w-full sm:mt-8 mt-4  flex-col flex relative">
            <label className="text-xl font-[500] font-Protest">
              Xác nhận mật khẩu
            </label>
            <input
              type={view ? "text" : "password"}
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              placeholder="Xác nhận mật khẩu..."
              className="rounded-2xl p-2 bg-gray-400/20 focus:bg-gray-300 outline-none focus:text-black"
            />
            {viewConfirm ? (
              <FaEye
                size={25}
                onClick={handleShowPasswordConfirm}
                className="cursor-pointer absolute bottom-2 right-4"
              />
            ) : (
              <FaEyeSlash
                size={25}
                onClick={handleShowPasswordConfirm}
                className="cursor-pointer absolute bottom-2 right-4"
              />
            )}
          </div>
          <div
            onClick={handleSubmit}
            className="w-[200px] text-xl font-[600] font-Roboto text-white cursor-pointer shadow hover:bg-gray-200 hover:text-black hover:shadow-lg hover:shadow-teal-800/80 mx-auto h-[40px] rounded-lg bg-teal-500 flex justify-center items-center mt-[10%]"
          >
            Đăng ký
          </div>
          <div className="w-full sm:mt-8 mt-4 flex">
            <span className="text-lg font-[600] text-green-500">
              Bạn đã có tài khoản
            </span>
            <Link to={"/admin/login"}>
              <p className="ml-4 text-lg font-[700] font-Poppins cursor-pointer hover:translate-x-3 transition-transform duration-300">
                Đăng nhập
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpAdmin;
