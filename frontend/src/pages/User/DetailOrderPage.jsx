import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { server } from "../../server";
import { MdLocationOn } from "react-icons/md";
import Shipping from "../../components/animations/Shipping";
import ShipSuccess from "../../components/animations/shipSuccess";
import { FaStar } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { useSelector } from "react-redux";
const DetailOrderPage = () => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const { item, isAdmin } = location.state;
  const [status, setStatus] = useState(
    item && item?.status ? item.status : "Chờ duyệt"
  );

  const [openCmt, setOpenCmt] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [images, setImages] = useState([]);
  const [currentUser, setCurrentUser] = useState(null); // Thêm state để lưu thông tin user hiện tại

  // Lọc thông tin user nếu id trùng khớp với user hiện tại
  useEffect(() => {
    if (user && item?.user?.id === user._id) {
      setCurrentUser(user);
    }
  }, [user, item]);
  const handleClick = (value) => {
    setRating(value);
  };
  function formatVietnameseCurrency(number) {
    const roundedNumber = Math.round(number / 1000) * 1000;
    const formattedNumber = roundedNumber.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
    return formattedNumber;
  }
  const handleImageChange = (event) => {
    const files = event.target.files;
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result;
      setImages((prevImages) => [...prevImages, base64String]);
    };
    reader.readAsDataURL(files[0]);
  };

  const options = [
    "Chờ duyệt",
    "Đã duyệt",
    "Đang chuẩn bị hàng",
    "Đang giao hàng",
    "Giao hàng thành công",
  ];
  const optionRefund = ["Chờ duyệt", "Xác nhận hoàn trả"];
  const handleUpdateStatus = async () => {
    await axios
      .put(
        `${server}/order/update-status-order`,
        {
          id: item?._id,
          status,
          productId: item?.product.productId,
          amount: item?.totalPrice,
          userId: item?.user?.id,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res?.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  const handleComment = async (productId) => {
    const imagesWithUrls = images.map((image) => {
      return { url: image };
    });

    axios
      .post(
        `${server}/product/add-comment`,
        {
          productId,
          comment,
          rating,
          images: imagesWithUrls,
          orderId: item?._id,
          userId: item?.user.id,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message);
        setImages([]);
        setComment("");
        setRating(5);
        setOpenCmt(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const handleDeleteImg = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };
  console.log(item);
  return (
    <div
      className="w-full h-[100vh] flex justify-center items-center"
      style={{
        background:
          "linear-gradient(to top right, #FFCDB2 , #B6C0C5, #CBE7E3, #9EBAF3 ,#FFFCCE)",
      }}
    >
      <div className="w-[50%] xl:h-[80%] sm:h-[85%] rounded-2xl mx-auto flex flex-col bg-white">
        <h1 className="text-center font-[600] font-Poppins uppercase mt-6">
          Thông tin chi tiết đơn hàng
        </h1>
        <div className="w-[90%] mt-6 mx-auto border-2 rounded-2xl flex flex-col">
          <div className="w-full flex justify-between items-center bg-teal-500/80 rounded-t-2xl">
            <h1 className="w-[50%] p-4 font-[600] font-Poppins">
              Mã đơn hàng:
              <i className="font-[600] font-Poppins text-white">#{item?._id}</i>
            </h1>
            <h1 className="pr-2">
              Trạng thái đơn hàng:{" "}
              <p className="font-Poppins font-[500] text-white">
                {item?.status}
              </p>
            </h1>
          </div>
          <div className="w-full flex items-center mt-2">
            <div className="w-[35%] flex flex-col justify-center items-center">
              <img
                src={`data:image/jpeg;base64,${item?.style.url}`}
                alt=""
                className="w-[150px] h-[150px] object-cover rounded-2xl"
              />
              <p className="font-[600] font-Poppins text-lg">
                {item?.style.code} - {item?.product.size}
              </p>
            </div>
            <div className="w-[50%] h-[40px] flex justify-center items-center border-r-2 border-blue-500">
              {item?.product.product.isOnSale.status === true ? (
                <p>
                  {formatVietnameseCurrency(
                    item?.product.product.isOnSale.price_sale
                  )}{" "}
                  x
                </p>
              ) : (
                <p>
                  {item?.product.product.discountPrice}{" "}
                  <i className="ml-4 text-blue-500 text-lg">x</i>
                </p>
              )}
              <p className="ml-4 text-lg font-Poppins">
                {item?.product.quantity}
              </p>
            </div>
            <span className="w-[15%] ml-8">
              <i className="text-blue-500 font-Poppins text-lg font-[600]">
                Tổng tiền:
              </i>{" "}
              {formatVietnameseCurrency(item?.totalPrice)}
            </span>
          </div>
        </div>
        <div className="w-[90%] rounded-2xl h-[12vh] flex mt-2 mx-auto border-2 border-blue-500">
          <div className="w-[50%] border-r-2 h-[12vh] p-2 border-blue-500">
            <p className="text-lg font-[600] font-Poppins">Địa chỉ nhận hàng</p>
            <p className="text-blue-500 font-[500] font-Roboto">
              {item?.shippingAddress?.street} - {item?.shippingAddress?.town} -{" "}
              {item?.shippingAddress?.provine}
            </p>
          </div>
          <div className="w-[50%] h-[10vh] p-2">
            <p className="text-lg font-[600] font-Poppins">
              Phương thức thanh toán
            </p>
            <p className="flex">
              Hình thức:
              <p className="text-blue-500 ml-2 font-[500] font-Roboto">
                {item?.paymentInfo.type}
              </p>
            </p>
            <p className="flex">
              Trạng thái:
              <p className="text-blue-500 ml-2 font-[500] font-Roboto">
                {item?.paymentInfo.status
                  ? item?.paymentInfo.status
                  : "Chờ thanh toán"}
              </p>
            </p>
          </div>
        </div>
        <div className="w-[90%] mx-auto sm:mt-4 flex justify-center items-center">
          <img
            src={`data:image/jpeg;base64,${currentUser?.avatar}`}
            alt=""
            className="w-[100px] h-[100px] rounded-full"
          />
          <div className="flex flex-col ml-2">
            <p className="text-lg font-Poppins">
              {currentUser?.surName} {currentUser?.name}
            </p>
            <p className="text-lg font-Poppins">{currentUser?.email}</p>
            <p className="text-lg font-Poppins">0{currentUser?.phoneNumber}</p>
          </div>
        </div>
        {isAdmin === true ? (
          <>
            {item?.status !== "Hoàn trả" ? (
              <div className="w-[80%] mx-auto mt-6 flex justify-center items-center">
                <select
                  value={status}
                  className="w-[200px] h-[45px] border-2 border-gray-500 rounded-2xl p-2"
                  onChange={(event) => {
                    setStatus(event.target.value);
                  }}
                >
                  {options.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <div
                  onClick={handleUpdateStatus}
                  className={`${
                    item?.status === "Giao hàng thành công" ? "hidden" : "block"
                  } w-[100px] cursor-pointer hover:translate-x-4 transition-transform duration-300 h-[40px] ml-2 text-white text-lg font-Poppins font-[600] rounded-2xl bg-blue-500 flex justify-center items-center`}
                >
                  Cập nhật
                </div>
              </div>
            ) : (
              <div className="w-[80%] mx-auto mt-6 flex justify-center items-center">
                <select
                  value={status}
                  className="w-[200px] h-[45px] border-2 border-gray-500 rounded-2xl p-2"
                  onChange={(event) => {
                    setStatus(event.target.value);
                  }}
                >
                  {optionRefund.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <div
                  onClick={handleUpdateStatus}
                  className={`${
                    item?.status === "Giao hàng thành công" ? "hidden" : "block"
                  } w-[100px] cursor-pointer hover:translate-x-4 transition-transform duration-300 h-[40px] ml-2 text-white text-lg font-Poppins font-[600] rounded-2xl bg-blue-500 flex justify-center items-center`}
                >
                  Cập nhật
                </div>
              </div>
            )}
          </>
        ) : (
          <div
            className={`${
              item?.status === "Đã hủy" || item?.status === "Hoàn trả"
                ? "hidden"
                : "block"
            } w-[90%] mx-auto mt-12`}
          >
            <div className="bg-red-500 rounded-3xl h-[5px] w-full flex relative">
              <div className="absolute bottom-1">
                <p>Chờ duyệt</p>
                <MdLocationOn
                  className={`${
                    item?.status === "Chờ duyệt"
                      ? "text-xl text-red-500"
                      : "text-md"
                  } `}
                />
              </div>
              <div
                className={`absolute bottom-1 ${
                  item?.status === "Chờ duyệt"
                    ? "left-[10%]"
                    : item?.status === "Đã duyệt"
                    ? "left-[28%]"
                    : item?.status === "Chuẩn bị hàng"
                    ? "left-[60%]"
                    : item?.status === "Đang giao hàng"
                    ? "right-[10%]"
                    : item?.status === "Giao hàng thành công"
                    ? "-right-[4%]"
                    : ""
                }`}
              >
                <Shipping />
              </div>
              <div className="absolute bottom-1 left-[20%]">
                <p>Đã duyệt</p>
                <MdLocationOn
                  className={`${
                    item?.status === "Đã duyệt"
                      ? "text-xl text-red-500"
                      : "text-md"
                  } `}
                />
              </div>
              <div className="absolute bottom-1 left-[40%]">
                <p>Chuẩn bị hàng</p>
                <MdLocationOn
                  className={`${
                    item?.status === "Đang chuẩn bị hàng"
                      ? "text-xl text-red-500"
                      : "text-md"
                  } `}
                />
              </div>
              <div className="absolute bottom-1 right-[15%]">
                <p>Đang giao hàng</p>
                <MdLocationOn
                  className={`${
                    item?.status === "Đang giao hàng"
                      ? "text-xl text-red-500"
                      : "text-md"
                  } `}
                />
              </div>
              <div className="absolute bottom-1 right-0 flex flex-col justify-center items-center">
                <ShipSuccess />
                <MdLocationOn
                  className={`${
                    item?.status === "Giao hàng thành công"
                      ? "text-xl text-red-500"
                      : "text-md"
                  } `}
                />
              </div>
            </div>
            <div>
              {item?.status === "Giao hàng thành công" ? (
                <div className="w-full mt-8 flex justify-center items-center">
                  <div
                    onClick={() => setOpenCmt(true)}
                    className={`${
                      item?.isComment === true ? "hidden" : "block"
                    } w-[100px] bg-orange-400 rounded-2xl ml-4 text-white font-[600] font-Poppins cursor-pointer hover:w-[150px] transition-all duration-300 h-[40px] flex justify-center items-center bg-blue`}
                  >
                    Bình luận
                  </div>
                  {openCmt ? (
                    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-[100]">
                      <div className="bg-white rounded-md sm:h-[65vh] h-fit sm:w-[35%] w-[90%]">
                        <h1 className="font-[600] text-lg font-Poppins text-center mt-2">
                          Bình luận sản phẩm
                        </h1>
                        {/*Body*/}
                        <div className="h-[50vh]">
                          <div className="w-[90%] mx-auto">
                            <label
                              htmlFor="upload-button"
                              className="cursor-pointer inline-block w-24 px-2 py-1 rounded-lg bg-blue-500 text-white text-center"
                            >
                              Chọn hình
                            </label>
                            <input
                              id="upload-button"
                              type="file"
                              accept="image/*"
                              onChange={handleImageChange}
                              multiple
                              className="hidden"
                            />
                          </div>

                          <div className="w-[90%] h-[15vh] border-2 border-blue-500 rounded-2xl mx-auto mt-4">
                            <div className="w-[90%] mx-auto mt-4 flex">
                              {images.map((image, index) => (
                                <div
                                  key={index}
                                  className="h-[100px] mb-4 relative"
                                >
                                  <img
                                    src={image}
                                    alt=""
                                    className="w-[100px] rounded-2xl h-[100px] object-cover ml-4"
                                  />
                                  <div
                                    onClick={() => handleDeleteImg(index)}
                                    className="cursor-pointer hover:scale-[1.2] transition-transform duration-300 w-[25px] h-[25px] flex justify-center items-center rounded-full bg-blue-500 absolute -top-1 -right-1"
                                  >
                                    <RxCross1 className="text-white" />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="w-[90%] mx-auto h-[15vh] mt-2">
                            <textarea
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                              className="w-full h-full border-2 p-2 rounded-2xl"
                              placeholder="Cảm nhận của bạn về sản phẩm"
                            />
                          </div>
                          <div className="w-[90%] h-[10vh] mx-auto flex flex-col mt-4">
                            <p className="font-Poppins font-[600] text-lg">
                              Mức độ hài lòng
                            </p>
                            <div className="flex">
                              {[...Array(5)].map((_, index) => {
                                const ratingValue = index + 1;
                                return (
                                  <FaStar
                                    size={25}
                                    key={index}
                                    className={
                                      ratingValue <= rating
                                        ? "text-yellow-500"
                                        : ""
                                    }
                                    onClick={() => handleClick(ratingValue)}
                                  />
                                );
                              })}
                            </div>
                          </div>
                        </div>
                        <div className="w-full h-[10vh] justify-center items-center flex">
                          <div
                            onClick={() => setOpenCmt(false)}
                            className="w-[100px] cursor-pointer rounded-2xl flex justify-center items-center h-[40px] bg-red-500"
                          >
                            Đóng
                          </div>
                          <div
                            onClick={() =>
                              handleComment(item?.product?.productId)
                            }
                            className="w-[100px] cursor-pointer ml-4 rounded-2xl flex justify-center items-center h-[40px] bg-blue-500"
                          >
                            Xác nhận
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailOrderPage;
