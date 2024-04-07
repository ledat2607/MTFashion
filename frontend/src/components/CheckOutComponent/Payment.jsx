import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { server } from "../../server";
import axios from "axios";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { MdLocationOn } from "react-icons/md";
const Payment = ({ data }) => {
  const { user } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [orderData, setOrderData] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    setOrderData(data);
  }, [data]);
  const createOrder = (data, actions) => {
    return actions.order
      ?.create({
        purchase_units: [
          {
            description: "Sunflower",
            amount: {
              currency_code: "USD",
              value: orderData?.dataProduct.total,
            },
          },
        ],
        application_context: {
          shipping_preference: "NO_SHIPPING",
        },
      })
      .then((orderID) => {
        return orderID;
      });
  };
  const order = {
    product: data?.dataProduct.data.product,
    shippingAddress: data?.dataAddress,
    user: data?.dataUser,
    totalPrice: data?.dataProduct.total,
    style: data?.dataProduct?.data.style,
  };

  const onApprove = async (data, actions) => {
    return actions.order?.capture().then(function (details) {
      const { payer } = details;

      let paymentInfo = payer;

      if (paymentInfo !== undefined) {
        paypalPaymentHandler(paymentInfo);
      }
    });
  };
  const paypalPaymentHandler = async (paymentInfo) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    order.paymentInfo = {
      id: paymentInfo.payer_id,
      status: "Thành công",
      type: "Paypal",
    };

    await axios
      .post(
        `${server}/order/create-order`,
        order,
        { withCredentials: true },
        config
      )
      .then((res) => {
        setOpen(false);
        setTimeout(() => {
          RemoveItemInCart(data?.dataProduct.data.product.product._id);
        }, 1500);
        navigate("/order/success");
        toast.success(res.data.message);
      });
  };

  const cashOnDeliveryHandler = async (e) => {
    e.preventDefault();

    order.paymentInfo = {
      type: "Thanh toán khi nhận hàng",
    };

    await axios
      .post(`${server}/order/create-order`, order, { withCredentials: true })
      .then((res) => {
        setOpen(false);
        setTimeout(() => {
          RemoveItemInCart(data?.dataProduct.data.product.product._id);
        }, 1500);
        navigate("/order/success");
        toast.success(res.data.message);
      });
  };
  function formatVietnameseCurrency(number) {
    const roundedNumber = Math.round(number / 1000) * 1000;
    const formattedNumber = roundedNumber.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });

    return formattedNumber;
  }
  const RemoveItemInCart = async (productId) => {
    try {
      await axios.delete(`${server}/user/remove_from_cart/${productId}`, {
        withCredentials: true,
      });
      toast.success("Đã xóa khỏi giỏ hàng");
    } catch (error) {
      toast.error("Lỗi khi xóa");
    }
  };
  console.log(data);
  return (
    <div className="w-full py-8 flex items-center justify-center">
      <div className="w-[90%] sm:w-[50%] mx-auto border-2 sm:flex sm:flex-col">
        <div className="w-full sm:w-[65%]">
          <PaymentInfo
            user={user}
            open={open}
            setOpen={setOpen}
            onApprove={onApprove}
            createOrder={createOrder}
            cashOnDeliveryHandler={cashOnDeliveryHandler}
          />
        </div>
        <div className="w-full h-[10vh] sm:w-[35%]">
          <CartData orderData={orderData} />
        </div>
      </div>
      <div className="w-[40%] h-[40vh] sm:mt-6">
        <div className="w-full h-[10vh] relative">
          <h1 className="absolute text-blue-500 font-Poppins text-lg font-[600] -top-3 left-4 w-fit bg-white">
            Địa chỉ nhận hàng
          </h1>
          <div className="border-2 p-5 rounded-2xl  h-[10vh] border-blue-500 w-[90%] flex justify-between items-center">
            <span>
              {data?.dataAddress?.street} - {data?.dataAddress?.town} -{" "}
              {data?.dataAddress?.provine}
            </span>

            <MdLocationOn
              size={25}
              className="flex justify-center h-full items-center text-blue-500 hover:scale-[1.2] hover:transition-transform duration-300 cursor-pointer"
            />
          </div>
        </div>
        <div className="w-full h-[40vh] relative mt-6">
          <h1 className="absolute text-blue-500 font-Poppins text-lg font-[600] -top-3 left-4 w-fit bg-white">
            Thông tin đơn hàng
          </h1>
          <div className="border-2 rounded-2xl  h-[30vh] border-blue-500 w-[90%] flex justify-center items-center">
            <div className="w-[25%]">
              <img
                src={`data:image/jpeg;base64,${
                  data?.dataProduct.data.style
                    ? data?.dataProduct.data.style.url
                    : data?.dataProduct.data.product.product.imgProduct[0].url
                }`}
                alt=""
                className="w-[150px] object-contain rounded-3xl"
              />
              <p className="text-center">
                {data?.dataProduct.data.style
                  ? data?.dataProduct.data.style.code
                  : data?.dataProduct.data.product.product.imgProduct[0].code}
              </p>
            </div>
            <div className="w-[50%] pl-4 border-r-2 border-blue-500">
              <p>
                Tên sản phẩm:{" "}
                <i className="text-blue-500 font-Poppins font-[600]">
                  {data?.dataProduct.data.product.product.productName}
                </i>
              </p>
              <p>
                Số lượng:{" "}
                <i className="text-blue-500 font-Poppins font-[600]">
                  {data?.dataProduct.data.quantity}
                </i>
              </p>
              <p>
                Size:{" "}
                <i className="text-blue-500 font-Poppins font-[600]">
                  {data?.dataProduct.data.size}
                </i>
              </p>
              <p className="flex">
                {" "}
                Giá bán:
                {data?.dataProduct.data.product.product.isOnSale.status ===
                true ? (
                  <p>
                    <i className="text-blue-500 font-Poppins font-[600]">
                      {formatVietnameseCurrency(
                        data?.dataProduct.data.product.product.isOnSale
                          .price_sale
                      )}
                    </i>
                  </p>
                ) : (
                  <p>
                    <i className="text-blue-500 font-Poppins font-[600]">
                      {data?.dataProduct.data.product.product.discountPrice}
                    </i>
                  </p>
                )}
              </p>
            </div>
            <p className="w-[20%] flex justify-center items-center">
              <i className="text-blue-500 font-Poppins font-[600]">
                {formatVietnameseCurrency(data?.dataProduct.total)}
              </i>
            </p>
          </div>
        </div>
        <img
          src="https://thietkelogo.mondial.vn/wp-content/uploads/2024/01/Mau_thiet_-ke_-logo_thuong_-hieu_paypal.jpeg"
          alt=""
          className="w-[150px] object-contain"
        />
      </div>
    </div>
  );
};

