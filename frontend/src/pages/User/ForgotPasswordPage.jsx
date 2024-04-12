import React, { useState } from "react";
import styles from "../../static/styles.js";
import { AiOutlineSend } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../server.js";
import { toast } from "react-toastify";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const handleGetUserByEmail = async (email) => {
    await axios
      .get(`${server}/user/user-email/${email}`)
      .then((res) => {
        if (res.data.success === true) {
          const { user, verificationCode } = res.data;
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("verificationCode", verificationCode);
          setEmail("");
          setTimeout(() => {
            toast.success(
              `Vui lòng kiểm tra email: ${res.data.user.email} để cập nhật lại mật khẩu !`
            );
          }, 1000);
          setTimeout(() => {
            navigate("/active-code");
          }, 500);
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  const pressKey = (event) => {
    if (event.key === "Enter") {
      // Call the function when Enter key is pressed
      handleGetUserByEmail(email);
    }
  };
  return (
    <div
      style={{
        background:
          "linear-gradient(to top right, #18A5A7 , #B5EAD7, #9EBAF3, #B6C0C5 ,#112D60)",
      }}
      className="w-full  h-[100vh] flex flex-col justify-center items-center"
    >
      <div className="sm:w-[40%] w-[95%] rounded-xl shadow-2xl h-[40vh] bg-white p-3 flex-col flex justify-center items-center">
        <h1 className="text-lg font-[600] font-Roboto uppercase">
          Cập nhật mật khẩu
        </h1>
        <p className="text-center font-[500] mt-6 font-Roboto text-[18px]">
          Vui lòng điền email bạn đã dùng để đăng ký tài khoản
        </p>
        <div className="w-full flex justify-center items-center mt-5">
          <input
            type="email"
            placeholder="Nhập email"
            value={email}
            className={`${styles.input} !w-[70%] `}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={pressKey}
          />
          <AiOutlineSend
            size={25}
            fill="#333"
            className="cursor-pointer hover:fill-blue-500"
            onClick={() => handleGetUserByEmail(email)}
          />
        </div>
        <div className="w-full mt-4">
          <p>
            Bạn đã quên email đăng ký ?
            <Link to="/forgot-password">
              <i className="cursor-pointer text-green-500">Thử cách khác</i>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
