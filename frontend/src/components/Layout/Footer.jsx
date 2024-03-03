import React, { useState } from "react";
import logo from "../../assets/logo.png";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import { footerSupportLinks, navItems } from "../../static/data";
import { IoIosSend } from "react-icons/io";
import { toast } from "react-toastify";
const Footer = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [emailSuprise, setEmailSuprise] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleSendSuprise = () => {
    if (!isValidEmail) {
      toast.error("Địa chỉ email không hợp lệ");
      return;
    }

    setEmailSuprise("");
    toast.success("Đã gửi thành công");
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setEmailSuprise(email);

    // Kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(email));
  };
  const inputWidth = isFocused ? "100%" : "50%";
  return (
    <div className="w-full pb-4 sm:h-[30vh] h-full flex flex-col sm:flex-row justify-center items-center border sm:rounded-tl-full bg-gradient-to-r from-teal-500 via-purple-200 to-blue-500  rounded-t-2xl">
      <div className="sm:w-[20%] p-2 sm:p-0 w-full flex sm:flex-col items-center sm:relative">
        <div className="w-[100%] ">
          <img
            src={logo}
            alt=""
            className="w-full sm:h-[30vh] object-contain"
          />
        </div>
        <div className="sm:w-full w-[50%] flex justify-center items-center sm:absolute sm:bottom-2">
          <FaFacebook
            className=" cursor-pointer hover:text-blue-500 hover:scale-[1.1"
            size={35}
          />
          <FaInstagram
            size={35}
            className="ml-4 cursor-pointer hover:text-pink-800/100 hover:scale-[1.1"
          />
          <FaTiktok
            size={35}
            className="ml-4 cursor-pointer hover:text-red-400 hover:scale-[1.1"
          />
        </div>
      </div>
      <div className="sm:w-[50%] w-[90%] mx-auto sm:flex-row flex-col flex justify-center items-center">
        <div className="sm:w-[30%] w-full  flex flex-col">
          <span className="mt-6 text-xl w-full font-[600] text-gray-900 font-DM">
            Truy cập nhanh
          </span>
          {navItems?.map((i, index) => (
            <span
              key={index}
              className="hover:translate-x-3 hover:text-white hover:scale-105 transition-transform duration-200 pb-2 cursor-pointer"
            >
              {i.title}
            </span>
          ))}
        </div>
        <div className="sm:w-[30%] w-full flex flex-col">
          <span className="text-xl font-[600] text-gray-900 font-DM">
            Hỗ trợ
          </span>
          {footerSupportLinks?.map((i, index) => (
            <span
              key={index}
              className="hover:translate-x-3 hover:text-white hover:scale-105 transition-transform duration-200 cursor-pointer pb-2"
            >
              {i.name}
            </span>
          ))}
        </div>
        <div className="sm:w-[38%] w-full flex flex-col justify-center items-center">
          <span className="text-lg font-[600] text-gray-900 font-DM">
            <span className="text-xl uppercase text-blue-500 font-Poppins">
              Đăng ký
            </span>{" "}
            để nhận những ưu đãi bất ngờ
          </span>
          <div
            style={{ width: inputWidth }}
            className="h-[40px] transition-all duration-300 relative"
          >
            <input
              value={emailSuprise}
              onChange={handleEmailChange}
              type="email"
              placeholder="Email"
              className="focus:placeholder:text-black w-full rounded-lg border-2 h-full p-2 bg-white focus:outline-none"
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>
          <div
            onClick={handleSendSuprise}
            className="w-[40px] cursor-pointer hover:bg-teal-500 hover:text-white hover:border-none h-[40px] bg-white border-2 rounded-full mt-2 flex justify-center items-center"
          >
            <IoIosSend size={25} />
          </div>
        </div>
      </div>
      <div className="sm:w-[25%] w-[90%] mt-4 h-[95%] border">
        {/* Nhúng Google Maps */}
        <iframe
          title="Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.7726638930385!2d106.67289931102822!3d10.98052468913576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d1085e2b1c37%3A0x73bfa5616464d0ee!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBUaOG7pyBE4bqndSBN4buZdA!5e0!3m2!1svi!2s!4v1709386111583!5m2!1svi!2s"
          width={"100%"}
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
};

export default Footer;
