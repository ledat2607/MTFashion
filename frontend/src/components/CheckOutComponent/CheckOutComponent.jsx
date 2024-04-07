import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { addDays, format } from "date-fns";
import { MdOutlineDiscount } from "react-icons/md";
import { FaCopy } from "react-icons/fa";
import copy from "clipboard-copy";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const CheckOutComponent = ({ data }) => {
  const navigate = useNavigate();
  const [town, setTown] = useState("");
  const [street, setStreet] = useState("");
  const [provine, setProvine] = useState("");
  const [selectedAdd, setSelectedAdd] = useState("");
  const { user } = useSelector((state) => state.user);
  const [discountCodes, setDiscountCodes] = useState([]);
  const [shippingFee, setShippingFee] = useState("");
  const [total, setTotal] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedCode, setSelectedCode] = useState("");
  const [reduce, setReduce] = useState(0);
  const [appliedCodes, setAppliedCodes] = useState([]);
  const handleSelectAddressType = (value) => {
    setSelectedAdd(value);
    const selectedAddress = user.addresses.find(
      (address) => address.addressType === value
    );
    if (selectedAddress) {
      setStreet(selectedAddress.street);
      setTown(selectedAddress.town);
      setProvine(selectedAddress.provine);
    } else {
      // Nếu không tìm thấy địa chỉ, reset thông tin
      setStreet("");
      setTown("");
      setProvine("");
    }
  };
  //shipping fee
  useEffect(() => {
    data?.price < 1000000
      ? setShippingFee(0)
      : 1000000 < data?.price < 5000000
      ? setShippingFee(25000)
      : setShippingFee(data?.price * 0.005);
  }, [data?.price]);

  function formatVietnameseCurrency(number) {
    const roundedNumber = Math.round(number / 1000) * 1000;
    const formattedNumber = roundedNumber.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });

    return formattedNumber;
  }
  // Tính toán ngày giao hàng dự kiến
  const today = new Date();
  const estimatedDeliveryDate = addDays(today, 5);
  const formattedDeliveryDate = format(estimatedDeliveryDate, "dd/MM/yyyy");
  useEffect(() => {
    // Lọc ra các mã khuyến mãi của user
    const filteredDiscountCodes = user.discountCode?.filter((userCode) =>
      data?.product?.product?.discountCode?.some(
        (productCode) => productCode.code === userCode.code
      )
    );
    setDiscountCodes(filteredDiscountCodes);
  }, [data?.product?.product?.discountCode, user.discountCode]);
  const handleOpenDiscountCode = () => {
    setOpen(!open);
  };
  const handleCopy = async (code) => {
    try {
      await copy(code); // Use clipboard-copy to copy the discount code
      toast.success("Đã sao chép thành công:", code);
      setTimeout(() => {
        setOpen(false);
      }, 1000);
    } catch (error) {
      console.error("Sao chép thất bại:", error);
    }
  };
  const handleChangeCode = (e) => {
    setSelectedCode(e.target.value);
  };
  const handleApplyDiscountCode = () => {
    const appliedCode = discountCodes.find(
      (code) => code.code === selectedCode
    );
    if (appliedCode && !appliedCodes.includes(selectedCode)) {
      const appliedDiscount = {
        code: appliedCode.code,
        type: appliedCode.type,
        value: appliedCode.value,
        dateExp: appliedCode.dateExp,
      };

      if (appliedDiscount.type === "ship") {
        // Giảm phí vận chuyển
        let discountedAmount;
        if (appliedDiscount.value <= 100) {
          discountedAmount = shippingFee * (appliedDiscount.value / 100);
        } else {
          discountedAmount = appliedDiscount.value;
        }
        setShippingFee((prevShippingFee) => prevShippingFee - discountedAmount);
        setReduce((prevReduce) => prevReduce + discountedAmount); // Cập nhật giảm giá
        setSelectedCode("");
      } else if (appliedDiscount.type === "total") {
        // Giảm tổng đơn hàng
        let totalBeforeDiscount = data?.price + shippingFee;
        let discountedAmount;
        if (appliedDiscount.value <= 100) {
          discountedAmount =
            totalBeforeDiscount * (appliedDiscount.value / 100);
        } else {
          discountedAmount = appliedDiscount.value;
        }
        setReduce((prevReduce) => prevReduce + discountedAmount); // Cập nhật giảm giá
        setSelectedCode("");
      }

      // Cập nhật mã code đã áp dụng
      setAppliedCodes((prevAppliedCodes) => [
        ...prevAppliedCodes,
        selectedCode,
      ]);
    } else {
      toast.warning(
        "Mã khuyến mãi không hợp lệ hoặc đã được áp dụng trước đó!"
      );
    }
  };
  const handleConfirm = () => {
    const dataUser = {
      surName: user?.surName,
      name: user?.name,
      email: user?.email,
      phoneNumber: user?.phoneNumber,
      avatar: user?.avatar,
      id: user?._id,
    };
    const dataAddress = {
      street: street,
      town: town,
      provine: provine,
    };
    const dataProduct = {
      data,
      total,
      shippingFee,
    };
    if (street === "" || town === "" || provine === "") {
      toast.error("Vui lòng điền đầy đủ địa chỉ giao hàng !!");
    } else {
      navigate("/payment", {
        state: { dataUser, dataAddress, dataProduct },
      });
    }
  };
  useEffect(() => {
    setTotal(data?.price + shippingFee - reduce);
  }, [data?.price, shippingFee, reduce]);

  return (
    <div className="w-full sm:mt-[5%] h-[100vh]">
      <div className="h-[75vh]  w-[80%] mx-auto flex justify-between">
        <div className="w-[50%] h-full">
          <div className="w-[90%] h-[50%] mb-6 border-2 rounded-2xl border-blue-500 mx-auto flex flex-col ">
            <h1 className="text-blue-500 text-lg font-Poppins font-[600] uppercase -mt-3 ml-4 w-fit bg-white">
              Thông tin người dùng
            </h1>
            <img
              src={`data:image/jpeg;base64,${user?.avatar}`}
              alt=""
              className="w-[150px] h-[150px] rounded-full mx-auto mt-2"
            />
            <span className="text-center font-Poppins font-[500] mt-4 text-lg">
              {user?.userName}
            </span>
            <span className="text-center font-Poppins font-[500] mt-4 text-lg">
              {user?.surName} {user?.name}
            </span>
            <span className="text-center font-Poppins font-[500] mt-4 text-lg">
              {user?.email}
            </span>
          </div>
          <div className="w-[90%] h-[34%] border-2 rounded-2xl border-blue-500 mx-auto flex flex-col relative">
            <h1 className="text-blue-500 text-lg font-Poppins font-[600] uppercase -mt-3 ml-4  w-fit bg-white">
              Thông tin giao hàng
            </h1>
            <div className="w-full h-full p-4">
              <div className="w-full flex">
                <input
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className="w-[48%] h-[40px] rounded-2xl border-2 p-2"
                  placeholder="Số nhà, tên đường,..."
                />
                <input
                  value={town}
                  onChange={(e) => setTown(e.target.value)}
                  className="w-[48%] sm:ml-6 h-[40px] rounded-2xl border-2 p-2"
                  placeholder="Quận/huyện..."
                />
              </div>
              <div className="w-full flex sm:mt-4">
                <input
                  value={provine}
                  onChange={(e) => setProvine(e.target.value)}
                  className="w-[48%] h-[40px] rounded-2xl border-2 p-2"
                  placeholder="Tỉnh/thành phố..."
                />
                <input
                  value={"0" + user?.phoneNumber}
                  className="w-[48%] sm:ml-6 h-[40px] rounded-2xl border-2 p-2"
                  placeholder="Số điện thoại..."
                />
              </div>
              <div className="w-full flex justify-between sm:mt-4">
                <input
                  value="Việt Nam"
                  className="w-[48%] h-[40px] rounded-2xl border-2 p-2"
                />
                <select
                  value={selectedAdd}
                  onChange={(e) => handleSelectAddressType(e.target.value)}
                  className="w-[48%] h-[40px] border-2 rounded-2xl"
                >
                  <option value="Chọn vị trí">Chọn vị trí</option>
                  {user &&
                    user.addresses.map((item, index) => (
                      <option key={index} value={item?.addressType}>
                        {item?.addressType}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="w-[50%] h-[75vh] border-2 rounded-2xl border-blue-500">
          <h1 className="text-blue-500 text-lg font-Poppins font-[600] uppercase -mt-3 ml-4 w-fit bg-white">
            Thông tin đơn hàng
          </h1>
          <div className="w-full flex justify-center items-center">
            <div className="w-[35%] flex flex-col sm:mt-4">
              {data?.style ? (
                <>
                  <img
                    src={`data:image/jpeg;base64,${data?.style.url}`}
                    alt=""
                    className="w-[150px] object-contain mx-auto rounded-2xl"
                  />
                  <span className="font-[600] font-Poppins text-center">
                    {data?.style.code}
                  </span>
                </>
              ) : (
                <>
                  <img
                    src={`data:image/jpeg;base64,${data?.product.product.imgProduct[0].url}`}
                    alt=""
                    className="w-[150px] object-contain mx-auto rounded-2xl"
                  />
                  <span className="font-[600] font-Poppins text-center">
                    {data?.product.product.imgProduct[0].code}
                  </span>
                </>
              )}
            </div>
            <div className="w-[35%] h-[10vh] justify-center items-center flex border-r-4 border-blue-500 p-4">
              <span>
                {data?.product?.isOnSale?.status === true ? (
                  <div className="flex justify-center items-center">
                    {formatVietnameseCurrency(
                      data?.product?.product.isOnSale?.price_sale
                    )}{" "}
                    x
                  </div>
                ) : (
                  <div>{data?.product?.product?.discountPrice} x </div>
                )}
              </span>
              <span className="ml-4">{data?.quantity}</span>
            </div>
            <div className="w-[30%] flex justify-center items-center flex-col">
              <h1 className="font-[600] font-Poppins">Tổng tiền hàng</h1>
              {formatVietnameseCurrency(data?.price)}
            </div>
          </div>
          <div className="w-full p-4 flex">
            <div className="w-[50%]">
              <p className="font-[600] font-Poppins">Tên sản phẩm</p>
              <input
                readOnly
                className="w-[70%] h-[40px] rounded-2xl border-2 p-4 mt-2"
                value={data?.product?.product.productName}
              />
            </div>
            <div className="w-[50%]">
              <p className="font-[600] font-Poppins">Size đã đặt</p>
              <input
                readOnly
                className="w-[100px] h-[40px] rounded-2xl border-2 p-4 mt-2"
                value={data?.size}
              />
            </div>
          </div>
          <div className="w-full p-4 flex">
            <div className="w-[50%]">
              <p className="font-[600] font-Poppins">Phí vận chuyển</p>
              <p>{formatVietnameseCurrency(shippingFee)}</p>
            </div>
            <div className="w-[50%]">
              <p className="font-[600] font-Poppins">
                Thời gian giao hàng <i>(Dự kiến)</i>
              </p>
              <i>{formattedDeliveryDate}</i>
            </div>
          </div>
          <div className="w-[100%] border-2 mx-auto"></div>
          <div className="w-[90%] h-[5vh] flex flex-col sm:mt-4 mx-auto">
            <div className="w-full flex">
              <p className="text-lg font-[600]  font-Poppins w-[150px]">
                Tổng tiền hàng:
              </p>
              <p className="ml-4 text-blue-500 font-[600]">
                {formatVietnameseCurrency(data?.price)}
              </p>
            </div>
            <div className="w-full flex">
              <p className="text-lg font-[600]  font-Poppins w-[150px]">
                Tổng tiền ship:
              </p>
              <p className="ml-4 text-blue-500 font-[600]">
                {formatVietnameseCurrency(shippingFee)}
              </p>
            </div>
            <div className="w-full h-full flex items-center">
              <div className="w-[40%] flex">
                <p className="text-lg font-[600]  font-Poppins w-[150px]">
                  Mã khuyến mãi:
                </p>
                <p className="ml-4 text-blue-500 font-[600]">
                  {formatVietnameseCurrency(reduce)}
                </p>
              </div>
              <div className="w-[60%] flex justify-center items-center h-full">
                <input
                  value={selectedCode}
                  onChange={handleChangeCode}
                  className="w-[60%] h-[40px] rounded-2xl border-2 p-2"
                  placeholder="Mã khuyến mãi..."
                />
                <div
                  onClick={handleApplyDiscountCode}
                  className="bg-blue-500 rounded-2xl cursor-pointer ml-3 w-[80px] h-[40px] flex justify-center items-center"
                >
                  Áp dụng
                </div>
                <MdOutlineDiscount
                  size={20}
                  className="cursor-pointer ml-2"
                  onClick={handleOpenDiscountCode}
                />

                {open ? (
                  <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-[100]">
                    <div className="bg-white rounded-md sm:h-[70vh] h-fit sm:w-[35%] w-[90%]">
                      <h1 className="font-[600] font-Poppins text-lg text-center uppercase sm:mt-4">
                        Danh sách mã khuyến mãi
                      </h1>
                      {discountCodes?.length ? (
                        <div className="w-full h-[55vh]">
                          {discountCodes?.map((item, index) => (
                            <div
                              key={index}
                              className="w-[90%] h-[15vh] flex border-2 mx-auto"
                            >
                              <img
                                src="https://wearechain.co.uk/wp-content/uploads/2022/06/Discount-Codes-Ideas.png"
                                alt=""
                                className="w-[120px] object-contain"
                              />

                              <div className="w-[50%] h-full flex justify-center items-center">
                                <div className="w-full h-full flex sm:flex-col justify-center">
                                  <span className="flex">
                                    Mã code:{" "}
                                    <i className="text-blue-500 ml-4">
                                      {item?.code}
                                    </i>
                                  </span>
                                  <p className="mt-2">
                                    {item?.type === "ship"
                                      ? `Giảm ${
                                          item?.value > 100
                                            ? formatVietnameseCurrency(
                                                item?.value
                                              )
                                            : item?.value + "%"
                                        } tổng phí vận chuyển`
                                      : `Giảm ${
                                          item?.value > 100
                                            ? formatVietnameseCurrency(
                                                item?.value
                                              )
                                            : item?.value + "%"
                                        } tổng đơn hàng`}
                                  </p>
                                  <p className="mt-2">
                                    Ngày hết hiệu lực:{" "}
                                    <i className="text-blue-500">
                                      {item?.dateExp.slice(8, 10)}/
                                      {item?.dateExp.slice(5, 7)}/
                                      {item?.dateExp.slice(0, 4)}
                                    </i>
                                  </p>
                                </div>
                                <FaCopy
                                  onClick={() => handleCopy(item?.code)}
                                  size={20}
                                  className="ml-2 cursor-pointer hover:scale-[1.2] hover:text-yellow-500/50 transition-transform duration-300"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="w-full h-[55vh] flex justify-center items-center">
                          <p>Không có mã khuyến mãi phù hợp với sản phẩm này</p>
                        </div>
                      )}
                      <div
                        onClick={() => setOpen(false)}
                        className="w-[150px] cursor-pointer flex justify-center items-center rounded-2xl h-[40px] bg-blue-500 mx-auto"
                      >
                        <p>Đóng</p>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="w-[55%] mt-4 border-t-2 border-black h-[30px]">
              <p className="font-[600] mt-2 font-Poppins text-lg">
                Tổng tiền thanh toán:{" "}
                <i className="text-blue-500">
                  {formatVietnameseCurrency(total)}
                </i>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        onClick={handleConfirm}
        className="w-[80%] sm:mt-6 cursor-pointer hover:translate-x-2 transition-transform duration-300 mx-auto flex justify-center items-center"
      >
        <p className="w-[100px] h-[40px] flex justify-center items-center bg-blue-500 font-[600] text-white rounded-2xl">
          Xác nhận
        </p>
      </div>
    </div>
  );
};

export default CheckOutComponent;
