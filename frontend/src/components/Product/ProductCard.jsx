import React, { useEffect, useState } from "react";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { TbDiscountCheckFilled } from "react-icons/tb";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { server } from "../../server";
import { useDispatch, useSelector } from "react-redux";
import { IoMdAdd } from "react-icons/io";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import img1 from "../../assets/complete.png";
const ProductCard = ({ products }) => {
  const [wishlist, setWishlist] = useState({});
  const { user } = useSelector((state) => state.user);
  const [wishlistItems, setWishlistItems] = useState([]);
  const dispatch = useDispatch();
  const [openDiscount, setOpenDiscount] = useState(false);
  const [dataDiscountCode, setDataDiscountCode] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usedDiscountCodes, setUsedDiscountCodes] = useState([]);
  const ProductsPerPage = 3;
  // Tính toán chỉ số bắt đầu và chỉ số kết thúc của sản phẩm hiển thị trên trang hiện tại
  const indexOfLastProduct = currentPage * ProductsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - ProductsPerPage;
  const currentProducts = dataDiscountCode.discountCode?.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Chuyển đến trang tiếp theo
  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  // Chuyển đến trang trước đó
  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`${server}/user/get_wishlist/${user?._id}`)
        .then((res) => {
          setWishlistItems(res.data.wishlist);
        });
    };

    if (user?._id) {
      fetchData();
    }
  }, [dispatch, user?._id]);

  //Cập nhật wishlist
  useEffect(() => {
    // Nếu có danh sách wishlist của người dùng, cập nhật state wishlist
    if (wishlistItems) {
      setWishlist(
        wishlistItems?.reduce((acc, item) => {
          acc[item.productId] = true;
          return acc;
        }, {})
      );
    }
  }, [wishlistItems]);

  const handleWishlist = async (productId) => {
    if (wishlist[productId]) {
      const updatedWishlist = { ...wishlist };
      delete updatedWishlist[productId];
      setWishlist(updatedWishlist);

      try {
        await axios.delete(`${server}/user/remove_from_wishlist/${productId}`, {
          withCredentials: true,
        });
        toast.success("Đã xóa khỏi danh sách yêu thích");
        setTimeout(() => {
          window.location.reload(true);
        }, 1500);
      } catch (error) {
        toast.error("Lỗi khi xóa khỏi danh sách yêu thích");
        console.error(error);
      }
    } else {
      const updatedWishlist = { ...wishlist, [productId]: true };
      setWishlist(updatedWishlist);

      try {
        await axios
          .post(
            `${server}/user/add_to_wishlist`,
            { id: productId },
            { withCredentials: true }
          )
          .then((res) => {
            toast.success(res.data.message);
            setTimeout(() => {
              window.location.reload(true);
            }, 1500);
          })
          .catch((err) => {
            toast.warning(err.response.data.message);
          });
      } catch (error) {
        toast.error("Lỗi khi xóa khỏi danh sách yêu thích");
        console.error(error);
      }
    }
  };
  const handleCart = async (productId) => {
    await axios
      .post(
        `${server}/user/add_to_cart`,
        { id: productId, quantity: 1, size: "M" },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message);
        window.location.reload();
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  const currentDate = new Date();
  //Định dạng tiền tệ
  function formatVietnameseCurrency(number) {
    const roundedNumber = Math.round(number / 1000) * 1000;
    const formattedNumber = roundedNumber.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });

    return formattedNumber;
  }
  //handleDiscountCode
  const handleDiscountCode = (data) => {
    setOpenDiscount(!openDiscount);
    setDataDiscountCode(data);
  };
  const handleCloseDiscountCode = () => {
    setOpenDiscount(false);
    setDataDiscountCode("");
    setCurrentPage(1);
  };
  useEffect(() => {
    if (user) {
      const userDiscountCodes = user.discountCode.map(
        (discount) => discount.code
      );
      setUsedDiscountCodes(userDiscountCodes);
    }
  }, [user]);

  const handleAddDiscountCode = async (data, productId) => {
    await axios
      .post(
        `${server}/user/add_discount_code`,
        { data, productId },
        { withCredentials: true }
      )
      .then((res) => {
        setUsedDiscountCodes((prevCodes) => [...prevCodes, data.code]);
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-8">
      {products?.map((i, index) => {
        const itemDate = new Date(i?.createdAt?.slice(0, 10));
        const daysDiff = Math.floor(
          (currentDate - itemDate) / (1000 * 60 * 60 * 24)
        );
        const isNew = daysDiff <= 15;

        return (
          <div key={index}>
            <div
              className={`border border-teal-500 shadow-lg shadow-teal-800/60 rounded-xl p-3 hover:shadow-lg transition-all duration-300 cursor-pointer relative`}
            >
              <div className="w-full flex">
                {isNew && (
                  <span className="absolute top-0 z-4 left-0 bg-green-500 text-white py-1 px-2 rounded-tl-md rounded-br-md">
                    Mới
                  </span>
                )}
                <div
                  className={`absolute w-8 h-8 top-1 flex justify-center items-center rounded-full left-[20%]`}
                >
                  <FaHeart
                    key={index}
                    onClick={() => handleWishlist(i?._id)}
                    size={20}
                    className={`${
                      wishlist[i?._id] ? "text-red-500" : "text-gray-400"
                    } transition-all duration-300 hover:text-red-500`}
                  />
                </div>
                <div
                  className={`absolute w-8 h-8 top-1 flex justify-center items-center rounded-full left-[35%]`}
                >
                  <FaShoppingCart
                    key={index}
                    onClick={() => handleCart(i?._id)}
                    size={20}
                    className="transition-all text-gray-400 duration-300 cursor-pointer hover:text-teal-500"
                  />
                </div>
                <div
                  className={`absolute w-8 h-8 top-1 flex justify-center items-center rounded-full left-[50%]`}
                >
                  <TbDiscountCheckFilled
                    key={index}
                    onClick={() => handleDiscountCode(i)}
                    size={20}
                    className="transition-all text-gray-400 duration-300 cursor-pointer hover:text-teal-500"
                  />
                  {openDiscount ? (
                    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-[100]">
                      <div className="bg-white rounded-md sm:h-[70vh] h-fit sm:w-[45%] w-[90%]">
                        <h1 className="font-[600] font-Poppins sm:text-xl text-center uppercase sm:mt-4">
                          Danh sách mã khuyến mãi
                        </h1>
                        {currentProducts?.length !== 0 ? (
                          <>
                            <div className="w-full h-[55vh] overflow-y-scroll flex flex-col justify-center items-center">
                              {currentProducts?.map((item, ind) => {
                                const isDiscountCodeUsed =
                                  usedDiscountCodes?.includes(item.code);
                                return (
                                  <div className="relative w-[95%]">
                                    <div
                                      key={ind}
                                      className={`w-full mx-auto h-[15vh] flex sm:mb-4 ${
                                        isDiscountCodeUsed ? "opacity-20" : ""
                                      }`}
                                    >
                                      <div className="w-[15%] border-gray-500/80 border-2 rounded-l-2xl h-full flex justify-center items-center sm:flex-col">
                                        <img
                                          src="https://png.pngtree.com/png-vector/20230408/ourmid/pngtree-price-tag-with-the-discount-icon-vector-png-image_6686659.png"
                                          alt=""
                                          className="h-[10vh]"
                                        />
                                      </div>
                                      <div className="w-[30%] border-gray-500/80 border-2 h-full flex justify-center items-center sm:flex-col">
                                        <div className="w-full h-[5vh] flex justify-center items-center bg-teal-400 text-lg font-Poppins font-[500]">
                                          Thông tin khuyến mãi
                                        </div>
                                        {item?.type === "ship" ? (
                                          <span className="w-full h-[11vh] flex justify-center items-center">
                                            Miễn phí vận chuyển
                                          </span>
                                        ) : (
                                          <span className="w-full h-[11vh] flex justify-center items-center">
                                            Giảm giá đơn hàng
                                          </span>
                                        )}
                                      </div>
                                      <div className="w-[25%] border-gray-500/80 h-full flex justify-center items-center sm:flex-col border-2">
                                        <div className="w-full h-[5vh] flex justify-center items-center bg-teal-400 text-lg font-Poppins font-[500]">
                                          Ngày hết hiệu lực
                                        </div>
                                        <div className="w-full h-[11vh] flex justify-center items-center">
                                          {item?.dateExp?.slice(0, 10)}
                                        </div>
                                      </div>
                                      <div className="w-[18%] border-gray-500/80 h-full flex justify-center items-center sm:flex-col border-2">
                                        <div className="w-full h-[5vh] flex justify-center items-center bg-teal-400 text-lg font-Poppins font-[500]">
                                          Chiết khấu
                                        </div>
                                        <div className="w-full h-[11vh] flex justify-center items-center">
                                          {item?.value <= 100 ? (
                                            <span>{item?.value} %</span>
                                          ) : (
                                            <span>
                                              {formatVietnameseCurrency(
                                                item?.value
                                              )}
                                            </span>
                                          )}
                                        </div>
                                      </div>

                                      <div className="w-[12%] border-gray-500/80 border-2 rounded-r-2xl h-full flex justify-center items-center sm:flex-col">
                                        <IoMdAdd
                                          onClick={() =>
                                            handleAddDiscountCode(item, i?._id)
                                          }
                                          size={25}
                                          className="hover:text-blue-500 cursor-pointer hover:scale-[1.3] transition-transform duration-300 "
                                        />
                                      </div>
                                    </div>
                                    {isDiscountCodeUsed ? (
                                      <img
                                        src={img1}
                                        alt=""
                                        className="absolute top-0 left-[45%] w-[100px] opacity-100 z-[100]"
                                      />
                                    ) : null}
                                  </div>
                                );
                              })}
                            </div>

                            {currentProducts?.length !== 0 &&
                            dataDiscountCode?.discountCode.length > 3 ? (
                              <div className="w-full flex justify-center items-center h-[5vh]">
                                <button
                                  onClick={prevPage}
                                  disabled={currentPage === 1}
                                >
                                  <MdKeyboardDoubleArrowLeft
                                    size={20}
                                    className="sm:mr-4 cursor-pointer hover:-translate-x-3 duration-300 transition-transform"
                                  />
                                </button>
                                <span className="text-lg text-blue-500 font-[600]">
                                  {currentPage}
                                </span>
                                <button
                                  onClick={nextPage}
                                  disabled={
                                    indexOfLastProduct >=
                                    dataDiscountCode?.length
                                  }
                                >
                                  <MdKeyboardDoubleArrowRight
                                    size={20}
                                    className="sm:ml-4 cursor-pointer hover:translate-x-3 duration-300 transition-transform"
                                  />
                                </button>
                              </div>
                            ) : null}
                          </>
                        ) : (
                          <div className="w-full h-[58vh] flex justify-center items-center">
                            <p>Sản phẩm chưa có mã khuyến mãi nào</p>
                          </div>
                        )}
                        <div className="w-[50%] mx-auto flex justify-center items-center">
                          <div
                            onClick={handleCloseDiscountCode}
                            className="bg-red-500 cursor-pointer rounded-2xl bg-opacity-45 hover:bg-opacity-100 w-[200px] h-[30px] flex justify-center items-center"
                          >
                            <p>Đóng</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="mt-8 w-[85%] h-[25vh] flex justify-center overflow-hidden mx-auto">
                <img
                  src={`data:image/jpeg;base64,${i?.imgProduct[0].url}`}
                  alt=""
                  className="w-[100%] h-full rounded-xl object-contain hover:scale-[1.1] transition-all duration-300 cursor-pointer"
                />
              </div>
              <Link to={`/product/${i?.productName}`}>
                <h1 className="mt-3 font-DM font-[600]">
                  {i?.productName?.length > 25
                    ? `${i?.productName?.slice(0, 25)}...`
                    : i?.productName}
                </h1>
              </Link>
              <div className="flex items-center mt-2">
                <div className="w-40 h-1 bg-gray-300 rounded-md overflow-hidden">
                  <div
                    className="h-full bg-green-500"
                    style={{ width: `${(i?.rating_avg / 5) * 100}%` }}
                  ></div>
                </div>
                <span className="ml-2">({i?.rating_avg}/5)</span>
              </div>
              <div className="w-full flex items-center justify-between h-[30px] ">
                <div className="relative flex justify-center items-center">
                  <span className="text-green-500 text-[10px] sm:text-sm lg:text-lg md:text-md">
                    {i?.isOnSale?.status === true ? (
                      <div className="flex justify-center items-center">
                        {formatVietnameseCurrency(i?.isOnSale?.price_sale)}
                        <i className="ml-2 text-[13px] line-through text-red-500">
                          (- {i.isOnSale?.discount_rate_on_sale}%)
                        </i>
                      </div>
                    ) : (
                      <div>{i?.discountPrice}</div>
                    )}
                  </span>
                </div>

                <h1 className="text-red-500 line-through text-[8px] sm:text-sm lg:text-lg md:text-md">
                  {i?.originalPrice}
                </h1>
              </div>
              <div
                key={index}
                className="w-full flex justify-between items-center relative"
              >
                <span className="text-[10px] sm:text-sm lg:text-lg md:text-md">
                  Đã bán: {i?.sold_out}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductCard;
