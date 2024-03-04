import React, { useState } from "react";
import ProfileSideBar from "../../components/Profile/ProfileSideBar";
import ProfileContent from "../../components/Profile/ProfileContent";
const ProfilePage = () => {
  const [active, setActive] = useState(1);
  return (
    <div
      className="w-full h-[100vh] flex justify-center items-center"
      style={{
        background:
          "linear-gradient(to top right, #FFD3E0, #B5EAD7, #B6C0C5, #CBE7E3 ,#353A5F)",
      }}
    >
      <div className="sm:w-[80%] border-t-4 border-r-4 border-gray-700 sm:h-fit rounded-l-xl sm:flex shadow-xl">
        <div className="sm:w-[20%] h-full border-r-4 border-gray-700">
          <ProfileSideBar active={active} setActive={setActive} />
        </div>
        <div className="w-[80%] pl-2">
          <ProfileContent />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
