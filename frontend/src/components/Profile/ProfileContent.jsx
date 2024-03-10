import React, { useState } from "react";
import { useSelector } from "react-redux";
import Card from "../../components/Layout/Card";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import AllOrder from "../UserProduct/Order";
import Refund from "../UserProduct/Refund";
const ProfileContent = ({ active, activeMenu }) => {
  const { user } = useSelector((state) => state.user);
  //Định dạng ngày sinh
  const formatBirthday = (timestamp) => {
    const dateObject = new Date(timestamp);
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
    const day = dateObject.getDate().toString().padStart(2, "0");
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="w-full h-full">
      {/*Profile Information*/}
      {active === 1 && (
        <div className="w-full bg-slate-300 flex h-full justify-center items-center border-2">
          <div className="sm:w-[50%] h-full">
            <div className="sm:w-full sm:h-[40vh]">
              <img
                src={`data:image/jpeg;base64,${user?.avatar}`}
                alt=""
                className="sm:w-[50%] pt-2 object-contain rounded-full mx-auto"
              />
            </div>
            <div className="w-full mt-8 flex justify-between items-center">
              <div className="sm:w-[55%]">
                <label className="text-xl font-[600] font-DM">Họ</label>
                <input
                  readOnly
                  className="ml-[28%] bg-slate-300 border-2 border-black w-[50%] rounded-lg h-[40px] pl-2"
                  value={user?.surName}
                />
              </div>
              <div className="sm:w-[45%]">
                <label className="pr-2 text-xl font-[600] font-DM">Tên</label>
                <input
                  readOnly
                  className="w-[70%] bg-slate-300 border-2 border-black rounded-lg h-[40px] pl-2"
                  value={user?.name}
                />
              </div>
            </div>
            <div className="w-full mt-6 flex items-center">
              <label className="pr-[10%] text-xl font-[600] font-DM">
                Email
              </label>
              <input
                readOnly
                className="w-[75%] bg-slate-300 border-2 border-black rounded-lg h-[40px] pl-2"
                value={user?.email}
              />
            </div>
            <div className="w-full mt-6 flex items-center">
              <label className="pr-4 text-xl font-[600] font-DM">
                Sinh nhật
              </label>
              <input
                readOnly
                className="w-[75%] bg-slate-300 border-black border-2 rounded-lg h-[40px] pl-2"
                value={
                  user?.birthDay
                    ? formatBirthday(user?.birthDay)
                    : formatBirthday(Date.now())
                }
              />
            </div>
            <div className="w-full mt-6 flex items-center">
              <label className="pr-4 text-xl font-[600] font-DM">
                Số điện thoại
              </label>
              <input
                readOnly
                className="w-[68%] bg-slate-300 border-black border-2 rounded-lg h-[40px] pl-2"
                value={"0" + user?.phoneNumber}
              />
            </div>
            <div className="w-full flex justify-center items-center">
              <div className="w-[30%] hover:cursor-pointer text-lg font-[500] sm:mt-8 bg-teal-500 h-[40px] rounded-xl flex justify-center items-center">
                Cập nhật
              </div>
            </div>
          </div>
          <div className="sm:w-[45%] h-[100%]">
            <div className="w-full h-[50%] flex items-center justify-center">
              <Card user={user} type={user?.customerType} />
            </div>
            <div className="border w-full h-[50%] border-green-400"></div>
          </div>
        </div>
      )}
      {/*Change Password*/}
      {active === 3 && <ChangePassword />}
      {active === 4 && (
        <div>
          {activeMenu === 1 && (
            <AllOrder activeMenu={1} setActiveMenu={1} onActiveMenuChange={1} />
          )}
          {activeMenu === 2 && (
            <Refund activeMenu={2} setActiveMenu={2} onActiveMenuChange={2} />
          )}
        </div>
      )}
    </div>
  );
};
const PasswordStrengthBar = ({ password }) => {
  // Hàm kiểm tra mật khẩu và cập nhật màu sắc
  const checkPassword = (password) => {
    const conditions = [
      /[a-z]/, // Chữ thường
      /[A-Z]/, // Chữ hoa
      /\d/, // Số
      /[!@#$%^&*.,]/, // Ký tự đặc biệt
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*.,]).{6,}/, // Độ dài ít nhất 6 ký tự và các yêu cầu khác
    ];

    const strength = conditions.reduce((count, condition) => {
      return count + (condition.test(password) ? 1 : 0);
    }, 0);

    return strength;
  };

  const passwordStrength = checkPassword(password);

  const colors = [
    "bg-green-100",
    "bg-green-200",
    "bg-green-300",
    "bg-green-400",
    "bg-green-500",
  ];

  return (
    <div className="flex w-[60%] mx-auto">
      {colors.map((color, index) => (
        <div
          key={index}
          className={`ml-2 w-[17%] h-[10px] rounded-[10px] ${
            index < passwordStrength ? colors[index] : "bg-gray-200"
          }`}
        ></div>
      ))}
    </div>
  );
};
const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [visibleNew, setVisibleNew] = useState(false);
  const [visibleConfirm, setVisibleConfirm] = useState(false);

  const passwordChangeHandler = async (e) => {
    console.log(`Cập nhật thành công`);
  };
  return (
    <div className="w-[70%] mx-auto  px-5">
      <div className="flex pt-[25%] w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#000000ba] uppercase font-Poppins">
          Thay đổi mật khẩu
        </h1>
      </div>
      <div className="w-full ">
        <form>
          <div className="800px:w-[60%] w-full block mx-auto p-2">
            <label className="block p-2">Mật khẩu cũ</label>
            <div className="relative mt-2">
              <input
                type={visible ? "text" : "password"}
                className="w-[95%] p-2 h-[40px] border ring-1 rounded-lg focus:ring-blue-500 focus:border-gray-400"
                placeholder="Nhập mật khẩu cũ của bạn..."
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              {visible ? (
                <AiOutlineEye
                  className="absolute cursor-pointer right-2 top-2"
                  size={25}
                  onClick={() => setVisible(false)}
                />
              ) : (
                <AiOutlineEyeInvisible
                  className="absolute cursor-pointer right-2 top-2"
                  size={25}
                  onClick={() => setVisible(true)}
                />
              )}
            </div>
          </div>
          <div className="800px:w-[60%] w-full block mx-auto p-2">
            <label className="block p-2">Mật khẩu mới</label>
            <div className="relative mt-2">
              <input
                type={visibleNew ? "text" : "password"}
                className="w-[95%] p-2 h-[40px] border ring-1 rounded-lg focus:ring-blue-500 focus:border-gray-400"
                placeholder="Nhập mật khẩu mới của bạn..."
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              {visibleNew ? (
                <AiOutlineEye
                  className="absolute cursor-pointer right-2 top-2"
                  size={25}
                  onClick={() => setVisibleNew(false)}
                />
              ) : (
                <AiOutlineEyeInvisible
                  className="absolute cursor-pointer right-2 top-2"
                  size={25}
                  onClick={() => setVisibleNew(true)}
                />
              )}
            </div>
          </div>
          <PasswordStrengthBar password={newPassword} />
          <div className="800px:w-[60%] w-full block mx-auto p-2">
            <label className="block p-2">Xác nhận mật khẩu mới</label>
            <div className="relative mt-2">
              <input
                type={visibleConfirm ? "text" : "password"}
                className="w-[95%] p-2 h-[40px] border ring-1 rounded-lg focus:ring-blue-500 focus:border-gray-400"
                placeholder="Nhập mật khẩu cũ của bạn..."
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {visibleConfirm ? (
                <AiOutlineEye
                  className="absolute cursor-pointer right-2 top-2"
                  size={25}
                  onClick={() => setVisibleConfirm(false)}
                />
              ) : (
                <AiOutlineEyeInvisible
                  className="absolute cursor-pointer right-2 top-2"
                  size={25}
                  onClick={() => setVisibleConfirm(true)}
                />
              )}
            </div>
          </div>
          <div
            onClick={passwordChangeHandler}
            className={`flex justify-center items-center bg-teal-500 rounded-lg mt-8 cursor-pointer hover:translate-x-3 transition-transform duration-300 hover:bg-slate-300 hover:shadow hover:shadow-teal-800/80 w-[100px] h-[40px] mx-auto`}
          >
            Xác nhận
          </div>
        </form>
      </div>
    </div>
  );
};
export default ProfileContent;
