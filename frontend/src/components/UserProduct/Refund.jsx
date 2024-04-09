import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrder } from "../../redux/action/orderAction";
import { TbListDetails } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const Refund = () => {
  const { user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.orders);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 3;

  // Chuyển đến trang mới
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  useEffect(() => {
    dispatch(getAllOrder(user?._id));
  }, [dispatch, user?._id]);

  useEffect(() => {
    // Lọc ra các sản phẩm có trạng thái là "xác nhận hoàn trả" hoặc "hoàn trả"
    const filteredData = orders?.filter(
      (order) =>
        order.status === "Xác nhận hoàn trả" || order.status === "Hoàn trả"
    );
    setFilteredOrders(filteredData);
  }, [orders]);
  const handleDetail = (item) => {
    navigate(`/detail-order/${item?._id}`, {
      state: { item, isAdmin: false },
    });
  };
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders?.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );
  function formatVietnameseCurrency(number) {
    const roundedNumber = Math.round(number / 1000) * 1000;
    const formattedNumber = roundedNumber.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });

    return formattedNumber;
  }
  return (
    <div className="w-full mx-auto h-[82vh]">
      <h1 className="text-2xl uppercase font-[700] font-DM pt-4 text-center">
        Tất cả đơn hàng hoàn trả
      </h1>
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
                  <TbListDetails
                    onClick={() => handleDetail(i)}
                    size={25}
                    className="text-lg mt-2 hover:scale-[1.2] hover:text-blue-500 transition-transform duration-300 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          ))}
          <ul className="flex justify-center items-center mt-4">
            {Array.from(
              { length: Math.ceil(filteredOrders?.length / ordersPerPage) },
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
          <h1>Chưa có đơn hàng hoàn trả nào</h1>
        </div>
      )}
    </div>
  );
};

export default Refund;