const PaymentInfo = ({
  open,
  setOpen,
  onApprove,
  createOrder,
  cashOnDeliveryHandler,
}) => {
  const [select, setSelect] = useState(1);

  return (
    <div className="w-full sm:w-[95%] bg-white rounded-md p-5 pb-8">
      {/*paypal payment*/}
      <div>
        <div className="flex w-full pb-5 border-b mb-4">
          <div
            className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
            onClick={() => setSelect(2)}
          >
            {select === 2 ? (
              <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
            ) : null}
          </div>
          <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
            Thanh toán qua Paypal
          </h4>
        </div>

        {/* pay with payement */}
        {select === 2 ? (
          <div className="w-full flex border-b">
            <div
              className="w-[150px] mb-4 !bg-[#f63b60] text-white flex justify-center items-center h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]"
              onClick={() => setOpen(true)}
            >
              Thanh toán ngay
            </div>
            {open && (
              <div className="w-full fixed top-0 left-0 bg-[#00000039] h-screen flex items-center justify-center z-[99999]">
                <div className="w-full sm:w-[35%] h-screen sm:h-[80vh] bg-white rounded-[5px] shadow flex flex-col justify-center p-8 relative">
                  <div className="w-full flex justify-end p-3">
                    <RxCross1
                      size={30}
                      className="cursor-pointer absolute top-3 right-3"
                      onClick={() => setOpen(false)}
                    />
                  </div>
                  <PayPalScriptProvider
                    options={{
                      "client-id":
                        "AbwAPAAFsRk1iuqgYVpvpvdWGjA76vwqyKjubRWzJvso8awneuf99160qcRuCCpcJJmWGIdklFXzkSv5",
                    }}
                  >
                    <PayPalButtons
                      style={{ layout: "vertical" }}
                      onApprove={onApprove}
                      createOrder={createOrder}
                      className="mt-[8vh]"
                    />
                  </PayPalScriptProvider>
                </div>
              </div>
            )}
          </div>
        ) : null}
      </div>
      {/*cash on delivery*/}
      <div className="mt-6">
        <div className="flex w-full pb-5 border-b mb-2">
          <div
            className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
            onClick={() => setSelect(3)}
          >
            {select === 3 ? (
              <div className="w-[13px] h-[13px] bg-[#1d1a1ab4] rounded-full"></div>
            ) : null}
          </div>
          <h4 className="text-[18px] pl-2 font-[600] text-[#000000ba]">
            Thanh toán khi nhận hàng
          </h4>
        </div>
        {/* cash on delivery */}
        {select === 3 ? (
          <div className="w-full flex">
            <form className="w-full" onSubmit={cashOnDeliveryHandler}>
              <input
                type="submit"
                value="Xác nhận"
                className="w-[110px] mx-auto !bg-[#f63b60] !text-[#fff] h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]"
              />
            </form>
          </div>
        ) : null}
      </div>
    </div>
  );
};
const CartData = ({ orderData }) => {
  function formatVietnameseCurrency(number) {
    // Chia cho 1000 và làm tròn xuống để lấy phần nguyên
    let formattedNumber = Math.floor(number / 1000);

    // Nhân lại cho 1000 để có giá trị mong muốn
    formattedNumber *= 1000;

    // Sử dụng hàm toLocaleString để định dạng số theo ngôn ngữ và định dạng của Việt Nam
    let result = formattedNumber.toLocaleString("vi-VN");

    return result;
  }

  return (
    <div className="w-full bg-[#fff] rounded-md flex justify-center items-center shadow-2xl">
      <div className="w-full h-[10vh] flex justify-center items-center">
        <div>
          {" "}
          <h3 className="text-[16px] font-[400] text-[#000000a4]">
            Tổng tiền thanh toán:
          </h3>
          <h5 className="text-[18px] font-[600]">
            {formatVietnameseCurrency(orderData?.dataProduct.total)}
          </h5>
        </div>
      </div>

      <br />
    </div>
  );
};
export default Payment;
