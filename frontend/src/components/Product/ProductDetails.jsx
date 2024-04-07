import React, { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import size from "../../assets/theo kg.jpg";
import size_man from "../../assets/size-nam.png";
import { toast } from "react-toastify";
import { IoIosStar } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { server } from "../../server";
import { useSelector } from "react-redux";
import { BsChatText } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const ProductDetails = ({ data }) => {
  const { user } = useSelector((state) => state.user);
  const { admin } = useSelector((state) => state.admin);
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [count, setCount] = useState(1);
  const [openViewSite, setOpenViewSite] = useState(false);
  const [addToCart, setAddToCart] = useState(false);
  const [selected_image_addToCart, setSelectedImageAddToCart] = useState(0);
  const navigate = useNavigate();
  //expand description
  const [expandedDescription, setExpandedDescription] = useState(false);
  const sizes = data?.size;
  const sizeArray = sizes?.split(", ");
  const toggleDescriptionExpansion = () => {
    setExpandedDescription(!expandedDescription);
  };

  const handleStyleSelection = (index) => {
    setSelectedStyle(data.imgProduct[index]);
  };

  const handleSizeSelection = (index) => {
    const newSize = sizeArray[index];

    if (selectedSize === newSize) {
      setSelectedSize(null);
    } else {
      setSelectedSize(newSize);
    }
  };

  const openAddToCart = () => {
    setAddToCart(!addToCart);
  };

  const decrementCount = () => {
    setCount((prevCount) => Math.max(prevCount - 1, 1));
  };

  const incrementCount = () => {
    if (count < data.stock) {
      setCount((prevCount) => prevCount + 1);
    }
  };
  const [selected_image, setSelectedImage] = useState(0);
  const close = () => {
    setAddToCart(!addToCart);
    setSelectedSize(null);
    setSelectedStyle(null);
    setCount(1);
  };
  const handAddToCart = async (productId) => {
    if (selectedSize === null) {
      toast.error(`Vui lòng chọn size`);
    }
    console.log(selectedSize, selectedStyle);
    if (selectedStyle === null) {
      toast.error(`Vui lòng chọn kiểu dáng`);
    }
    await axios
      .post(
        `${server}/user/add_to_cart`,
        {
          id: productId,
          quantity: count,
          size: selectedSize,
          style: selectedStyle,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message);
        setTimeout(() => {
          setAddToCart(false);
          setSelectedSize(null);
          setSelectedStyle(null);
          setCount(1);
          window.location.reload(true);
        }, 1500);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  const handleChat = async () => {
    const groupId = data?._id + user?._id;
    const senderId = user?._id;
    const receivedId = admin?._id;
    await axios
      .post(`${server}/conversation/create-conversation`, {
        groupId,
        senderId,
        receivedId,
      })
      .then((res) => {
        if (res.data.success === true) {
          navigate("/chat", {
            state: { senderId, receivedId },
          });
        }
      });
  };
  return (
    <div className="h-full w-full mx-auto pb-8">
      <div className="bg-gradient-to-r from-gray-200 via-teal-200 to-gray-300/20 rounded-3xl w-[95%] sm:h-[100vh] h-full mx-auto mt-4">
        {data ? (
          <div className="w-full sm:h-[60vh] h-fit sm:flex justify-between">
            <div className="sm:w-[45%] w-[80%] mx-auto sm:mt-6 p-2 sm:h-full flex items-center flex-col">
              <img
                src={`data:image/jpeg;base64,${data?.imgProduct[selected_image]?.url}`}
                alt=""
                className="rounded-2xl sm:h-[60vh] h-[50vh] object-contain"
              />
              <div className="sm:mt-4 flex justify-center items-center  w-full h-[20vh]">
                {data.imgProduct?.map((i, index) => (
                  <img
                    key={index}
                    src={`data:image/jpeg;base64,${i?.url}`}
                    alt=""
                    className={`${
                      selected_image === index ? "border-2 border-red-500" : ""
                    } rounded-lg h-[18vh] cursor-pointer hover:scale-[1.1] duration-300 p-1 object-contain`}
                    onClick={() => setSelectedImage(index)}
                  />
                ))}
              </div>
            </div>
            <div className="sm:w-[45%] w-[90%] mx-auto sm:mt-6 mt-2">
              <span className="sm:text-2xl uppercase font-[600] font-Poppins">
                {data?.productName}
              </span>
              <div
                className={`sm:mt-6 mt-2 w-full sm:text-xl font-Roboto ${
                  expandedDescription ? "h-[85%]" : "h-[20vh]"
                }`}
              >
                <span className="text-xl font-[600] font-Poppins uppercase">
                  Mô tả sản phẩm
                </span>
                <p
                  className={`mt-4 ${
                    expandedDescription ? "h-[90%]" : "overflow-hidden h-[80%]"
                  }`}
                >
                  {data?.descriptions}
                </p>
                {!expandedDescription ? (
                  <span
                    className="text-teal-500 text-md cursor-pointer mt-2"
                    onClick={toggleDescriptionExpansion}
                  >
                    Xem thêm
                  </span>
                ) : (
                  <span
                    className="text-red-500 text-md cursor-pointer mt-2"
                    onClick={toggleDescriptionExpansion}
                  >
                    Đóng
                  </span>
                )}
              </div>
              <div className="w-full flex flex-col mt-[8%]">
                <span className="text-xl font-[600] font-Poppins uppercase">
                  Đánh giá <i>({data?.comment.length})</i>
                </span>
                <div className="sm:w-[80%] w-full flex justify-center items-center">
                  <div className="w-[70%]  h-1 bg-gray-300 rounded-md overflow-hidden">
                    <div
                      className="h-full bg-green-500"
                      style={{ width: `${(data?.rating_avg / 5) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex w-[30%]">
                    <span className="ml-2">({data?.rating_avg}/5)</span>
                    <span className="sm:ml-8">Đã bán: {data?.sold_out}</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-xl font-Poppins uppercase font-[600]">
                Chất liệu
              </div>
              <div className="w-full flex">{data?.material}</div>
              <div className="sm:mt-2 mt-8 justify-between pr-3 sm:pb-0 pb-4">
                <div className="w-full flex justify-center items-center">
                  <div
                    onClick={openAddToCart}
                    className="sm:w-[40%] w-[80%] cursor-pointer hover:translate-x-2 duration-300 hover:bg-gray-500 hover:text-white bg-white rounded-xl text-black sm:text-xl font-DM hover:shadow hover:shadow-teal-500/80  h-[40px] mt-8 flex justify-center items-center"
                  >
                    Thêm vào giỏ hàng
                  </div>
                  <div
                    onClick={handleChat}
                    className="sm:w-[120px] w-[80%] ml-4 cursor-pointer hover:translate-x-2 duration-300 hover:bg-gray-500 hover:text-white bg-white rounded-xl text-black sm:text-xl font-DM hover:shadow hover:shadow-teal-500/80  h-[40px] mt-8 flex justify-center items-center"
                  >
                    Chat
                    <BsChatText className="ml-2" />
                  </div>
                  {addToCart ? (
                    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-[100]">
                      <div className="bg-white rounded-md sm:h-[70vh] h-fit sm:w-[45%] w-[90%]">
                        <div className="sm:h-[90%] h-[88%] sm:flex sm:justify-center sm:items-center">
                          <div className="w-full sm:w-[50%] flex flex-col justify-center items-center">
                            <img
                              src={`data:image/jpeg;base64,${data.imgProduct[selected_image_addToCart].url}`}
                              alt=""
                              className="rounded-2xl mt-4 sm:h-[40vh] w-[90%] object-cover"
                            />
                            <div className="flex justify-center items-center w-[30%] mt-4">
                              {data?.imgProduct?.map((i, index) => (
                                <img
                                  key={index}
                                  src={`data:image/jpeg;base64,${i.url}`}
                                  alt=""
                                  className={`${
                                    selected_image_addToCart === index
                                      ? "border-2 border-red-500"
                                      : ""
                                  } rounded-lg h-[10vh] cursor-pointer hover:scale-[1.1] duration-300 p-1 object-contain`}
                                  onClick={() =>
                                    setSelectedImageAddToCart(index)
                                  }
                                />
                              ))}
                            </div>
                          </div>
                          <div className="sm:w-[45%] mt-2 sm:mt-0 w-[90%] mx-auto border-2 rounded-xl border-black p-3 h-[80%]">
                            <span>Lựa chọn màu sắc - kiểu dáng</span>
                            <div className="w-full flex justify-center items-center">
                              {data?.imgProduct?.map((i, index) => (
                                <div
                                  key={index}
                                  className={`w-full cursor-pointer flex justify-center items-center ${
                                    selectedStyle === i
                                      ? "border-2 rounded-xl border-green-500 bg-slate-300"
                                      : ""
                                  }`}
                                  onClick={() => handleStyleSelection(index)}
                                >
                                  <img
                                    src={`data:image/jpeg;base64,${i.url}`}
                                    alt=""
                                    className="w-[25%] h-[10vh] object-contain"
                                  />
                                  <h1 className="text-black">{i.code}</h1>
                                </div>
                              ))}
                            </div>
                            <span>Lựa chọn kích thước</span>
                            <div className="w-full flex">
                              <div className="w-full flex">
                                {sizeArray.map((size, index) => (
                                  <div
                                    key={index}
                                    onClick={() => handleSizeSelection(index)}
                                    className={`border-2 cursor-pointer border-black rounded-2xl w-[10%] p-1 justify-center items-center flex ml-4 ${
                                      selectedSize === size
                                        ? "border-2 border-green-500 bg-slate-200"
                                        : ""
                                    }`}
                                  >
                                    {size}
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div
                              onClick={() => setOpenViewSite(!openViewSite)}
                              className="mt-4 flex cursor-pointer justify-center items-center w-[200px] h-[30px] border-2 border-red-500 rounded-xl"
                            >
                              Bảng size
                              {openViewSite ? (
                                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-[100]">
                                  <div className="bg-white p-4 rounded-md h-[60vh] sm:w-[30%]">
                                    <img
                                      src={
                                        data?.category === "man"
                                          ? size_man
                                          : size
                                      }
                                      alt=""
                                      className="w-full h-[90%] object-contain"
                                    />
                                    <button
                                      className={`sm:mt-4 w-[100px] bg-teal-500 rounded-md hover:bg-teal-200 hover:shadow hover:shadow-teal-500/80 h-[40px] text-[15px] mx-auto flex justify-center items-center`}
                                      onClick={() =>
                                        setOpenViewSite(!openViewSite)
                                      }
                                    >
                                      Đóng
                                    </button>
                                  </div>
                                </div>
                              ) : null}
                            </div>
                            <div className="sm:mt-8">Chọn số lượng</div>
                            <div className="h-8 flex items-center sm:mt-4">
                              <div className="flex">
                                <div
                                  className="h-10 bg-gradient-to-r from-white to-gray-200 font-bold rounded-l-lg px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                                  onClick={decrementCount}
                                >
                                  <AiOutlineMinus
                                    size={20}
                                    className="mt-1 text-black"
                                  />
                                </div>
                                <div className="items-center font-extrabold text-white text-md justify-center flex h-10 w-[40px] bg-teal-800 relative">
                                  {count}
                                </div>
                                <div
                                  className={`h-10 bg-gradient-to-r from-white to-gray-200 font-bold rounded-r-lg px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out ${
                                    count >= data?.stock &&
                                    "cursor-not-allowed opacity-50"
                                  }`}
                                  onClick={incrementCount}
                                >
                                  <AiOutlinePlus size={20} className="mt-1" />
                                </div>
                              </div>
                              <span className="ml-8">
                                <i>Số lượng kho: {data?.stock}</i>
                              </span>
                            </div>
                            <div className="mt-4">Giá</div>
                            <p className="texl-[15px] font-Roboto text-green-500">
                              {data?.discountPrice}
                            </p>
                          </div>
                        </div>
                        <div className="w-full mt-4 sm:mt-0 p-2 sm:p-0 sm:h-[10%] h-[12%] bg-gradient-to-br bg-teal-300">
                          <div className="sm:w-[60%] flex w-full justify-center items-center h-full">
                            <button
                              className={`w-[100px] bg-gray-400 sm:mr-3 text-white hover:border-none hover:translate-y-[-7px] hover:shadow-teal-800/80 hover:text-white rounded-md hover:bg-teal-500  hover:shadow-md h-[40px] text-[15px]`}
                            >
                              Mua ngay
                            </button>
                            <button
                              className={`w-[150px] opacity-60 hover:opacity-100 sm:mr-3 bg-white border border-teal-500 hover:border-none hover:translate-y-[-7px] hover:shadow-teal-800/80 hover:text-white rounded-md hover:bg-teal-500  hover:shadow-md h-[40px] text-[15px]`}
                              onClick={() => handAddToCart(data?._id)}
                            >
                              Thêm vào giỏ hàng
                            </button>
                            <button
                              onClick={close}
                              className={`sm:w-[100px] w-[60px] opacity-60 hover:opacity-100 bg-white border border-teal-500 hover:border-none hover:translate-y-[-7px] hover:shadow-teal-800/80 hover:text-white rounded-md hover:bg-teal-500 hover:shadow-md h-[40px] text-[15px]`}
                            >
                              Đóng
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <div className="w-[90%] mx-auto mt-4">
        <span className="text-2xl font-[500] font-Roboto">
          Bình luận ({data?.comment.length})
        </span>
        <div className="sm:w-[45%] w-full flex">
          <div className="w-[15%] border-r-4 border rounded-md flex justify-end pr-2 items-center border-r-black">
            <p className="text-3xl font-[800] text-center">
              {data?.rating_avg}/5
            </p>
          </div>
          <div className="w-[65%] ml-4">
            <span className="w-full flex">
              <IoIosStar fill="yellow" size={20} />
              <IoIosStar fill="yellow" size={20} />
              <IoIosStar fill="yellow" size={20} />
              <IoIosStar fill="yellow" size={20} />
              <IoIosStar fill="yellow" size={20} />
              100
            </span>
            <span className="w-full flex">
              <IoIosStar fill="yellow" size={20} />
              <IoIosStar fill="yellow" size={20} />
              <IoIosStar fill="yellow" size={20} />
              <IoIosStar fill="yellow" size={20} />
              <IoIosStar fill="white" size={20} />
              10
            </span>
            <span className="w-full flex">
              <IoIosStar fill="yellow" size={20} />
              <IoIosStar fill="yellow" size={20} />
              <IoIosStar fill="yellow" size={20} />
              <IoIosStar fill="white" size={20} />
              <IoIosStar fill="white" size={20} />
              10
            </span>
            <span className="w-full flex">
              <IoIosStar fill="yellow" size={20} />
              <IoIosStar fill="yellow" size={20} />
              <IoIosStar fill="white" size={20} />
              <IoIosStar fill="white" size={20} />
              <IoIosStar fill="white" size={20} />2
            </span>
            <span className="w-full flex">
              <IoIosStar fill="yellow" size={20} />
              <IoIosStar fill="white" size={20} />
              <IoIosStar fill="white" size={20} />
              <IoIosStar fill="white" size={20} />
              <IoIosStar fill="white" size={20} />1
            </span>
          </div>
        </div>
        <div className="w-[90%] mx-auto mt-4">
          {data?.comment.length !== 0 ? (
            <>
              {data?.comment?.map((i, index) => (
                <div
                  className="w-full sm:h-[20vh] h-fit flex border-2 rounded-2xl border-teal-400 shadow-2xl mt-2 sm:flex-row flex-col"
                  key={index}
                >
                  <div className="sm:w-[15%] h-full border-r-4 border-teal-500 w-full sm:flex-col flex-row flex items-center justify-center">
                    <img
                      src={`data:image/jpeg;base64,${i?.avatarUser}`}
                      alt=""
                      className="sm:h-[45%] sm:w-[35%] w-[20%] h-[5%] rounded-full"
                    />
                    <div className="w-full pl-2 flex justify-center items-center sm:flex-col">
                      <p>{i?.cmt_userName}</p>
                      <div className="flex">
                        {Array.from({ length: i?.star }, (_, index) => (
                          <FaStar key={index} color="gold" size={20} />
                        ))}
                      </div>
                      <p>{i?.cmt_createdAt.slice(0, 10)}</p>
                    </div>
                  </div>
                  <div className="sm:w-[55%] border-r-4 border-teal-500 pl-2 flex flex-col justify-center pb-2 sm:pb-0">
                    <p className="text-center">{i.content}</p>
                  </div>
                  <div className="sm:w-[30%]">
                    <p className="text-[15px] sm:h-[40px] text-center sm:pl-3 font-[500] font-DM">
                      Hình ảnh từ khách hàng
                    </p>
                    <div className="sm:mt-3 grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                      {i?.imgCmt?.map((item, ind) => (
                        <img
                          src={item?.url}
                          className="sm:w-[100%] w-[100%] pl-2"
                          alt=""
                          key={ind}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              Sản phẩm chưa có đánh giá nào liên quan
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
