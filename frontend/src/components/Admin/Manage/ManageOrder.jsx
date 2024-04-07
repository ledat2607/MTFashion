import React, { useEffect, useState } from "react";
import { TbListDetails } from "react-icons/tb";
import axios from "axios";
import { server } from "../../../server";
import { useNavigate } from "react-router-dom";

const ManageOrder = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  function formatVietnameseCurrency(number) {
    const roundedNumber = Math.round(number / 1000) * 1000;
    const formattedNumber = roundedNumber.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });

    return formattedNumber;
  }

  useEffect(() => {
    axios
      .get(`${server}/order/get-all-orders`, { withCredentials: true })
      .then((res) => {
        setData(res.data.orders);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  }, [statusFilter]); // Fetch data whenever the statusFilter changes

  const filteredData = data.filter((item) => {
    if (statusFilter === "all") {
      return true; // Show all orders
    } else {
      return item.status === statusFilter; // Show orders with selected status
    }
  });
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const statusOptions = [
    "all",
    "Chờ duyệt",
    "Đã duyệt",
    "Chuẩn bị hàng",
    "Đang giao hàng",
    "Giao hàng thành công",
    "Đã hủy",
    "Hoàn trả",
  ];
  const detailOrder = (item) => {
    navigate(`/detail-order/${item?._id}`, {
      state: { item, isAdmin: true },
    });
  };
  return (
    <div className="w-full mx-auto h-[82vh]">
      <h1 className="text-2xl uppercase font-[700] font-DM pt-4 text-center">
        Tất cả đơn hàng
      </h1>
      <div className="flex justify-center my-4">
        {statusOptions.map((option) => (
          <button
            key={option}
            className={`mx-2 px-4 py-2 bg-gray-200 rounded ${
              statusFilter === option && "bg-gray-400"
            }`}
            onClick={() => setStatusFilter(option)}
          >
            {option === "all"
              ? "Tất cả"
              : option === "Chờ duyệt"
              ? "Chờ duyệt"
              : option === "Đã duyệt"
              ? "Đã duyệt"
              : option === "Chuẩn bị hàng"
              ? "Chuẩn bị hàng"
              : option === "Đang giao hàng"
              ? "Đang giao hàng"
              : option === "Hoàn trả"
              ? "Hoàn trả"
              : option === "Giao hàng thành công"
              ? "Giao hàng thành công"
              : "Đã hủy"}
          </button>
        ))}
      </div>
      {currentItems ? (
        <div className="w-full flex flex-col">
          {currentItems?.map((i, index) => (
            <div className="w-[95%] mx-auto bg-white rounded-l-2xl rounded-r-2xl flex sm:mt-4">
              <div className="w-[15%] flex flex-col justify-center items-center">
                <p className="h-[40px] rounded-tl-2xl flex justify-center items-center bg-teal-500 font-[600] font-Roboto w-full text-center">
                  Hình ảnh
                </p>
                <img
                  src={`data:image/jpeg;base64,${i?.style.url}`}
                  alt=""
                  className="w-[90px] object-contain h-[100px] pt-1"
                />
                <p>{i?.style.code}</p>
              </div>
              <div className="w-[15%] flex flex-col justify-center items-center">
                <p className="h-[40px] flex justify-center items-center bg-teal-500 font-[600] font-Roboto w-full text-center">
                  Tên sản phẩm
                </p>
                <p className="h-[124px] flex justify-center items-center">
                  {i?.product.product.productName}
                </p>
              </div>
              <div className="w-[15%] flex flex-col justify-center items-center">
                <p className="h-[40px] flex justify-center items-center bg-teal-500 font-[600] font-Roboto w-full text-center">
                  Giá tiền
                </p>
                <p className="h-[124px] flex justify-center items-center">
                  {formatVietnameseCurrency(i?.totalPrice)}
                </p>
              </div>
              <div className="w-[15%] flex flex-col justify-center items-center">
                <p className="h-[40px] flex justify-center items-center bg-teal-500 font-[600] font-Roboto w-full text-center">
                  Ngày thanh toán
                </p>
                <p className="h-[124px] text-center flex justify-center items-center">
                  {i?.status === "Đã hủy"
                    ? "Đã hủy đơn hàng"
                    : i?.paidAt?.slice(0, 10)
                    ? i?.paidAt?.slice(0, 10)
                    : i?.paymentInfo.type}
                </p>
              </div>
              <div className="w-[15%] flex flex-col justify-center items-center">
                <p className="h-[40px] flex justify-center items-center bg-teal-500 font-[600] font-Roboto w-full text-center">
                  Số lượng - Size
                </p>
                <p className="h-[124px] text-center flex justify-center items-center">
                  {i?.product.quantity} - {i?.product.size}
                </p>
              </div>
              <div className="w-[15%] flex flex-col justify-center items-center">
                <p className="h-[40px] flex justify-center items-center bg-teal-500 font-[600] font-Roboto w-full text-center">
                  Trạng thái
                </p>
                <p className="h-[124px] text-center flex justify-center items-center">
                  {i?.status}
                </p>
              </div>
              <div className="w-[10%] flex justify-center items-center flex-col">
                <p className="h-[40px] flex justify-center items-center rounded-tr-2xl bg-teal-500 font-[600] font-Roboto w-full text-center">
                  Chức năng
                </p>
                <div className="w-[80px] h-[124px] flex flex-col justify-center items-center">
                  <TbListDetails
                    onClick={() => detailOrder(i)}
                    size={25}
                    className="text-lg mt-2 hover:scale-[1.2] hover:text-blue-500 transition-transform duration-300 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          ))}
          <div className="flex justify-center mt-4">
            {[
              ...Array(Math.ceil(filteredData.length / itemsPerPage)).keys(),
            ].map((number) => (
              <button
                key={number}
                onClick={() => paginate(number + 1)}
                className="mx-1 px-3 py-1 bg-gray-200 rounded hover:bg-gray-400 focus:outline-none"
              >
                {number + 1}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full h-full">
          <h1>Chưa có đơn hàng nào</h1>
        </div>
      )}
    </div>
  );
};

export default ManageOrder;
