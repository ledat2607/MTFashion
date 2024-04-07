import axios from "axios";
import React, { useState } from "react";
import { server } from "../../server";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { IoLocation } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
const AddressUser = () => {
  const { user } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [street, setStreet] = useState("");
  const [town, setTown] = useState("");
  const [provine, setProvine] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [openDelete, setOpenDelete] = useState(false);

  const handleOpenMap = () => {
    setOpen(!open);
  };
  const handleOpenDelete = () => {
    setOpenDelete(!openDelete);
  };

  const handleAddAddress = async () => {
    await axios
      .post(
        `${server}/user/add_address`,
        { street, town, provine, selectedStyle },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message);
        setStreet("");
        setTown("");
        setProvine("");
        setSelectedStyle("");
        setOpen(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  const handleDelete = async (id) => {
    await axios
      .post(`${server}/user/delete_address`, { id }, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        setOpenDelete(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <div className="w-full h-full bg-slate-300 bg-opacity-35">
      <h1 className="text-2xl font-Poppins uppercase font-[600] pt-4 text-center">
        Địa chỉ người dùng
      </h1>
      <div
        onClick={handleOpenMap}
        className="w-[150px] relative flex justify-center ml-4 mt-8 text-red-400 hover:translate-x-4 hover:text-black font-[800] items-center text-lg h-[40px] rounded-2xl bg-teal-300 hover:bg-white transition-transform duration-300 hover:cursor-pointer"
      >
        Thêm mới
      </div>
      {open ? (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-[100]">
          <div className="bg-white rounded-md sm:h-[45vh] h-fit sm:w-[45%] w-[90%]">
            <h1 className="text-lg font-[600] font-Poppins text-center uppercase sm:mt-6">
              Chọn địa chỉ của bạn
            </h1>
            <div className="flex flex-col items-center">
              <input
                type="text"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                placeholder="Số nhà, tên đường..."
                className="w-[90%] mt-4 px-4 py-2 border rounded-md focus:outline-none focus:border-blue-400"
              />
              <input
                type="text"
                value={town}
                onChange={(e) => setTown(e.target.value)}
                placeholder="Quận/huyện..."
                className="w-[90%] mt-4 px-4 py-2 border rounded-md focus:outline-none focus:border-blue-400"
              />
              <input
                type="text"
                value={provine}
                onChange={(e) => setProvine(e.target.value)}
                placeholder="Tỉnh/Thành phố..."
                className="w-[90%] mt-4 px-4 py-2 border rounded-md focus:outline-none focus:border-blue-400"
              />
              <select
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value)}
                className="w-[200px] h-[40px] mt-4 border-2 rounded-2xl p-2"
              >
                <option value="Chọn loại địa chỉ">Chọn loại địa chỉ...</option>
                <option value="Mặc định">Mặc định</option>
                <option value="Nhà riêng">Nhà riêng</option>
                <option value="Cơ quan/Văn phòng">Cơ quan/Văn phòng</option>
                <option value="Khác">Khác...</option>
              </select>
              <div className="w-full flex justify-center items-center sm:mt-6">
                <div
                  onClick={handleOpenMap}
                  className="cursor-pointer mt-4 px-6 py-2 bg-gray-200 text-black hover:text-white hover:bg-opacity-55 rounded-md hover:bg-red-600 focus:outline-none"
                >
                  Đóng
                </div>
                <div
                  onClick={() =>
                    handleAddAddress(street, town, provine, selectedStyle)
                  }
                  className="cursor-pointer mt-4 ml-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                >
                  Xác nhận
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <div className="w-[95%] mx-auto mt-8 text-lg font-DM">
        {user?.addresses.length === 0 ? (
          <div className="w-full h-full flex justify-center items-center">
            <p>Người dùng chưa có địa chỉ nào</p>
          </div>
        ) : (
          <div className="w-[80%] mx-auto h-full">
            {user?.addresses?.map((i, index) => (
              <div
                key={index}
                className="w-full sm:mb-4 h-[10vh] flex border-2 rounded-2xl bg-gray-200 p-3 items-center"
              >
                <span className="w-[10%] h-full flex items-center justify-center">
                  <IoLocation size={25} />
                </span>
                <div className="w-[60%] flex justify-center items-center">
                  {i?.street} - {i?.town} - {i?.provine}
                </div>
                <div className="w-[20%] h-full flex items-center">
                  {i?.addressType}
                </div>
                <div className="w-[10%] h-full flex items-center justify-between">
                  <MdDelete
                    onClick={handleOpenDelete}
                    size={25}
                    className="cursor-pointer hover:text-red-500 hover:scale-[1.2] transition-transform duration-300"
                  />
                </div>
                {openDelete ? (
                  <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-[100]">
                    <div className="bg-white rounded-md sm:h-[25vh] h-fit sm:w-[45%] w-[90%]">
                      <h1 className="text-xl font-Poppins font-[600] text-center uppercase sm:mt-6">
                        Bạn có chắc chắn sẽ xóa địa chỉ này ?{" "}
                      </h1>
                      <div className="w-[80%] h-[80%] mx-auto flex justify-center items-center">
                        <div
                          onClick={() => handleDelete(i?._id)}
                          className="rounded-2xl cursor-pointer hover:translate-x-2 transition-transform duration-300 flex justify-center items-center text-white font-[600] font-Poppins w-[150px] h-[40px] bg-red-500"
                        >
                          Xác nhận
                        </div>
                        <div
                          className="sm:ml-4 cursor-pointer hover:translate-x-2 transition-transform duration-300 rounded-2xl flex justify-center items-center text-white font-[600] font-Poppins w-[100px] bg-blue-500 h-[40px]"
                          onClick={() => setOpenDelete(false)}
                        >
                          Đóng
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressUser;
