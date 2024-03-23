import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { server } from "../../../../server";
import axios from "axios";

const EventProduct = () => {
  const { products } = useSelector((state) => state.products);
  const [productSale, setProductSale] = useState([]);
  const [openEvent, setOpenEvent] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [price_sell, setPrice_sell] = useState(
    productSale && productSale?.discountPrice
  );
  const handleOpenNewEvent = () => {
    setOpenEvent(!openEvent);
  };
  const handleChangeProduct = (e) => {
    setSelectedProduct(e.target.value);
  };
  //get information product
  useEffect(() => {
    if (selectedProduct) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${server}/product/get-produc-info?selectedProduct=${selectedProduct}`,
            { withCredentials: true }
          );
          setProductSale(response.data.productData);
        } catch (error) {
          console.error("Error fetching types:", error);
        }
      };

      fetchData();
    }
  }, [selectedProduct]);
  //Cập nhật giá bán
  useEffect(() => {
    if (productSale && productSale?.discountPrice) {
      setPrice_sell(productSale.discountPrice);
    }
  }, [productSale]);
  console.log(productSale);
  return (
    <div className="w-full h-[100%]">
      <div className="sm:w-[90%] w-full h-full mx-auto">
        <div className="sm:text-2xl font-Poppins font-[600] uppercase flex justify-center items-center w-full">
          Quản lý khuyến mãi
        </div>
        <div
          onClick={handleOpenNewEvent}
          className="w-[200px] text-lg font-Poppins cursor-pointer hover:translate-x-2 hover:text-white transition-transform duration-300 h-[40px] bg-blue-500 flex justify-center items-center rounded-2xl"
        >
          Thêm mới
        </div>
        {openEvent ? (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-[100]">
            <div className="bg-white flex flex-col rounded-md sm:h-[60vh] h-fit sm:w-[70%] w-[90%]">
              <h1 className="text-center text-lg font-Poppins font-[600] uppercase pt-5">
                Thêm mới sản phẩm khuyến mãi
              </h1>
              <div className="w-[70%] mx-auto sm:mt-6 flex justify-center items-center">
                <div className="w-[50%]">
                  <div className="w-full flex flex-col pl-4">
                    <label className="font-[600] font-Poppins text-lg">
                      Chọn sản phẩm khuyến mãi
                    </label>
                    <select
                      className="w-[200px] h-[40px] border p-2 rounded-xl"
                      value={selectedProduct}
                      onChange={handleChangeProduct}
                    >
                      <option value="">Chọn sản phẩm...</option>
                      {products.map((item, index) => (
                        <option key={index} value={item?._id}>
                          {item.productName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="w-full sm:mt-2 flex flex-col pl-4">
                    <label className="font-[600] font-Poppins text-lg">
                      Giá bán
                    </label>
                    <input
                      type="text"
                      value={price_sell}
                      className="w-[200px] h-[40px] border-2 rounded-2xl p-2"
                    />
                  </div>
                </div>
                <div className="w-[50%]">
                  <div className="w-full flex justify-center items-center sm:mt-2 flex-col pl-4">
                    <label className="font-[600] font-Poppins text-lg">
                      Hình ảnh sản phẩm
                    </label>
                    <img
                      src={`data:image/jpeg;base64, ${productSale?.imgProduct[0].url}`}
                      alt=""
                      className="w-[100px]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        {productSale.length !== 0 ? (
          <></>
        ) : (
          <div className="w-full h-[70vh] justify-center items-center flex">
            <span className="text-lg font-Poppins text-[600]">
              Chưa có sản phẩm khuyến mãi
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventProduct;
