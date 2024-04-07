import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { server } from "../../../server";
import { toast } from "react-toastify";
import { LuDelete } from "react-icons/lu";
const ManageDiscountCode = () => {
  const { products } = useSelector((state) => state.products);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [productDiscount, setProductDiscount] = useState([]);
  const [type, setType] = useState("");
  const [percent, setPercent] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [code, setCode] = useState("");
  const [dateExp, setDateExp] = useState("");
  const handleOpenModal = () => {
    setOpen(!open);
  };
  //Lọc sản phẩm
  useEffect(() => {
    const filterData =
      products &&
      products?.filter((product) => product?.discountCode?.length !== 0);
    setData(filterData);
  }, [products, products?.discountCode?.length]);
  //Lấy thông tin sản phẩm
  useEffect(() => {
    if (selectedProduct) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${server}/product/get-produc-info?selectedProduct=${selectedProduct}`,
            { withCredentials: true }
          );
          setProductDiscount(response.data.productData);
        } catch (error) {
          console.error("Error fetching types:", error);
        }
      };

      fetchData();
    }
  }, [selectedProduct]);
  //Thây đổi khi chọn sản phẩm
  const handleChangeProduct = (e) => {
    setSelectedProduct(e.target.value);
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
  const handleCreateCode = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let codeDiscount = "";

    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      codeDiscount += characters.charAt(randomIndex);
    }
    setCode(codeDiscount);
  };
  const handleAddCode = async (productId) => {
    try {
      const response = await axios.post(
        `${server}/product/add_new_discount_code`,
        { type, productId, percent, code, dateExp, quantity },
        { withCredentials: true }
      );

      const updatedProducts = products.map((product) => {
        if (product._id === productId) {
          const updatedDiscountCode = [
            ...product.discountCode,
            {
              type,
              value: percent,
              code,
              dateExp,
              quantity,
            },
          ];
          return { ...product, discountCode: updatedDiscountCode };
        }
        return product;
      });

      setData(updatedProducts);
      toast.success(response.data.message);
      setDateExp("");
      setCode("");
      setPercent(0);
      setSelectedProduct("");
      setType("");
      setQuantity("");
      setProductDiscount([]);
      setOpen(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleDeleteCode = async (code, productId) => {
    try {
      await axios.post(
        `${server}/product/delete_code`,
        { code, productId },
        { withCredentials: true }
      );

      const updatedProducts = products.map((product) => {
        if (product._id === productId) {
          const updatedDiscountCode = product.discountCode.filter(
            (discount) => discount.code !== code
          );
          return { ...product, discountCode: updatedDiscountCode };
        }
        return product;
      });

      setData(updatedProducts);
      toast.success("Xóa mã khuyến mãi thành công");
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi xóa mã khuyến mãi");
    }
  };
  return (
    <div className="w-full">
      <h1 className="text-center text-xl font-[600] font-Poppins uppercase">
        Quản lý mã khuyến mãi
      </h1>

      <div
        onClick={handleOpenModal}
        className="w-[150px] hover:translate-x-4 hover:bg-white hover:text-black hover:border-2 border-blue-500 transition-all duration-300 bg-blue-500 cursor-pointer h-[40px] flex justify-center items-center rounded-2xl text-lg font-Poppins font-[600] text-white"
      >
        Thêm mới
      </div>
      {open ? (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-[100]">
          <div className="bg-white rounded-md h-fit sm:w-[35%] md:w-[70%] lg:w-[60%] xl:w-[35%] w-[90%]">
            <h1 className="text-xl font-[600] font-Poppins text-center uppercase sm:mt-6">
              Thêm mới mã khuyến mãi
            </h1>
            <div className="w-full flex justify-center p-2 sm:mt-4">
              <div className="w-[45%] flex flex-col">
                <div className="w-full">
                  <label className="font-Poppins text-lg">
                    Chọn sản phẩm khuyến mãi
                  </label>
                  <select
                    className="w-[200px] h-[40px] border p-2 rounded-xl"
                    value={selectedProduct}
                    onChange={handleChangeProduct}
                  >
                    <option value="">Chọn sản phẩm...</option>
                    {products?.map((item, index) => (
                      <option key={index} value={item?._id}>
                        {item.productName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-full sm:mt-6">
                  <label className="font-Poppins text-lg">
                    Chọn loại khuyến mãi
                  </label>
                  <select
                    className="w-[200px] h-[40px] border p-2 rounded-xl"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="">Chọn loại giảm giá...</option>
                    <option value="ship">Phí vận chuyển</option>
                    <option value="total">Giá trị đơn hàng</option>
                  </select>
                </div>
                <div className="w-full sm:mt-6">
                  <label className="font-Poppins text-lg">Mức giảm</label>
                  <i className="text-[15px] sm:ml-4 text-green-500">
                    {percent > 100
                      ? formatVietnameseCurrency(percent)
                      : percent + "%"}
                  </i>
                  <input
                    type="number"
                    className="w-[200px] h-[40px] border p-2 rounded-xl"
                    value={percent}
                    onChange={(e) => setPercent(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-[45%] h-[10vh] justify-between items-center flex sm:flex-col">
                <label>Hình ảnh sản phẩm</label>
                <div className="w-full h-[50vh] flex justify-center items-center">
                  {productDiscount?.length !== 0 ? (
                    <img
                      src={`data:image/jpeg;base64, ${
                        productDiscount && productDiscount?.imgProduct[0]?.url
                      }`}
                      alt=""
                      className="w-[250px] object-contain rounded-xl h-[200px] sm:pt-6"
                    />
                  ) : (
                    <img
                      src="https://cdn-icons-png.freepik.com/512/1160/1160358.png"
                      alt=""
                      className="w-[100px]"
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="w-full pl-2 flex justify-center">
              <div className="w-[40%] sm:mt-4">
                <label className="font-Poppins text-lg">Mã giảm giá</label>
                <div className="w-full flex">
                  <input
                    type="text"
                    className="w-[120px] h-[40px] border p-2 rounded-xl"
                    value={code}
                  />
                  <div
                    className="text-lg hover:text-black text-white font-[600] w-[30%] cursor-pointer hover:translate-x-2 transition-transform duration-300 hover:bg-white hover:border-2 border-blue-500 sm:ml-4 h-[40px] flex justify-center items-center bg-blue-500 rounded-2xl"
                    onClick={handleCreateCode}
                  >
                    Tạo mã
                  </div>
                </div>
              </div>
              <div className="w-[30%] sm:mt-4">
                <label className="font-Poppins text-lg">Số lượng</label>
                <div className="w-full flex">
                  <input
                    type="number"
                    className="w-[120px] h-[40px] border p-2 rounded-xl"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-[30%] sm:mt-4">
                <label className="font-Poppins text-lg">
                  Ngày hết hiệu lực
                </label>
                <div className="w-full flex">
                  <input
                    type="date"
                    className="w-[150px] h-[40px] border p-2 rounded-xl"
                    value={dateExp}
                    onChange={(e) => setDateExp(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="w-[50%] p-4 flex justify-between items-center mx-auto">
              <div
                className="w-[100px] flex justify-center items-center rounded-2xl hover:translate-x-3 transition-transform duration-300 h-[40px] bg-red-500 bg-opacity-60 hover:bg-opacity-100 cursor-pointer"
                onClick={handleOpenModal}
              >
                Đóng
              </div>
              <div
                className="w-[150px] flex justify-center items-center rounded-2xl hover:translate-x-3 transition-transform duration-300 h-[40px] bg-blue-500 cursor-pointer"
                onClick={() => handleAddCode(productDiscount?._id)}
              >
                Thêm mới
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {data.length !== 0 ? (
        <div className="w-full p-2 h-[66vh]">
          {data?.map((i, index) => (
            <div
              key={index}
              className="w-full flex sm:mb-2 border-2 border-teal-500 rounded-b-2xl"
            >
              <div className="w-[15%] border-r-2 border-teal-500 flex flex-col">
                <lable className="text-center h-[30px]  font-[500] font-Poppins bg-teal-500">
                  Tên sản phẩm
                </lable>
                <span className="h-[10vh] flex justify-center items-center">
                  {i?.productName}
                </span>
              </div>
              <div className="w-[15%] border-r-2 border-teal-500 flex flex-col">
                <lable className="text-center h-[30px]  font-[500] font-Poppins bg-teal-500">
                  Hình ảnh
                </lable>
                <img
                  className="h-[10vh] object-contain flex justify-center items-center"
                  src={`data:image/jpeg;base64,${i?.imgProduct[0].url}`}
                  alt=""
                />
              </div>
              <div className="w-[15%] border-r-2 border-teal-500 flex flex-col">
                <lable className="text-center h-[30px]  font-[500] font-Poppins bg-teal-500">
                  Mã code
                </lable>
                {i?.discountCode?.map((code, ind) => (
                  <span
                    key={ind}
                    className="h-[30px] flex justify-center items-center"
                  >
                    {code?.code} - {code?.type}
                  </span>
                ))}
              </div>
              <div className="w-[10%] border-r-2 border-teal-500 flex flex-col">
                <lable className="text-center h-[30px]  font-[500] font-Poppins bg-teal-500">
                  Số lượng
                </lable>
                {i?.discountCode?.map((code, ind) => (
                  <span
                    key={ind}
                    className="h-[30px] flex justify-center items-center"
                  >
                    {code?.quantity}
                  </span>
                ))}
              </div>
              <div className="w-[15%] border-r-2 border-teal-500 flex flex-col">
                <lable className="text-center h-[30px]  font-[500] font-Poppins bg-teal-500">
                  Ngày hết hạn
                </lable>
                {i?.discountCode?.map((code, ind) => (
                  <span
                    key={ind}
                    className="h-[30px] flex justify-center items-center"
                  >
                    {code?.dateExp.slice(0, 10)}
                  </span>
                ))}
              </div>
              <div className="w-[20%] border-r-2 border-teal-500 flex flex-col">
                <lable className="text-center h-[30px]  font-[500] font-Poppins bg-teal-500">
                  Phần trăm/Số tiền được giảm
                </lable>
                {i?.discountCode?.map((code, ind) => (
                  <span
                    key={ind}
                    className="h-[30px] flex justify-center items-center"
                  >
                    {code?.value > 100 ? (
                      <i>{formatVietnameseCurrency(code?.value)}</i>
                    ) : (
                      <i>{code?.value}%</i>
                    )}
                  </span>
                ))}
              </div>
              <div className="w-[10%] flex flex-col">
                <lable className="text-center h-[30px]  font-[500] font-Poppins bg-teal-500">
                  Chức năng
                </lable>
                {i?.discountCode?.map((code, ind) => (
                  <div
                    key={ind}
                    className="h-[30px] flex justify-center items-center"
                  >
                    <LuDelete
                      onClick={() => handleDeleteCode(code?.code, i?._id)}
                      className="text-red-500 cursor-pointer hover:scale-[1.1] transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full h-[66vh] flex justify-center items-center">
          Hiện tại chưa có sản phẩm nào có mã khuyến mãi
        </div>
      )}
    </div>
  );
};

export default ManageDiscountCode;
