import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { server } from "../../../../server";
import axios from "axios";
import { toast } from "react-toastify";
import { MdFilterList } from "react-icons/md";
import { TiDeleteOutline } from "react-icons/ti";
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
  const [data, setData] = useState([]);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  //phân trang
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const itemsPerPage = 3;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handleOpenNewEvent = () => {
    setOpenEvent(!openEvent);
  };
  const handleChangeProduct = (e) => {
    setSelectedProduct(e.target.value);
  };
  //get product running sale
  useEffect(() => {
    const products_on_sale = products?.filter(
      (product) => product?.isOnSale.status === true
    );
    setData(products_on_sale);
  }, [products]);
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
    const updatedBonus = parseInt(bonus); // Cập nhật giá trị bonus
    const price = parseInt(productSale?.discountPrice?.replace(/\D/g, ""));
    let calculatedTotal = price;
  
    if (!isNaN(updatedBonus) && updatedBonus >= 0) {
      if (updatedBonus <= 100) {
        const bonusPercentage = parseFloat(updatedBonus) / 100;
        const discount = price * bonusPercentage;
        calculatedTotal = price - discount;
      } else {
        // Xử lý trường hợp bonus lớn hơn 100
        calculatedTotal = price - updatedBonus;
      }
    }
  
    setTotal(calculatedTotal);
  };
  
  useEffect(() => {
    changeTotalDiscount();
  }, [bonus]);

  const handleClose = () => {
    setOpenEvent(false);
    setBonus(0);
    setTotal("");
    setStart("");
    setStartTime("");
    setEnd("");
    setEndTime("");
    setSelectedProduct("");
    setProductSale("");
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
          setBonus("");
          setEndTime("");
          setStartTime("");
          setStart("");
          setEnd("");
          setSelectedProduct("");
        }, 1500);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  const openComfirmDeleteEvent = () => {
    setOpenConfirm(!openConfirm);
  };
  const dateNow = new Date();
  const day = dateNow.getDate();
  const month = dateNow.getMonth() + 1;
  const year = dateNow.getFullYear();
  const formattedDate = `${year}-${month < 10 ? "0" + month : month}-${
    day < 10 ? "0" + day : day
  }`;
  const handleDeleteEvent = async (id) => {
    await axios
      .post(`${server}/product/delete-event`, { id }, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        setTimeout(() => {
          setOpenConfirm(false);
        }, 1500);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  return (
    <div className="w-full h-[100%]">
      <div className="sm:w-[95%] w-full h-[85vh] mx-auto">
        <div className="sm:text-2xl font-Poppins font-[600] uppercase flex justify-center items-center w-full">
          Quản lý khuyến mãi
        </div>

        <div className="w-full sm:mt-4 flex">
          <div
            onClick={handleOpenNewEvent}
            className="w-[200px] text-lg font-Poppins cursor-pointer hover:translate-x-2 hover:text-white transition-transform duration-300 h-[40px] bg-blue-500 flex justify-center items-center rounded-2xl"
          >
            Thêm mới
          </div>
          <div className="w-[80%] sm:ml-8 flex h-[40px]">
            <div className="w-[15%] flex">
              <MdFilterList size={30} />
              <span className="text-lg font-[600] font-Poppins">Bộ lọc</span>
            </div>
            <div className="w-[75%]">
              <select className="w-[200px] border-2 rounded-2xl h-[30px]">
                <option value={""}>Chọn thuộc tính lọc...</option>
                <option value={"Đang diễn ra"}>Đang diễn ra</option>
                <option value={"Đã kết thúc"}>Đã kết thúc</option>
              </select>
            </div>
          </div>
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
                    onClick={handleClose}
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
        {data?.length !== 0 ? (
          <>
            <div className="w-full h-[76vh] flex flex-col">
              {currentItems
                ?.sort(
                  (a, b) =>
                    new Date(b?.isOnSale?.finish_date) -
                    new Date(a?.isOnSale?.finish_date)
                )
                .map((i, index) => (
                  <div
                    key={index}
                    className="w-full sm:mt-4 border-r-2 border-l-2 mb-4 shadow-xl rounded-xl border-teal-500 border-b-2 flex justify-center items-center "
                  >
                    <div className="w-[18%] h-[18vh] flex flex-col">
                      <label className="text-center h-[35px] bg-teal-400 rounded-tl-xl">
                        Hình ảnh
                      </label>
                      <img
                        src={`data:image/jpeg;base64,${i?.imgProduct[0]?.url}`}
                        alt=""
                        className="w-[90px] h-[12vh] pt-2 object-contain mx-auto"
                      />
                    </div>
                    <div className="w-[18%]  h-[18vh] flex flex-col">
                      <label className="h-[35px] text-center bg-teal-400">
                        Tên sản phẩm
                      </label>
                      <span className="w-full flex justify-center items-center h-[12vh]">
                        {i?.productName}
                      </span>
                    </div>
                    <div className="w-[18%]  h-[18vh] flex flex-col">
                      <label className="h-[35px] text-center bg-teal-400">
                        Ngày bắt đầu
                      </label>
                      <span className="w-full flex justify-center items-center h-[12vh]">
                        {i?.isOnSale?.start_date.slice(0, 10)}:{" "}
                        {i?.isOnSale?.start_time}
                      </span>
                    </div>
                    <div className="w-[18%] h-[18vh] flex flex-col">
                      <label className="h-[35px] text-center bg-teal-400">
                        Ngày kết thúc
                      </label>
                      <span className="w-full flex justify-center items-center h-[12vh]">
                        {i?.isOnSale?.finish_date.slice(0, 10)}:{" "}
                        {i?.isOnSale?.finish_time}
                      </span>
                    </div>
                    <div className="w-[18%]  h-[18vh] flex flex-col">
                      <label className="h-[35px] text-center bg-teal-400">
                        Giá khuyến mãi
                      </label>
                      <span className="w-full flex justify-center items-center h-[12vh]">
                        {formatVietnameseCurrency(i?.isOnSale?.price_sale)}
                      </span>
                    </div>
                    <div className="w-[18%]  h-[18vh] flex flex-col">
                      <label className="h-[35px] text-center bg-teal-400">
                        Trạng thái
                      </label>
                      <span className="w-full flex justify-center items-center h-[12vh]">
                        {i?.isOnSale?.start_date.slice(0, 10) === formattedDate
                          ? "Đang diễn ra"
                          : i?.isOnSale?.finish_date.slice(0, 10) <
                            formattedDate
                          ? "Đã kết thúc"
                          : "Chưa diễn ra"}
                      </span>
                    </div>
                    <div className="w-[10%]  h-[18vh] flex flex-col items-center">
                      <div className="h-[35px] w-[100%] text-center bg-teal-400 rounded-tr-xl"></div>
                      <span className="w-full flex justify-center items-center h-[12vh]">
                        <TiDeleteOutline
                          onClick={openComfirmDeleteEvent}
                          size={25}
                          className="cursor-pointer hover:text-red-500 hover:scale-[1.2] transition-transform duration-300"
                        />
                      </span>
                    </div>
                    {openConfirm ? (
                      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-[100]">
                        <div className="bg-white rounded-md sm:h-[20vh] flex justify-center items-center flex-col h-fit sm:w-[35%] w-[90%]">
                          <h1 className="text-center font-[600] font-Poppins sm:text-xl uppercase">
                            Bạn có chắc muốn xóa sự kiện này ?
                          </h1>
                          <div className="w-[45%] mx-auto sm:mt-8 flex justify-between items-center">
                            <div className="cursor-pointer w-[100px] h-[40px] bg-red-400 bg-opacity-60 flex justify-center items-center rounded-2xl">
                              Đóng
                            </div>
                            <div
                              onClick={() => handleDeleteEvent(i?._id)}
                              className="cursor-pointer w-[150px] h-[40px] bg-blue-400 flex justify-center items-center rounded-2xl"
                            >
                              Xác nhận
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                ))}
              <ul className="flex justify-center mt-4">
                {pageNumbers.map((number) => (
                  <li
                    key={number}
                    className={`mr-2 px-3 py-1 cursor-pointer ${
                      currentPage === number
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200"
                    }`}
                    onClick={() => paginate(number)}
                  >
                    {number}
                  </li>
                ))}
              </ul>
            </div>
          </>
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
