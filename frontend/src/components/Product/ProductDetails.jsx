import React, { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import size from "../../assets/theo kg.jpg";
import size_man from "../../assets/size-nam.png";
import { toast } from "react-toastify";
const ProductDetails = ({ data }) => {
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [count, setCount] = useState(1);
  const [openViewSite, setOpenViewSite] = useState(false);
  const [addToCart, setAddToCart] = useState(false);
  const [selected_image_addToCart, setSelectedImageAddToCart] = useState(0);
  const handleStyleSelection = (index) => {
    setSelectedStyle(data.image_Url[index]);
  };

  const handleSizeSelection = (index) => {
    setSelectedSize(data.size[index]);
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
  };
  const handAddToCart = () => {
    if (selectedSize === null) {
      toast.error(`Vui lòng chọn size`);
    }
    if (selectedStyle === null) {
      toast.error(`Vui lòng chọn kiểu dáng`);
    }
    setAddToCart(!addToCart);
    setTimeout(() => {
      setSelectedSize(null);
      setSelectedStyle(null);
      setCount(1);
    }, 1000);
  };

  return (
    <div className="h-full w-full mx-auto pb-8">
      <div className="bg-gradient-to-r from-gray-200 via-teal-200 to-gray-300/20 rounded-3xl w-[95%] sm:h-[88vh] h-full mx-auto mt-4">
        {data ? (
          <div className="w-full sm:h-[60vh] h-[150vh] sm:flex justify-between">
            <div className="sm:w-[45%] w-[80%] mx-auto sm:mt-6 p-2 sm:h-full flex items-center flex-col">
              <img
                src={data.image_Url[selected_image].url}
                alt=""
                className="rounded-2xl sm:h-[60vh] object-contain"
              />
              <div className="sm:mt-4 flex justify-center items-center  w-full h-[20vh]">
                {data.image_Url?.map((i, index) => (
                  <img
                    key={index}
                    src={i.url}
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
                {data.name}
              </span>
              <div className="sm:mt-6 mt-2 w-full sm:text-xl font-Roboto">
                <p>{data.description}</p>
              </div>
              <div className="flex items-center mt-2">
                <div className="w-[45%]  h-1 bg-gray-300 rounded-md overflow-hidden">
                  <div
                    className="h-full bg-green-500"
                    style={{ width: `${(data.rating / 5) * 100}%` }}
                  ></div>
                </div>
                <span className="ml-2">({data.rating}/5)</span>
                <span className="sm:ml-8">Đã bán: {data.total_sell}</span>
              </div>
              <div className="w-full flex">
                {data?.material?.map((item, ind) => (
                  <div
                    key={ind}
                    className="w-[100px] sm:mt-6 cursor-pointer hover:translate-y-3 hover:bg-white hover:text-black hover:scale-[1.2] transition-transform duration-300 text-center rounded-lg sm:ml-2 h-[30px] border-2 border-red-500"
                  >
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
              <div className="sm:mt-2 mt-8 justify-between pr-3">
                <div>
                  <div
                    onClick={openAddToCart}
                    className="sm:w-[40%] w-[80%] cursor-pointer hover:translate-x-2 duration-300 hover:bg-gray-500 hover:text-white bg-white rounded-xl text-black sm:text-xl font-DM hover:shadow hover:shadow-teal-500/80  h-[40px] mt-8 flex justify-center items-center"
                  >
                    Thêm vào giỏ hàng
                  </div>
                  {addToCart ? (
                    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-[100]">
                      <div className="bg-white rounded-md sm:h-[70vh] h-[70vh] sm:w-[45%] w-[90%]">
                        <div className="sm:h-[90%] h-[88%] sm:flex sm:justify-center sm:items-center">
                          <div className="w-full sm:w-[50%] flex flex-col justify-center items-center">
                            <img
                              src={data.image_Url[selected_image_addToCart].url}
                              alt=""
                              className="rounded-2xl mt-4 sm:h-[40vh] object-cover"
                            />
                            <div className="flex justify-center items-center w-[30%] mt-4">
                              {data.image_Url?.map((i, index) => (
                                <img
                                  key={index}
                                  src={i.url}
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
                          <div className="w-[45%] border-2 rounded-xl border-black p-3 h-[90%]">
                            <span>Lựa chọn màu sắc - kiểu dáng</span>
                            <div className="w-full flex justify-center items-center">
                              {data.image_Url?.map((i, index) => (
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
                                    src={i.url}
                                    alt=""
                                    className="w-[25%] h-[10vh] object-contain"
                                  />
                                  <h1 className="text-black">{i.code}</h1>
                                </div>
                              ))}
                            </div>
                            <span>Lựa chọn kích thước</span>
                            <div className="w-full flex">
                              {data?.size?.map((i, index) => (
                                <div
                                  key={index}
                                  onClick={() => handleSizeSelection(index)}
                                  className={`border-2 cursor-pointer border-black rounded-2xl w-[10%] p-1 justify-center items-center flex ml-4 ${
                                    selectedSize === i
                                      ? "border-2 border-green-500 bg-slate-200"
                                      : ""
                                  }`}
                                >
                                  {i?.name}
                                </div>
                              ))}
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
                                    count >= data.stock &&
                                    "cursor-not-allowed opacity-50"
                                  }`}
                                  onClick={incrementCount}
                                >
                                  <AiOutlinePlus size={20} className="mt-1" />
                                </div>
                              </div>
                              <span className="ml-8">
                                <i>Số lượng kho: {data.stock}</i>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="w-full sm:h-[10%] h-[12%] bg-gradient-to-br bg-teal-300">
                          <div className="sm:w-[60%] flex w-full justify-center items-center h-full">
                            <button
                              className={`w-[100px] bg-gray-400 sm:mr-3 text-white hover:border-none hover:translate-y-[-7px] hover:shadow-teal-800/80 hover:text-white rounded-md hover:bg-teal-500  hover:shadow-md h-[40px] text-[15px]`}
                              onClick={handAddToCart}
                            >
                              Mua ngay
                            </button>
                            <button
                              className={`w-[150px] opacity-60 hover:opacity-100 sm:mr-3 bg-white border border-teal-500 hover:border-none hover:translate-y-[-7px] hover:shadow-teal-800/80 hover:text-white rounded-md hover:bg-teal-500  hover:shadow-md h-[40px] text-[15px]`}
                              onClick={() => setAddToCart(!addToCart)}
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
    </div>
  );
};

export default ProductDetails;
