import React, { useState } from "react";

const AddressUser = () => {
  const [open, setOpen] = useState(false);
  const [street, setStreet] = useState("");
  const [town, setTown] = useState("");
  const [provine, setProvine] = useState("");
  const [searchUrl, setSearchUrl] = useState(""); // State để lưu trữ URL cho iframe

  const handleOpenMap = () => {
    setOpen(!open);
  };

  const handleAddressChange = (event) => {
    setStreet(event.target.value);
  };

  const handleLocationChange = (event) => {
    setTown(event.target.value);
  };
  const handleChangeProvine = (event) => {
    setProvine(event.target.value);
  };

  const handleSearch = () => {
    const url = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3914.5847105347807!2d106.83995931103047!3d11.144275188981931!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174c169cebb9563%3A0x7125e9ede5786f97!2zVMOibiBUaMOgbmggMjQsIHR0LiBUw6JuIFRow6BuaCwgQuG6r2MgVMOibiBVecOqbiwgQsOsbmggRMawxqFuZywgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2sus!4v1710259860039!5m2!1svi!2sus`;
    setSearchUrl(url);
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
          <div className="bg-white rounded-md sm:h-[70vh] h-fit sm:w-[45%] w-[90%]">
            <h1 className="text-lg font-[600] font-Poppins text-center uppercase">
              Chọn địa chỉ của bạn
            </h1>
            <div className="flex flex-col items-center">
              <input
                type="text"
                value={street}
                onChange={handleAddressChange}
                placeholder="Số nhà, tên đường..."
                className="w-[90%] mt-4 px-4 py-2 border rounded-md focus:outline-none focus:border-blue-400"
              />
              <input
                type="text"
                value={town}
                onChange={handleLocationChange}
                placeholder="Quận/huyện..."
                className="w-[90%] mt-4 px-4 py-2 border rounded-md focus:outline-none focus:border-blue-400"
              />
              <input
                type="text"
                value={provine}
                onChange={handleChangeProvine}
                placeholder="Tỉnh/Thành phố..."
                className="w-[90%] mt-4 px-4 py-2 border rounded-md focus:outline-none focus:border-blue-400"
              />
              <div className="w-full flex justify-center items-center">
                <button
                  onClick={handleOpenMap}
                  className="mt-4 px-6 py-2 bg-gray-200 text-black hover:text-white hover:bg-opacity-55 rounded-md hover:bg-red-600 focus:outline-none"
                >
                  Đóng
                </button>
                <button
                  onClick={handleSearch}
                  className="mt-4 ml-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                >
                  Xác nhận
                </button>
              </div>
            </div>
            {searchUrl && (
              <iframe
                title="Map"
                src={searchUrl}
                width="100%"
                height="50%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="mt-4"
              />
            )}
          </div>
        </div>
      ) : null}
      <div className="w-[95%] mx-auto mt-8 text-lg font-DM">
        Danh sách địa chỉ
      </div>
    </div>
  );
};

export default AddressUser;
