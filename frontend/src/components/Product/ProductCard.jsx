import React, { useEffect, useState } from "react";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { TbDiscountCheckFilled } from "react-icons/tb";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { server } from "../../server";
import { useDispatch, useSelector } from "react-redux";
const ProductCard = ({ products }) => {
  const [wishlist, setWishlist] = useState({});
  const { user } = useSelector((state) => state.user);
  const [wishlistItems, setWishlistItems] = useState([]);
  const dispatch = useDispatch();

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
                    onClick={() => handleWishlist(i?._id)}
                    size={20}
                    className="transition-all text-gray-400 duration-300 cursor-pointer hover:text-teal-500"
                  />
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
