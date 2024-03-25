import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { server } from "../../../../server";
import axios from "axios";
import { toast } from "react-toastify";
const EventProduct = () => {
  const { products } = useSelector((state) => state.products);
  const [productSale, setProductSale] = useState([]);
  const [openEvent, setOpenEvent] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [bonus, setBonus] = useState("");
  const [total, setTotal] = useState("");
  const [start_date, setStart] = useState("");
  const [end_date, setEnd] = useState("");
  const [start_time, setStartTime] = useState("");
  const [end_time, setEndTime] = useState("");
  const [minEndDate, setMinEndDate] = useState(new Date());
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
  function formatVietnameseCurrency(number) {
    const roundedNumber = Math.round(number / 1000) * 1000;
    const formattedNumber = roundedNumber.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });

    return formattedNumber;
  }
  const changeTotalDiscount = () => {
    if (bonus <= 100) {
      const price = parseInt(productSale?.discountPrice.replace(/\D/g, ""));
      const discount = (price * bonus) / 100;
      setTotal(price - discount);
    } else {
      const price = parseInt(productSale?.discountPrice.replace(/\D/g, ""));
      setTotal(price - bonus);
    }
  };

  const handleChangeStartDate = (e) => {
    const selectedStartDate = new Date(e.target.value);
    const minEndDate = new Date(selectedStartDate);
    minEndDate.setDate(selectedStartDate.getDate() + 3);
    setMinEndDate(minEndDate);
    if (new Date(end_date) < minEndDate) {
      setEnd(minEndDate.toISOString().slice(0, 10));
    }

    setStart(e.target.value);
  };

  const handleChangeEndDate = (e) => {
    setEnd(e.target.value);
  };
  const handleAddEvent = async (id) => {
    const data = {
      id: id,
      bonus: bonus,
      price_on_sale: total,
      start_date: start_date,
      end_date: end_date,
      start_time: start_time,
      end_time: end_time,
    };
    await axios
      .post(
        `${server}/product/create-event-product`,
        { data },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message);
        setTimeout(() => {
          setOpenEvent(false);
        }, 1500);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
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
            <div className="bg-white flex flex-col rounded-md sm:h-[70vh] h-fit sm:w-[50%] w-[90%]">
              <h1 className="text-center text-lg font-Poppins font-[600] uppercase pt-5">
                Thêm mới sản phẩm khuyến mãi
              </h1>
              <div className="w-[90%] mx-auto sm:mt-6 flex justify-center sm:flex-col items-center">
                <div className="w-full flex">
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
                        {products?.map((item, index) => (
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
                        value={productSale && productSale?.discountPrice}
                        className="w-[200px] h-[40px] border-2 rounded-2xl p-2"
                      />
                    </div>
                    <div className="w-full sm:mt-2 flex flex-col pl-4">
                      <div className="w-[60%] flex items-center">
                        <label className="font-[600] font-Poppins text-lg">
                          Giảm thêm
                        </label>
                        <i className="ml-2">
                          {bonus <= 100
                            ? `${bonus}%`
                            : formatVietnameseCurrency(bonus)}
                        </i>
                      </div>
                      <input
                        type="text"
                        value={bonus}
                        onChange={(e) => {
                          setBonus(e.target.value);
                          changeTotalDiscount();
                        }}
                        className="w-[200px] h-[40px] border-2 rounded-2xl p-2"
                      />
                    </div>
                    <div className="w-full sm:mt-4 flex flex-col pl-4">
                      <div className="w-[60%] flex items-center">
                        <label className="font-[600] font-Poppins text-lg">
                          Tổng giảm trong sự kiện
                        </label>
                      </div>
                      <input
                        type="text"
                        value={formatVietnameseCurrency(total)}
                        readOnly
                        className="w-[200px] h-[40px] border-2 rounded-2xl p-2"
                      />
                    </div>
                  </div>
                  <div className="w-[50%]">
                    <div className="w-full flex justify-center items-center rounded-2xl sm:mt-2 flex-col pl-4">
                      <label className="font-[600] font-Poppins text-lg">
                        Hình ảnh sản phẩm
                      </label>
                      {productSale.length !== 0 ? (
                        <img
                          src={`data:image/jpeg;base64, ${
                            productSale && productSale?.imgProduct[0]?.url
                          }`}
                          alt=""
                          className="w-[250px] object-contain rounded-xl h-[250px] sm:pt-6"
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
                <div className="w-full sm:mt-6 flex pl-4">
                  <div className="w-[45%]">
                    <label className="font-[600] font-Poppins text-lg">
                      Ngày bắt đầu
                    </label>
                    <input
                      type="date"
                      value={start_date}
                      onChange={handleChangeStartDate}
                      className="w-[200px] h-[40px] border-2 rounded-2xl p-2 ml-2"
                    />
                  </div>
                  <div className="w-[45%]">
                    <label className="font-[600] font-Poppins text-lg">
                      Ngày kết thúc
                    </label>
                    <input
                      type="date"
                      value={end_date}
                      min={minEndDate?.toISOString().slice(0, 10)}
                      onChange={handleChangeEndDate}
                      className="w-[200px] h-[40px] border-2 rounded-2xl p-2 ml-2"
                    />
                  </div>
                </div>
                <div className="w-full sm:mt-6 flex pl-4">
                  <div className="w-[50%]">
                    <label className="font-[600] font-Poppins text-lg">
                      Thời gian bắt đầu
                    </label>
                    <input
                      type="time"
                      value={start_time}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="w-[200px] h-[40px] border-2 rounded-2xl p-2 ml-2"
                    />
                  </div>
                  <div className="w-[40%]">
                    <label className="font-[600] font-Poppins text-lg">
                      Thời gian
                    </label>
                    <input
                      type="time"
                      value={end_time}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="w-[200px] h-[40px] border-2 rounded-2xl p-2 ml-2"
                    />
                  </div>
                </div>
                <div className="w-full sm:mt-8 h-[40px] flex justify-center items-center">
                  <div
                    onClick={() => setOpenEvent(false)}
                    className="bg-opacity-55 hover:text-white text-lg font-Poppins font-[600] hover:bg-opacity-100 flex justify-center hover:bg-red-500 cursor-pointer transition-transform duration-300 hover:translate-x-2 items-center w-[100px] h-full rounded-xl bg-gray-200"
                  >
                    Hủy
                  </div>
                  <div
                    onClick={() => handleAddEvent(productSale?._id)}
                    className="ml-4 flex hover:text-white text-lg font-Poppins font-[600] bg-teal-300 justify-center items-center w-[100px] h-full rounded-xl hover:bg-blue-500 cursor-pointer transition-transform duration-300 hover:translate-x-2"
                  >
                    Xác nhận
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        {productSale?.length !== 0 ? (
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
