import React, { useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import LoadUser from "../animations/loadUser";
import { AiFillAppstore } from "react-icons/ai";
import { useSelector } from "react-redux";
const AdminHero = () => {
  const { products } = useSelector((state) => state.products);
  const [data, setData] = useState([]);
  const [dataOrder, setDataOrder] = useState([]);
  const [accountsCreatedThisMonth, setAccountsCreatedThisMonth] = useState(0);
  const [userWithHighestAmount, setUserWithHighestAmount] = useState(null);
  const [successfulOrders, setSuccessfulOrders] = useState([]);
  const [returnConfirmationOrders, setReturnConfirmationOrders] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [cancel, setCancel] = useState([]);
  const [totalSuccessfulOrderAmount, setTotalSuccessfulOrderAmount] =
    useState(0);
  useEffect(() => {
    const getAllUser = async () => {
      try {
        const res = await axios.get(`${server}/admin/get-user-admin`, {
          withCredentials: true,
        });
        setData(res.data.userData);
        countAccountsCreatedThisMonth(res.data.userData);
        findUserWithHighestAmount(res.data.userData);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    getAllUser();
  }, []);
  //get all order
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${server}/order/get-all-orders`, {
          withCredentials: true,
        });
        setDataOrder(res.data.orders);
        filterOrders(res.data.orders);
        calculateTotalSuccessfulOrderAmount(res.data.orders);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    fetchData();
  }, []);
  //Tổng giá trị nhận
  const calculateTotalSuccessfulOrderAmount = (orders) => {
    const totalAmount = orders.reduce((acc, order) => {
      if (order.status === "Giao hàng thành công") {
        return acc + order.totalPrice;
      }
      return acc;
    }, 0);

    setTotalSuccessfulOrderAmount(totalAmount);
  };
  //filter order
  const filterOrders = (orders) => {
    const successful = orders.filter(
      (order) => order.status === "Giao hàng thành công"
    );
    const returnConfirmation = orders.filter(
      (order) =>
        order.status === "Xác nhận hoàn trả" || order.status === "Hoàn trả"
    );
    const pending = orders.filter((order) => order.status === "Chờ duyệt");
    const cancel = orders.filter((order) => order.status === "Đã hủy");

    setSuccessfulOrders(successful);
    setReturnConfirmationOrders(returnConfirmation);
    setPendingOrders(pending);
    setCancel(cancel);
  };

  //count account per month
  const countAccountsCreatedThisMonth = (users) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    let count = 0;
    users.forEach((user) => {
      const userDate = new Date(user.createdAt);
      const userMonth = userDate.getMonth();
      const userYear = userDate.getFullYear();

      if (userMonth === currentMonth && userYear === currentYear) {
        count++;
      }
    });

    setAccountsCreatedThisMonth(count);
  };
  //get user with highest amount
  const findUserWithHighestAmount = (users) => {
    const sortedUsers = [...users].sort((a, b) => b.amount - a.amount);
    setUserWithHighestAmount(sortedUsers[0]);
  };
  //Định dạng tiền tệ
  function formatVietnameseCurrency(number) {
    const roundedNumber = Math.round(number / 1000) * 1000;
    const formattedNumber = roundedNumber.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });

    return formattedNumber;
  }
  //update card member
  const handleUpdateMemberCard = async (id, amount) => {
    await axios
      .post(
        `${server}/user/update-customerType`,
        { id, amount },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  return (
    <div className="w-full h-[85vh] ">
      <div className="w-full h-[25vh] flex flex-col justify-center">
        <div className="w-full h-[3vh] flex items-center">
          <FaUsers size={25} />
          <h1 className="text-lg font-[600] font-Poppins ml-2 uppercase">
            Số liệu người dùng
          </h1>
        </div>
        <div className="w-full flex items-center">
          <div className="w-[25%] mt-2 h-[15vh] rounded-2xl border-2 border-blue-500 p-2 flex items-center">
            <div className="w-[30%]">
              <LoadUser />
            </div>
            <div className="w-[70%] ml-2">
              <p className="text-lg font-Poppins">
                Số lượng tài khoản:
                <i className="text-lg ml-4 font-[700] text-blue-500">
                  {data?.length}
                </i>
              </p>
              <p className="text-lg font-Poppins">
                Số lượng tài khoản tạo trong tháng:{" "}
                <i className="text-lg ml-4 font-[700] text-blue-500">
                  {accountsCreatedThisMonth}
                </i>
              </p>
            </div>
          </div>
          <div className="w-[25%] mt-2 ml-4 h-[15vh] rounded-2xl border-2 border-blue-500 p-2 flex items-center">
            <div className="w-full flex flex-col">
              <h1 className="font-[600] font-DancingScript text-lg text-red-500">
                Khách hàng tiềm năng
              </h1>
              <div className="w-full flex items-center flex-col justify-center">
                <img
                  src={`data:image/jpeg;base64,${userWithHighestAmount?.avatar}`}
                  alt=""
                  className="w-[40px] h-[40px] rounded-full"
                />
                <p className="text-lg font-Poppins font-[600]">
                  {userWithHighestAmount?.surName} {userWithHighestAmount?.name}
                </p>
                <p className="text-lg font-[600] font-Poppins text-blue-500">
                  Tổng chi tiêu:{" "}
                  {formatVietnameseCurrency(userWithHighestAmount?.amount)}
                </p>
              </div>
            </div>
          </div>
          <div className="w-[25%] mt-2 ml-4 h-[15vh] rounded-2xl border-2 border-blue-500 p-2 flex items-center">
            <div className="w-full flex flex-col">
              <h1 className="font-[600] font-DancingScript text-lg text-red-500">
                Thẻ thành viên
              </h1>
              <div className="w-full flex items-center flex-col justify-center">
                <img
                  src={`data:image/jpeg;base64,${userWithHighestAmount?.avatar}`}
                  alt=""
                  className="w-[40px] h-[40px] rounded-full"
                />
                <p className="text-lg font-Poppins font-[600]">
                  {userWithHighestAmount?.customerType}
                </p>
                <p
                  onClick={() =>
                    handleUpdateMemberCard(
                      userWithHighestAmount?._id,
                      userWithHighestAmount?.amount
                    )
                  }
                  className="cursor-pointer hover:translate-x-2 transition-transform duration-300 hover:text-blue-500"
                >
                  Cập nhật
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[25vh] flex flex-col justify-center">
        <div className="w-full h-[3vh] flex items-center">
          <AiFillAppstore size={25} />
          <h1 className="text-lg font-[600] font-Poppins ml-2 uppercase">
            Số liệu sản phẩm
          </h1>
        </div>
        <div className="w-full flex items-center">
          <div className="w-[25%] mt-2 h-[15vh] rounded-2xl border-2 border-blue-500 p-2 flex items-center">
            <div className="w-[30%]">
              <LoadUser />
            </div>
            <p className="ml-3 text-lg font-Poppins font-[600]">
              Số lượng sản phẩm: {products?.length}
            </p>
          </div>
        </div>
      </div>
      <div className="w-full h-[25vh] flex flex-col justify-center">
        <div className="w-full h-[3vh] flex items-center">
          <AiFillAppstore size={25} />
          <h1 className="text-lg font-[600] font-Poppins ml-2 uppercase">
            Số liệu đơn hàng
          </h1>
        </div>
        <div className="w-full flex items-center">
          <div className="w-[25%] mt-2 h-[15vh] rounded-2xl border-2 border-blue-500 p-2 flex items-center">
            <div className="w-[30%]">
              <LoadUser />
            </div>
            <p className="ml-3 text-lg font-Poppins font-[600]">
              Số lượng đơn hàng: {dataOrder.length}
            </p>
          </div>
          <div className="w-[25%] ml-3 mt-2 h-[15vh] rounded-2xl border-2 border-blue-500 p-2 flex justify-center flex-col">
            <p className="ml-3 text-lg font-Poppins font-[600]">
              Đơn hàng giao thành công: {successfulOrders.length}
            </p>
            <p className="ml-3 text-lg font-Poppins font-[600]">
              Đơn hàng hoàn trả: {returnConfirmationOrders.length}
            </p>
            <p className="ml-3 text-lg font-Poppins font-[600]">
              Đơn hàng chờ duyệt: {pendingOrders.length}
            </p>
            <p className="ml-3 text-lg font-Poppins font-[600]">
              Đơn hàng hủy: {cancel.length}
            </p>
          </div>
          <div className="w-[25%] ml-3 mt-2 h-[15vh] rounded-2xl border-2 border-blue-500 p-2 flex justify-center flex-col">
            <p className="font-Poppins font-[600] text-lg">
              Tổng tiền các đơn hàng:{" "}
              <i className="text-blue-500">
                {formatVietnameseCurrency(totalSuccessfulOrderAmount)}
              </i>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHero;
