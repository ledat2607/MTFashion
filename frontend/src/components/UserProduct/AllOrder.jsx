import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrder } from "../../redux/action/orderAction";
import { MdCancel } from "react-icons/md";
import { HiReceiptRefund } from "react-icons/hi2";
import { TbListDetails } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { server } from "../../server";
const AllOrder = () => {
  const { user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.orders);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openRefund, setOpenRefund] = useState(false);
  const [selectedReason, setSelectedReason] = useState("");
  const navigate = useNavigate();
  const [selectedOrderId, setSelectedOrderId] = useState("");
  const [selectedRefundId, setSelectedRefundId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 3;
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    dispatch(getAllOrder(user?._id));
    setData(orders);
  }, [dispatch, orders, user?._id]);
  function formatVietnameseCurrency(number) {
    const roundedNumber = Math.round(number / 1000) * 1000;
    const formattedNumber = roundedNumber.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });

    return formattedNumber;
  }

  const reason = [
    { title: "Không muốn mua mặc hàng này" },
    { title: "Không phù hợp với nhu cầu" },
    { title: "Địa chỉ giao hàng không đúng" },
    { title: "Khác..." },
  ];
  const reasonRefun = [
    { title: "Sản phẩm không đúng như quảng cáo" },
    { title: "Lý do khách quan khác" },
    { title: "Giao sai đơn hàng" },
    { title: "Sản phẩm bị hư hỏng" },
    { title: "Khác..." },
  ];
  const statusOptions = [
    "all",
    "Chờ duyệt",
    "Đã duyệt",
    "Chuẩn bị hàng",
    "Đang giao hàng",
    "Giao hàng thành công",
    "Đã hủy",
  ];
  const handleChangeReason = (newReason) => {
    setSelectedReason(newReason);
  };
  const handleCancel = async () => {
    await axios
      .post(
        `${server}/order/cancel-order`,
        { reason: selectedReason, orderId: selectedOrderId },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message);
        setOpen(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  const handleDetail = (item) => {
    navigate(`/detail-order/${item?._id}`, {
      state: { item, isAdmin: false },
    });
  };
  const handleRefund = async () => {
    await axios
      .post(
        `${server}/order/refund-order`,
        { reason: selectedReason, orderId: selectedRefundId },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message);
        setOpenRefund(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const filteredData = orders?.filter((item) => {
    if (statusFilter === "all") {
      return true; // Hiển thị tất cả các đơn hàng
    } else {
      return item.status === statusFilter; // Hiển thị các đơn hàng với trạng thái được chọn
    }
  });

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredData?.slice(indexOfFirstOrder, indexOfLastOrder);

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
              : option === "Giao hàng thành công"
              ? "Giao hàng thành công"
              : "Đã hủy"}
          </button>
        ))}
      </div>
      {currentOrders ? (
        <>
          {currentOrders?.map((i, index) => (
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
                    : i?.paidAt
                    ? i?.paidAt.slice(0, 10)
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
                  {i?.status === "Giao hàng thành công" ||
                  i?.status === "Xác nhận hoàn trả" ? (
                    <HiReceiptRefund
                      onClick={() => {
                        setOpenRefund(true);
                        setSelectedRefundId(i?._id);
                      }}
                      size={25}
                      className={`${
                        i?.status === "Xác nhận hoàn trả" ? "hidden" : "block"
                      } text-lg hover:scale-[1.2] hover:text-yellow-500 transition-transform duration-300 cursor-pointer`}
                    />
                  ) : (
                    <MdCancel
                      onClick={() => {
                        setOpen(true);
                        setSelectedOrderId(i?._id); // Lưu trữ ID của đơn hàng được chọn
                      }}
                      title="Hủy đơn hàng"
                      size={25}
                      className={`${
                        i?.status === "Đã hủy" ? "hidden" : "block"
                      } text-lg hover:scale-[1.2] hover:text-red-500 transition-transform duration-300 cursor-pointer`}
                    />
                  )}
                  <TbListDetails
                    onClick={() => handleDetail(i)}
                    size={25}
                    className="text-lg mt-2 hover:scale-[1.2] hover:text-blue-500 transition-transform duration-300 cursor-pointer"
                  />
                  {open ? (
                    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-[100]">
                      <div className="bg-white rounded-md sm:h-[60vh] h-fit sm:w-[25%] w-[90%]">
                        <h1 className="text-lg font-[600] text-center sm:mt-6 uppercase font-Poppins">
                          Lý do hủy đơn hàng
                        </h1>
                        {reason.map((i, index) => (
                          <div
                            key={index}
                            className="w-[90%] mx-auto mt-6 flex justify-start items-center h-[60px] rounded-2xl p-2 border-2 border-black bg-gray-200 shadow-2xl"
                          >
                            <input
                              type="checkbox"
                              className="w-[20px] h-[20px]"
                              checked={selectedReason === i.title}
                              onChange={() => handleChangeReason(i.title)}
                            />
                            <p className="ml-2">{i?.title} </p>
                          </div>
                        ))}
                        <div className="w-[90%] justify-center items-center flex mt-8 mx-auto">
                          <div
                            onClick={() => setOpen(false)}
                            className="w-[80px] bg-red-500 flex justify-center items-center cursor-pointer rounded-2xl h-[40px]"
                          >
                            Đóng
                          </div>
                          <div
                            onClick={handleCancel}
                            className="w-[100px] ml-4 bg-blue-500 flex justify-center items-center cursor-pointer rounded-2xl h-[40px]"
                          >
                            Xác nhận
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                  {openRefund ? (
                    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-[100]">
                      <div className="bg-white rounded-md sm:h-[60vh] h-fit sm:w-[25%] w-[90%]">
                        <h1 className="text-lg font-[600] text-center sm:mt-6 uppercase font-Poppins">
                          Lý do trả hàng
                        </h1>
                        {reasonRefun.map((i, index) => (
                          <div
                            key={index}
                            className="w-[90%] mx-auto mt-6 flex justify-start items-center h-[60px] rounded-2xl p-2 border-2 border-black bg-gray-200 shadow-2xl"
                          >
                            <input
                              type="checkbox"
                              className="w-[20px] h-[20px]"
                              checked={selectedReason === i.title}
                              onChange={() => handleChangeReason(i.title)}
                            />
                            <p className="ml-2">{i?.title} </p>
                          </div>
                        ))}
                        <div className="w-[90%] justify-center items-center flex mt-8 mx-auto">
                          <div
                            onClick={() => setOpen(false)}
                            className="w-[80px] bg-red-500 flex justify-center items-center cursor-pointer rounded-2xl h-[40px]"
                          >
                            Đóng
                          </div>
                          <div
                            onClick={handleRefund}
                            className="w-[100px] ml-4 bg-blue-500 flex justify-center items-center cursor-pointer rounded-2xl h-[40px]"
                          >
                            Xác nhận
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
          <ul className="flex justify-center items-center mt-4">
            {Array.from(
              { length: Math.ceil(data?.length / ordersPerPage) },
              (_, i) => (
                <li key={i} className="mx-1">
                  <button
                    onClick={() => paginate(i + 1)}
                    className={`px-3 py-1 rounded-full hover:bg-gray-500 hover:text-white ${
                      currentPage === i + 1
                        ? "bg-blue-500 text-white hover:bg-gray-500"
                        : "bg-gray-200"
                    }`}
                  >
                    {i + 1}
                  </button>
                </li>
              )
            )}
          </ul>
        </>
      ) : (
        <div className="w-full h-full">
          <h1>Chưa có đơn hàng nào</h1>
        </div>
      )}
    </div>
  );
};

export default AllOrder;
