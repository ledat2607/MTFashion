import React, { useState } from "react";
import { useSelector } from "react-redux";
import Card from "../../components/Layout/Card";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import AllOrder from "../UserProduct/AllOrder.jsx";
import Refund from "../UserProduct/Refund";
import Chat from "../Chat/Chat";
import AddressUser from "../AddressUser/AddressUser.jsx";
import { MdOutlinePhotoCameraFront } from "react-icons/md";
import axios from "axios";
import { server } from "../../server.js";
import { toast } from "react-toastify";

const ProfileContent = ({ active, activeMenu }) => {
  const { user } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [editSurname, setEditSurname] = useState(user && user.surName);
  const [editName, setEditName] = useState(user && user.name);
  const [editEmail, setEditEmail] = useState(user && user.email);
  const [editPhoneNumber, setEditPhoneNumber] = useState(
    user && user.phoneNumber
  );
  const [editUserName, setEditUserName] = useState(user && user.userName);
  const [editBirthDay, setEditBirthDay] = useState(user && user?.birthDay);
  //Định dạng ngày sinh
  const formatBirthday = (timestamp) => {
    const dateObject = new Date(timestamp);
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
    const day = dateObject.getDate().toString().padStart(2, "0");
    return `${day}/${month}/${year}`;
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64Data = reader.result.split(",")[1];

        // Construct the data object inside the onloadend callback
        const data = {
          avatar: base64Data, // Use the updated avatar value
        };

        // Send the request with the updated data object
        axios
          .put(
            `${server}/user/update-avatar`,
            { data },
            { withCredentials: true }
          )
          .then((res) => {
            window.location.reload();
            toast.success("Cập nhật ảnh đại diện thành công !");
          })
          .catch((err) => {
            toast.error(err);
          });
      };

      reader.readAsDataURL(file);
    }
  };
  const handleOpenEditInfo = () => {
    setOpen(!open);
  };
  const handleUpdate = async () => {
    const data = {
      editBirthDay,
      editEmail,
      editName,
      editPhoneNumber,
      editUserName,
      editSurname,
    };
    await axios
      .put(`${server}/user/update-infor`, { data }, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        setOpen(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  return (
    <div className="w-full h-full">
      {/*Profile Information*/}
      {active === 1 && (
        <div className="w-full bg-slate-300 flex h-full justify-center items-center border-2">
          <div className="sm:w-[50%] h-full">
            <div className="sm:w-full sm:h-[40vh] relative">
              <img
                src={`data:image/jpeg;base64,${user?.avatar}`}
                alt=""
                className="sm:w-[250px] border-2 border-teal-500 h-[250px] bg-white mt-2 object-contain rounded-full mx-auto"
              />
              <div className="absolute w-[40px] h-[40px] rounded-full left-[60%] bottom-[30%] bg-teal-500 flex justify-center items-center">
                <input
                  type="file"
                  id="image"
                  className="hidden"
                  onChange={handleImage}
                />
                <label htmlFor="image">
                  <MdOutlinePhotoCameraFront
                    size={25}
                    className="cursor-pointer hover:scale-[1.2] text-black hover:text-white hover:transition-transform duration-300"
                  />
                </label>
              </div>
            </div>
            <div className="w-full mt-2 flex justify-between items-center">
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
            <div className="w-full mt-6 flex items-center">
              <label className="pr-4 text-xl font-[600] font-DM">
                Tên người dùng
              </label>
              <input
                readOnly
                className="w-[63%] bg-slate-300 border-black border-2 rounded-lg h-[40px] pl-2"
                value={user?.userName}
              />
            </div>
            <div className="w-full flex justify-center items-center">
              <div
                onClick={handleOpenEditInfo}
                className="hover:translate-x-2 transition-transform duration-300 hover:bg-white hover:text-teal-500 w-[30%] hover:cursor-pointer text-lg font-[500] sm:mt-8 bg-teal-500 h-[40px] rounded-xl flex justify-center items-center"
              >
                Cập nhật
              </div>
            </div>
            {open ? (
              <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-[100]">
                <div className="bg-white rounded-md sm:h-[55vh] h-fit sm:w-[35%] w-[90%] p-4">
                  <h1 className="text-lg text-center font-Poppins font-[600] uppercase">
                    Cập nhật thông tin người dùng
                  </h1>
                  <div className="mt-4 w-full">
                    <div className="w-full mt-2 flex flex-col sm:flex-row justify-between items-center">
                      <div className="sm:w-[55%] w-[90%]">
                        <label className="text-xl font-[600] font-DM">Họ</label>
                        <input
                          className="sm:ml-[33%] bg-slate-100 border-2 border-black sm:w-[50%] w-[90%] rounded-lg h-[40px] pl-2"
                          value={editSurname}
                          onChange={(e) => setEditSurname(e.target.value)}
                        />
                      </div>
                      <div className="sm:w-[45%]">
                        <label className="pr-2 text-xl font-[600] font-DM">
                          Tên
                        </label>
                        <input
                          className="sm:w-[72%] bg-slate-100 border-2 border-black rounded-lg h-[40px] pl-2"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="w-full mt-6 flex items-center">
                      <label className="text-xl font-[600] font-DM">
                        Email
                      </label>
                      <input
                        className="sm:w-[38%] w-[90%] bg-slate-100 border-2 p-2 border-black rounded-lg h-[40px] ml-[15%]"
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                      />
                    </div>
                    <div className="w-full mt-6 flex items-center">
                      <label className="text-xl font-[600] font-DM">
                        Sinh nhật
                      </label>
                      <input
                        type="date"
                        className="sm:w-[32%] w-[90%] bg-slate-100 border-black border-2 rounded-lg h-[40px] p-2 ml-[10%]"
                        onChange={(e) => setEditBirthDay(e.target.value)}
                      />
                    </div>
                    <div className="w-full mt-6 flex items-center">
                      <label className="pr-4 text-xl font-[600] font-DM">
                        Số điện thoại
                      </label>
                      <input
                        className="sm:w-[23%] w-[90%] bg-slate-100 border-black border-2 rounded-lg h-[40px] ml-[3%] p-2"
                        value={"0" + editPhoneNumber}
                        onChange={(e) => setEditPhoneNumber}
                      />
                    </div>
                    <div className="w-full mt-6 flex items-center">
                      <label className="pr-4 text-xl font-[600] font-DM">
                        Tên người dùng
                      </label>
                      <input
                        className="sm:w-[23%] w-[350px] bg-slate-100 border-black border-2 rounded-lg h-[40px] pl-2"
                        value={editUserName}
                        onChange={(e) => setEditUserName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="w-[70%] mt-8 mx-auto flex justify-center items-center">
                    <div
                      onClick={() => setOpen(false)}
                      className="w-[100px] bg-red-500 text-white font-Poppins text-lg font-[600] hover:translate-x-3 transition-transform duration-300 cursor-pointer rounded-2xl h-[35px] flex justify-center items-center"
                    >
                      Đóng
                    </div>
                    <div
                      onClick={handleUpdate}
                      className="w-[150px] bg-blue-500 text-white font-Poppins text-lg font-[600] ml-4 hover:translate-x-3 transition-transform duration-300 cursor-pointer rounded-2xl h-[35px] flex justify-center items-center"
                    >
                      Xác nhận
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
          <div className="sm:w-[45%] h-[100%]">
            <div className="w-full h-[50%] flex items-center justify-center">
              <Card user={user} type={user?.customerType} />
            </div>
            <div className="border w-full h-[50%] border-green-400"></div>
          </div>
        </div>
      )}
      {/*Chat*/}
      {active === 2 && <Chat />}
      {/*Change Password*/}
      {active === 3 && <ChangePassword user={user} />}
      {active === 4 && (
        <div className="w-full h-full">
          {activeMenu === 1 && (
            <AllOrder activeMenu={1} setActiveMenu={1} onActiveMenuChange={1} />
          )}
          {activeMenu === 2 && (
            <Refund activeMenu={2} setActiveMenu={2} onActiveMenuChange={2} />
          )}
        </div>
      )}
      {active === 5 && <AddressUser />}
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
    <div className="flex justify-center items-center w-[60%] mx-auto">
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
const ChangePassword = ({ user }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [visibleNew, setVisibleNew] = useState(false);
  const [visibleConfirm, setVisibleConfirm] = useState(false);
  const [newEmail, setNewEmail] = useState();

  const passwordChangeHandler = async (e) => {
    e.preventDefault();
    await axios
      .put(
        `${server}/user/update-user-password`,
        {
          oldPassword,
          newPassword,
          confirmPassword,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message);
        setNewPassword("");
        setOldPassword("");
        setConfirmPassword("");
      });
  };
  return (
    <div className="w-full h-full px-5 bg-white bg-opacity-40">
      <h1 className="text-[25px] text-center pt-9 font-[600] text-[#000000ba] uppercase font-Poppins">
        Cập nhật thông tin tài khoản
      </h1>
      <div className="flex w-full h-full justify-center pt-[10%]">
        <div className="w-[50%]">
          <form>
            <div className="sm:w-[90%] w-full block p-2">
              <label className="block p-2">Mật khẩu cũ</label>
              <div className="relative mt-2">
                <input
                  type={visible ? "text" : "password"}
                  className="w-[90%] p-2 h-[40px] border ring-1 rounded-lg focus:ring-blue-500 focus:border-gray-400"
                  placeholder="Nhập mật khẩu cũ của bạn..."
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                {visible ? (
                  <AiOutlineEye
                    className="absolute cursor-pointer ml-4 right-2 top-2"
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
            <div className="sm:w-[90%] w-full block p-2">
              <label className="block p-2">Mật khẩu mới</label>
              <div className="relative mt-2">
                <input
                  type={visibleNew ? "text" : "password"}
                  className="w-[90%] p-2 h-[40px] border ring-1 rounded-lg focus:ring-blue-500 focus:border-gray-400"
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
            <div className="sm:w-[90%] w-full block p-2">
              <label className="block p-2">Xác nhận mật khẩu mới</label>
              <div className="relative mt-2">
                <input
                  type={visibleConfirm ? "text" : "password"}
                  className="w-[90%] p-2 h-[40px] border ring-1 rounded-lg focus:ring-blue-500 focus:border-gray-400"
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
        <div className="w-[50%]">
          <form>
            <div className="sm:w-[90%] w-full block p-2">
              <label className="block p-2">Địa chỉ email</label>
              <div className="relative mt-2">
                <input
                  readOnly
                  type="email"
                  className="w-[90%] p-2 h-[40px] border ring-1 rounded-lg focus:ring-blue-500 focus:border-gray-400"
                  value={user?.email}
                />
              </div>
            </div>
            <div className="sm:w-[90%] w-full block p-2">
              <label className="block p-2">Địa chỉ email</label>
              <div className="relative mt-2">
                <input
                  placeholder="Địa chỉ email mới..."
                  type="email"
                  className="w-[90%] p-2 h-[40px] border ring-1 rounded-lg focus:ring-blue-500 focus:border-gray-400"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                />
              </div>
            </div>

            <input
              type="submit"
              value="Xác nhận"
              className="w-[100px] h-[40px] bg-teal-500 rounded-2xl cursor-pointer hover:bg-teal-800 transition-all duration-200 mt-8 ml-[25%]"
            />
          </form>
        </div>
      </div>
    </div>
  );
};
export default ProfileContent;
