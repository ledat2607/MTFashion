import React, { useState } from "react";
import ImgLogin from "../../assets/sign-up.jpg";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { RxAvatar } from "react-icons/rx";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
const SignUp = () => {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [surName, setSurName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userName, setUserName] = useState("");
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = () => {
    const config = { headers: { "Content-Type": "multipath/form-data" } };
    const newForm = new FormData();
    newForm.append("file", avatar);
    newForm.append("surName", surName);
    newForm.append("name", name);
    newForm.append("email", email);
    newForm.append("phoneNumber", phoneNumber);
    newForm.append("password", password);
    newForm.append("userName", userName);

    axios
      .post(`${server}/user/create-user`, newForm, config)
      .then((res) => {
        toast.success(res.data.message);
        setTimeout(() => {
          navigate("/verify-email");
        }, 1000);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  const showPassword = () => {
    setVisible(!visible);
  };
  //change image
  const handleChangeImageInput = (e) => {
    const fileInput = e.target;

    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      setAvatar(file);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
      <div className="hidden sm:block">
        <img src={ImgLogin} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="bg-gray-700 flex flex-col justify-center">
        <form className="sm:max-w-[65%] max-w-[85%] w-full mx-auto bg-gray-100 px-4 rounded-lg border-2">
          <div className="sm:h-[20vh] h-[15vh]">
            <img
              src={logo}
              alt="logo"
              className="sm:w-[65%] object-cover sm:mt-[5%] h-full mx-auto"
            />
          </div>
          <h2 className="text-center sm:text-4xl uppercase text-black font-bold">
            Đăng ký
          </h2>
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
                    src={URL.createObjectURL(avatar)}
                    className="h-full sm:w-[4vw] w-[22vw] object-cover rounded-full"
                    alt="img-avatar"
                  />
                ) : (
                  <RxAvatar className="rounded-full h-full w-full" />
                )}
              </div>
            </label>
          </div>

          <div className="flex w-full justify-between">
            <div className="flex flex-col w-[45%] text-black py-2">
              <label>Họ</label>
              <input
                type="text"
                className="bg-gray-200 mt-2 p-2 focus:border-blue-500 rounded-lg focus:bg-gray-300 focus:outline-none"
                value={surName}
                onChange={(e) => setSurName(e.target.value)}
              />
            </div>
            <div className="flex flex-col w-[45%] text-black py-2">
              <label>Tên</label>
              <input
                type="text"
                className="bg-gray-200 mt-2 p-2 focus:border-blue-500 rounded-lg focus:bg-gray-300 focus:outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div className="flex w-full justify-between">
            <div className="flex flex-col w-[45%] text-black py-2">
              <label>Email</label>
              <input
                type="email"
                className="bg-gray-200 mt-2 p-2 focus:border-blue-500 rounded-lg focus:bg-gray-300 focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col w-[45%] text-black py-2 relative">
              <label>Số điện thoại</label>
              <input
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                type="number"
                className="bg-gray-200 mt-2 p-2 focus:border-blue-500 rounded-lg focus:bg-gray-300 focus:outline-none"
              />
            </div>
          </div>
          <div className="w-full flex justify-between">
            <div className="flex flex-col w-[45%] text-black py-2">
              <label>Tên đăng nhập</label>
              <input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                type="text"
                className="bg-gray-200 p-2 focus:border-blue-500 rounded-lg focus:bg-gray-300 focus:outline-none"
              />
            </div>
            <div className="flex flex-col w-[45%] text-black py-2 relative">
              <label>Mật khẩu</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

          <div
            onClick={handleSubmit}
            className="h-[40px] mt-4 font-bold text-2xl cursor-pointer bg-teal-400 shadow-lg hover:scale-[1.1] hover:shadow-teal-500/40 shadow-teal-500/50 w-[85%] flex justify-center items-center mx-auto rounded-lg"
          >
            Đăng ký
          </div>
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
