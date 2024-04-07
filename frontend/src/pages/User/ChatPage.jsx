import React from "react";
//import { useSelector } from "react-redux";
import { MdOutlineLocalPhone } from "react-icons/md";
import { SlCamrecorder } from "react-icons/sl";
import Logo from "../../assets/MT.png";
import { BsSend } from "react-icons/bs";
//import { useLocation } from "react-router-dom";
// import axios from "axios";
// import { server } from "../../server";
const ChatPage = () => {
  //const location = useLocation();
  // const { senderId, receivedId, id } = location.state;

  return (
    <div
      className="w-full h-[100vh] flex justify-center items-center"
      style={{
        background:
          "linear-gradient(to top right, #112D60, #B6C0C5, #9EBAF3, #CBE7E3 ,#CBE7E3)",
      }}
    >
      <div className="w-[35%] mx-auto h-[90%] rounded-2xl bg-white">
        <div className="w-full bg-stone-500 h-[10%] rounded-t-2xl flex">
          <div className="w-[75%] h-full flex justify-start items-center">
            <img
              src={Logo}
              alt=""
              className="w-[50px] h-[50px] border-2 sm:ml-2 object-cover rounded-full"
            />
            <p className="text-white font-[600] font-Poppins ml-4 tex-lg">
              MT - Fashion Store
            </p>
          </div>
          <div className="w-[15%] h-full flex justify-between items-center">
            <MdOutlineLocalPhone
              size={30}
              className="text-white cursor-pointer hover:scale-[1.2] transition-transform duration-300"
            />
            <SlCamrecorder
              size={30}
              className="text-white cursor-pointer hover:scale-[1.2] transition-transform duration-300"
            />
          </div>
        </div>
        <div className="w-full h-[80%]"></div>
        <div className="w-full h-[10%] rounded-b-2xl flex items-center justify-center border-2 border-t-blue-500">
          <input
            placeholder="Tin nhắn"
            className="w-[300px] h-[40px] rounded-2xl border-2 p-2 border-blue-500"
          />
          <div
            className="cursor-pointer w-[40px] h-[40px] bg-stone-400 rounded-full flex justify-center items-center
           hover:bg-white border border-blue-500 p-2 ml-4"
          >
            <BsSend size={25} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
