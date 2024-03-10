import React, { useState } from "react";
import ProfileSideBar from "../../components/Profile/ProfileSideBar";
import ProfileContent from "../../components/Profile/ProfileContent";

const ProfilePage = () => {
  const [active, setActive] = useState(1);
  const [activeMenu, setActiveMenu] = useState(1);

  // Hàm callback để cập nhật activeMenu từ ProfileSideBar
  const handleSetActiveMenu = (menuId) => {
    setActiveMenu(menuId);
  };

  return (
    <div
      className="w-full h-[100vh] flex justify-center items-center relative"
      style={{
        background:
          "linear-gradient(to top right, #FFD3E0, #B5EAD7, #B6C0C5, #CBE7E3 ,#353A5F)",
      }}
    >
      <div
        className="sm:w-[80%] border-gray-700 sm:h-fit rounded-xl sm:flex shadow-xl relative"
        style={{
          overflow: "hidden",
        }}
      >
        <div className="sm:w-[20%] h-full border-r-4 border-gray-700">
          <ProfileSideBar
            active={active}
            setActive={setActive}
            setActiveMenuProps={handleSetActiveMenu}
          />
        </div>
        <div className="w-[80%] relative z-10">
          <ProfileContent active={active} activeMenu={activeMenu} />
        </div>
        <div
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-l from-transparent to-gray-600/50 mix-blend-multiply pointer-events-none"
          style={{
            opacity: 0.5,
          }}
        />
      </div>
    </div>
  );
};

export default ProfilePage;
