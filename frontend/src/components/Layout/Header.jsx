import React, { useEffect, useState } from "react";
import Logo from "../../assets/MT.png";
import { CiShop, CiHeart } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import Account from "../Account";
import Navbar from "../Layout/Navbar";
import SearchInformation from "../function/SearchInformation";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  AiTwotoneShop,
  AiOutlineDelete,
  AiTwotoneShopping,
} from "react-icons/ai";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
const Header = ({ activeHeading }) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const loginHandle = () => {
    navigate("/sign-in");
    window.location.reload(true);
  };
  const handleOpenWishlist = () => {
    setOpenWishlist(!openWishlist);
  };
  //get wishlist
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
    const fetchDataCart = async () => {
      await axios.get(`${server}/user/get_cart/${user?._id}`).then((res) => {
        setCartItems(res.data.cart);
      });
    };

    if (user?._id) {
      fetchDataCart();
    }
  }, [dispatch, user?._id]);
  //Định dạng tiền tệ
  function formatVietnameseCurrency(number) {
    const roundedNumber = Math.round(number / 1000) * 1000;
    const formattedNumber = roundedNumber.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });

    return formattedNumber;
  }
  //Xóa khỏi danh sách yêu thích
  const handleWishlist = async (productId) => {
    try {
      await axios.delete(`${server}/user/remove_from_wishlist/${productId}`, {
        withCredentials: true,
      });
      await axios
        .get(`${server}/user/get_wishlist/${user?._id}`)
        .then((res) => {
          setWishlistItems(res.data.wishlist);
        });
      toast.success("Đã xóa khỏi danh sách yêu thích");
    } catch (error) {
      toast.error("Lỗi khi xóa khỏi wishlist");
    }
  };
  //xóa khỏi giỏ hàng
  const handleCart = async (productId) => {
    try {
      await axios.delete(`${server}/user/remove_from_cart/${productId}`, {
        withCredentials: true,
      });
      await axios.get(`${server}/user/get_cart/${user?._id}`).then((res) => {
        setCartItems(res.data.cart);
      });
      toast.success("Đã xóa khỏi giỏ hàng");
    } catch (error) {
      toast.error("Lỗi khi xóa");
    }
  };
  const handleAddToCart = async (productId) => {
    await axios
      .post(
        `${server}/user/add_to_cart`,
        { id: productId, quantity: 1, size: "S" },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
    await axios.delete(`${server}/user/remove_from_wishlist/${productId}`, {
      withCredentials: true,
    });
    await axios.get(`${server}/user/get_wishlist/${user?._id}`).then((res) => {
      setWishlistItems(res.data.wishlist);
    });
  };
  function convertToNumber(currencyString) {
    const parts = currencyString.split(/[.]/);
    const numericString = parts.join("");
    const number = parseFloat(numericString);
    return isNaN(number) ? 0 : number;
  }

  return (
    <div className="relative">
      <div className="w-full p-2 h-full bg-teal-800/90 mx-auto flex relative">
        <div className="w-[10%] p-1">
          <Link to="/">
            <img
              src={Logo}
              alt=""
              className="sm:w-[85%] sm:h-[10vh] object-cover sm:ml-4 cursor-pointer"
            />
          </Link>
        </div>
        <div className="w-[60%] flex justify-center items-center ">
          <Navbar activeHeading={activeHeading} size={85} />
        </div>
        <div className="md:w-[40%] lg:w-[30%] pr-2 justify-end items-center sm:flex hidden">
          <SearchInformation />
          {isAuthenticated ? (
            <Account />
          ) : (
            <div
              onClick={loginHandle}
              className="text-white cursor-pointer hover:scale-[1.1] transition-transform duration-300 pl-4"
            >
              Đăng nhập
            </div>
          )}
          <div className="relative">
            <CiShop
              className="w-[30px] h-[30px] ml-5 cursor-pointer hover:scale-[1.1]"
              color="#ffffff"
              onClick={(e) => setOpenCart(!openCart)}
            />
            <div className="absolute flex justify-center items-center bottom-4 left-9 w-[20px] h-[20px] rounded-full bg-white">
              {cartItems?.length}
            </div>
          </div>

          <IoIosNotificationsOutline
            className="ml-5 cursor-pointer hover:scale-[1.1]"
            color="#ffffff"
            size={30}
          />
          <div className="relative">
            <CiHeart
              onClick={handleOpenWishlist}
              className="ml-5 cursor-pointer hover:scale-[1.1]"
              color="#ffffff"
              size={35}
            />
            <div className="absolute flex justify-center items-center bottom-4 left-10 w-[20px] h-[20px] rounded-full bg-white">
              {wishlistItems?.length}
            </div>
          </div>
        </div>
        {openCart ? (
          <div className="fixed top-0 left-0 w-full bg-[#0000004b] min-h-[100vh] z-10">
            <div className="fixed top-0 right-0 min-h-[100vh] sm:w-[35%] w-[80%] shadow-sm bg-white">
              {cartItems?.length !== 0 ? (
                <div className="w-full">
                  <div className="w-[95%]  mx-auto flex justify-between h-[8vh] items-center">
                    <AiTwotoneShop size={25} className="cursor-pointer" />
                    {cartItems.length} Sản phẩm
                    <RxCross1
                      className="cursor-pointer"
                      size={30}
                      onClick={(e) => setOpenCart(!openCart)}
                    />
                  </div>
                  {cartItems.map((i, index) => (
                    <div
                      key={index}
                      className="w-[95%] shadow-xl border-b-2 border-r-2 border-l-2 mx-auto border-black justify-center mb-4 rounded-2xl"
                    >
                      <div className="w-full flex">
                        <div className="w-[5%] flex flex-col">
                          <label className="h-[30px] rounded-tl-2xl bg-teal-500"></label>
                          <span className="flex justify-center items-center h-[12vh]">
                            {index + 1}
                          </span>
                        </div>
                        <div className="w-[30%] flex flex-col">
                          <label className="h-[30px] text-center bg-teal-500">
                            Tên sản phẩm
                          </label>
                          <span className="h-[12vh] flex justify-center items-center">
                            {i?.product?.productName}
                          </span>
                        </div>
                        <div className="w-[20%] flex flex-col">
                          <label className="h-[30px] text-center bg-teal-500">
                            Hình ảnh
                          </label>
                          <img
                            src={`data:image/jpeg;base64,${i?.product?.imgProduct[0].url}`}
                            alt=""
                            className="h-[12vh] rounded-3xl mt-2"
                          />
                        </div>
                        <div className="w-[20%] flex flex-col">
                          <label className="h-[30px] text-center bg-teal-500">
                            Tổng tiền
                          </label>
                          {i?.product?.isOnSale?.status === true ? (
                            <span className="flex justify-center items-center h-[12vh]">
                              {formatVietnameseCurrency(
                                parseInt(i?.product?.isOnSale?.price_sale) *
                                  i?.quantity
                              )}
                            </span>
                          ) : (
                            <span className="flex justify-center items-center h-[12vh]">
                              {formatVietnameseCurrency(
                                convertToNumber(i?.product?.discountPrice) *
                                  i.quantity
                              )}
                            </span>
                          )}
                        </div>
                        <div className="w-[25%] flex flex-col ">
                          <label className="h-[30px] text-center rounded-tr-2xl bg-teal-500">
                            Số lượng
                          </label>
                          <span className="flex justify-center items-center h-[12vh]">
                            {i?.quantity}
                          </span>
                        </div>
                      </div>
                      <div className="w-full flex justify-end p-2">
                        <div
                          className="w-[80px] bg-red-400 flex justify-center items-center rounded-3xl h-[30px] cursor-pointer hover:-translate-x-2 transition-transform duration-300"
                          onClick={() => handleCart(i?.productId)}
                        >
                          Xóa
                        </div>
                        <div
                          className="w-[120px] bg-blue-400 sm:ml-4 flex justify-center items-center rounded-3xl h-[30px] cursor-pointer hover:-translate-x-2 transition-transform duration-300"
                          onClick={() => handleWishlist(i?.productId)}
                        >
                          Thanh toán
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <div className="w-full flex justify-end mt-4">
                    <RxCross1
                      className="cursor-pointer"
                      size={30}
                      onClick={(e) => setOpenCart(!openCart)}
                    />
                  </div>
                  <div className="flex items-center justify-center mt-[50%]">
                    Chưa có sản phẩm nào trong giỏ hàng của bạn !
                  </div>
                </>
              )}
            </div>
          </div>
        ) : null}
        {openWishlist ? (
          <div className="fixed top-0 left-0 w-full bg-[#0000004b] min-h-[100vh] z-10">
            <div className="fixed top-0 right-0 min-h-[100vh] sm:w-[35%] w-[80%] shadow-sm bg-white">
              {wishlistItems?.length !== 0 ? (
                <div className="w-full">
                  <div className="w-[95%]  mx-auto flex justify-between h-[8vh] items-center">
                    <CiHeart size={25} className="cursor-pointer" />
                    {wishlistItems.length} Sản phẩm
                    <RxCross1
                      className="cursor-pointer"
                      size={30}
                      onClick={(e) => setOpenWishlist(!openWishlist)}
                    />
                  </div>
                  {wishlistItems.map((i, index) => (
                    <div
                      key={index}
                      className="w-[95%] shadow-xl h-[18vh] border-b-2 border-r-2 border-l-2 mx-auto flex border-black justify-center mb-4 rounded-2xl"
                    >
                      <div className="w-[10%] flex flex-col">
                        <label className="h-[30px] rounded-tl-2xl bg-teal-500"></label>
                        <span className="flex justify-center items-center h-[12vh]">
                          {index + 1}
                        </span>
                      </div>
                      <div className="w-[30%] flex flex-col">
                        <label className="h-[30px] text-center bg-teal-500">
                          Tên sản phẩm
                        </label>
                        <span className="h-[12vh] flex justify-center items-center">
                          {i?.product?.productName}
                        </span>
                      </div>
                      <div className="w-[20%] flex flex-col">
                        <label className="h-[30px] text-center bg-teal-500">
                          Hình ảnh
                        </label>
                        <img
                          src={`data:image/jpeg;base64,${i?.product?.imgProduct[0].url}`}
                          alt=""
                          className="h-[12vh] rounded-3xl mt-2"
                        />
                      </div>
                      <div className="w-[20%] flex flex-col">
                        <label className="h-[30px] text-center bg-teal-500">
                          Giá bán
                        </label>
                        {i?.product?.isOnSale?.status === true ? (
                          <span className="flex justify-center items-center h-[12vh]">
                            {formatVietnameseCurrency(
                              i?.product?.isOnSale?.price_sale
                            )}
                          </span>
                        ) : (
                          <span className="flex justify-center items-center h-[12vh]">
                            {i?.product?.discountPrice}
                          </span>
                        )}
                      </div>
                      <div className="w-[20%] flex flex-col">
                        <label className="h-[30px] rounded-tr-2xl bg-teal-500">
                          Chức năng
                        </label>
                        <div className="w-full h-[15vh] flex justify-center items-center">
                          <AiOutlineDelete
                            onClick={() => handleWishlist(i?.productId)}
                            size={25}
                            className="cursor-pointer hover:translate-x-2 transition-transform duration-300 hover:text-red-500"
                          />
                          <AiTwotoneShopping
                            onClick={() => handleAddToCart(i?.productId)}
                            size={25}
                            className="cursor-pointer hover:translate-x-2 transition-transform duration-300 ml-3 hover:text-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <div className="w-full flex justify-end mt-4">
                    <RxCross1
                      className="cursor-pointer"
                      size={30}
                      onClick={(e) => setOpenWishlist(!openWishlist)}
                    />
                  </div>
                  <div className="flex items-center justify-center mt-[50%]">
                    Chưa có sản phẩm nào trong danh sách yêu thích của bạn !
                  </div>
                </>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Header;
