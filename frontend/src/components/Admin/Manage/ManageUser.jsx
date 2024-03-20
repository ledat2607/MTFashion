import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../../../server";
import { toast } from "react-toastify";
import { MdEmail } from "react-icons/md";
import { PiUserList } from "react-icons/pi";
import { FaPhoneAlt, FaAddressCard } from "react-icons/fa";
import { LuPiggyBank } from "react-icons/lu";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
const ManageUser = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(3);

  useEffect(() => {
    const getAllUser = async () => {
      try {
        const res = await axios.get(`${server}/admin/get-user-admin`, {
          withCredentials: true,
        });
        setData(res.data.userData);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    getAllUser();
  }, []); // Fetch data only on component mount

  function formatVietnameseCurrency(number) {
    const roundedNumber = Math.round(number / 1000) * 1000;
    const formattedNumber = roundedNumber.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });

    return formattedNumber;
  }

  // Logic to display data for the current page
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Generate an array of page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(data.length / rowsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      {data.length > 0 ? (
        <div className="w-full h-full">
          <h1 className="text-center font-[600] font-Poppins uppercase text-xl">
            Danh sách người dùng
          </h1>
          {currentRows.map((i, index) => (
            <div
              key={index}
              className="w-[95%] flex justify-center items-center h-[20vh] bg-gradient-to-r from-[#B6C0C5] via-[#9EBAF3] to-[#FAA6FF] bg-opacity-40 mt-6 rounded-3xl shadow-xl mx-auto"
            >
              <div className="w-[15%]  h-full flex justify-center items-center">
                <img
                  src={`data:image/jpeg;base64,${i?.avatar}`}
                  alt=""
                  className="w-[70%] transition-all duration-200 rounded-full cursor-pointer hover:scale-[1.2] overflow-hidden"
                />
              </div>
              <div className="w-[20%] sm:text-sm md:text-md font-[500] font-Poppins h-full flex flex-col justify-center items-center">
                <MdEmail fill="blue" size={25} />
                <span className="mt-2"> {i?.email}</span>
              </div>
              <div className="w-[25%] flex justify-center items-center flex-col">
                <PiUserList size={25} fill="blue" />
                <h1 className="mt-2 text-center font-Poppins text-xl font-[600]">
                  {i?.surName + " "}
                  {i?.name}
                </h1>
              </div>
              <div className="w-[15%] h-full flex justify-center items-center flex-col">
                <FaPhoneAlt size={25} fill="blue" />
                <span className="mt-2"> {"0" + i?.phoneNumber}</span>
              </div>
              <div className="w-[15%] h-full flex flex-col justify-center items-center">
                <LuPiggyBank size={25} color="blue" />
                <span className="mt-2">
                  {" "}
                  {formatVietnameseCurrency(i?.amount)}
                </span>
              </div>
              <div className="w-[15%] h-full flex flex-col justify-center items-center">
                <FaAddressCard size={25} color="blue" />
                <span className="mt-2">{i?.customerType}</span>
              </div>
            </div>
          ))}
          {/* Pagination */}
          <div className="flex justify-center items-center mt-4">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <IoIosArrowBack size={20} className="cursor-pointer" />
            </button>
            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={currentPage === number ? "active" : ""}
              >
                {number}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === Math.ceil(data.length / rowsPerPage)}
            >
              <IoIosArrowForward size={20} className="cursor-pointer" />
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default ManageUser;
