import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import AdminSidebar from "../../components/Admin/AdminSidebar";
import ManageUser from "../../components/Admin/Manage/ManageUser";
import ManageProduct from "../../components/Admin/Manage/ManageProduct";
import EventProduct from "../../components/Admin/Manage/EventProduct/EventProduct";
import ManageDiscountCode from "../../components/Admin/Manage/ManageDiscountCode";
import ManageOrder from "../../components/Admin/Manage/ManageOrder";
import AdminChatPage from "../../../src/pages/Admin/AdminChatPage";
import AdminHero from "../../components/Admin/AdminHero"
const AdminHomepage = () => {
  const { admin } = useSelector((state) => state.admin);
  const [showSidebar, setShowSidebar] = useState(true);
  const [activeItem, setActiveItem] = useState(1);
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handleResize = () => {
      setShowSidebar(!mediaQuery.matches);
    };
    handleResize();
    mediaQuery.addListener(handleResize);
    return () => {
      mediaQuery.removeListener(handleResize);
    };
  }, []);

  return (
    <div
      style={{
        background:
          "linear-gradient(to top right, #B9D3EE, #FFC1C1, #FFE1FF, #CFCFCF, #B0E0E6 ,#8B658B)",
      }}
      className="w-full h-screen flex justify-center items-center"
    >
      <div className="w-full h-full flex sm:flex-row flex-col justify-center items-center">
        <div className={`sm:hidden ${showSidebar ? "hidden" : "block"}`}>
          <h1 className="text-center text-xl font-Poppins font-[600] uppercase">
            Xin chào Quản trị viên
          </h1>
        </div>
        <div className="flex flex-row w-[90%] h-[90%] border-b-2 border-r-2 border-gray-700 rounded-3xl bg-white bg-opacity-65 shadow-2xl shadow-gray-500">
          <div
            className={`sm:w-[20%] ${
              showSidebar
                ? "w-[70%] h-full border-r border-r-blue-500"
                : "w-0 h-[90%]"
            }  sm:border-r-4 sm:border-blue-500 rounded-3xl relative transition-all duration-500`}
          >
            <div className="sm:bg-gray-300 bg-opacity-55 p-4 sm:rounded-t-3xl">
              <img
                src={`data:image/jpeg;base64,${admin?.avatar}`}
                alt=""
                className="rounded-full h-[10vh] mx-auto"
              />
              <h1
                className={`${
                  showSidebar ? "block" : "hidden"
                } sm:block text-center font-600 font-Poppins mt-3`}
              >
                Xin chào{" "}
                <span className="text-blue-500">{admin?.userName}</span>
              </h1>
              <div
                onClick={toggleSidebar}
                className="sm:hidden flex absolute left-full top-1/2 w-[20px] bg-blue-500 duration-300 transition-all hover:w-[40px] cursor-pointer h-[50px] rounded-r-full justify-center items-center"
              >
                {showSidebar ? <IoIosArrowBack /> : <IoIosArrowForward />}
              </div>
            </div>
            {showSidebar && (
              <div className="sm:w-[100%]">
                <AdminSidebar
                  setActiveItem={setActiveItem}
                  activeItem={activeItem}
                />
              </div>
            )}
          </div>
          <div className="sm:w-[80%] h-full">
            {activeItem === 1 && (
              <div
                className={`${
                  showSidebar ? "hidden" : "block"
                } sm:block w-full p-4`}
              >
                <AdminHero />
              </div>
            )}
            {activeItem === 2 && (
              <div
                className={`${
                  showSidebar ? "hidden" : "block"
                } sm:block w-full p-2`}
              >
                <ManageUser />
              </div>
            )}
            {activeItem === 3 && (
              <div
                className={`${
                  showSidebar ? "hidden" : "block"
                } sm:block w-full h-full p-2`}
              >
                <ManageProduct />
              </div>
            )}
            {activeItem === 4 && (
              <div
                className={`${
                  showSidebar ? "hidden" : "block"
                } sm:block w-full p-2`}
              >
                <EventProduct />
              </div>
            )}
            {activeItem === 5 && (
              <div
                className={`${
                  showSidebar ? "hidden" : "block"
                } sm:block w-full p-2`}
              >
                <ManageOrder />
              </div>
            )}
            {activeItem === 6 && (
              <div
                className={`${
                  showSidebar ? "hidden" : "block"
                } sm:block w-full p-2`}
              >
                <ManageDiscountCode />
              </div>
            )}
            {activeItem === 7 && (
              <div
                className={`${
                  showSidebar ? "hidden" : "block"
                } sm:block w-full p-2`}
              >
                <AdminChatPage />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHomepage;
