import React, { useState } from "react";
import { useSelector } from "react-redux";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";
import axios from "axios";
import { server } from "../../../server";
import { toast } from "react-toastify";
import { useEffect } from "react";
import Store from "../../../redux/store";
import { getAllPRoduct } from "../../../redux/action/productAction";

const AllProduct = () => {
  const { products } = useSelector((state) => state.products);
  const [id, setId] = useState(null);
  useEffect(() => {
    Store.dispatch(getAllPRoduct());
  }, [products]);
  //Phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const [openDelModal, setOpenDelModal] = useState(false);
  const handleDelete = (productId) => {
    setId(productId);
    setOpenDelModal(true);
  };

  const handleConfirmDel = async () => {
    if (!id) return;
    try {
      await axios
        .post(
          `${server}/product/delete-product`,
          { id },
          { withCredentials: true }
        )
        .then((res) => {
          toast.success(res.data.message);
          setOpenDelModal(false);
        });
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };
  return (
    <div>
      {currentProducts.length !== 0 ? (
        <div className="w-full h-[15vh] flex sm:flex-col">
          {currentProducts?.map((i, index) => (
            <div className="w-full h-full flex sm:mb-6 border-b-2 shadow-2xl border-gray-600 rounded-b-xl">
              <div className="w-[15%] flex sm:flex-col h-full overflow-hidden">
                <div className="bg-white h-[4vh] justify-center flex items-center text-black font-[600] font-Poppins">
                  <h1>Tên sản phẩm</h1>
                </div>
                <div
                  key={index}
                  className="h-[11vh] w-full p-2 flex justify-center items-center"
                >
                  <p className="text-center">{i.productName}</p>
                </div>
              </div>
              <div className="w-[15%] flex sm:flex-col h-full">
                <div className="bg-white h-[4vh] justify-center flex items-center text-black font-[600] font-Poppins">
                  <h1>Hình ảnh</h1>
                </div>
                <div
                  key={index}
                  className="h-[10vh] flex justify-center items-center"
                >
                  <img
                    src={`data:image/jpeg;base64,${i.imgProduct[0]?.url}`}
                    alt=""
                    className="h-full object-contain mt-1"
                  />
                </div>
              </div>
              <div className="w-[15%] flex sm:flex-col h-full overflow-hidden">
                <div className="bg-white h-[4vh] justify-center flex items-center text-black font-[600] font-Poppins">
                  <h1>Giá gốc</h1>
                </div>
                <div
                  key={index}
                  className="h-[10vh] flex justify-center items-center"
                >
                  {i.originalPrice}
                </div>
              </div>
              <div className="w-[15%] flex sm:flex-col h-full overflow-hidden">
                <div className="bg-white h-[4vh] justify-center flex items-center text-black font-[600] font-Poppins">
                  <h1>Giá bán</h1>
                </div>
                <div
                  key={index}
                  className="h-[10vh] flex justify-center items-center"
                >
                  {i.discountPrice}
                </div>
              </div>
              <div className="w-[15%] flex sm:flex-col h-full overflow-hidden">
                <div className="bg-white h-[4vh] justify-center flex items-center text-black font-[600] font-Poppins">
                  <h1>Phần trăm giảm (%)</h1>
                </div>
                <div
                  key={index}
                  className="h-[10vh] flex justify-center items-center"
                >
                  {i.discountRate}
                </div>
              </div>
              <div className="w-[15%] flex sm:flex-col h-full overflow-hidden">
                <div className="bg-white h-[4vh] justify-center flex items-center text-black font-[600] font-Poppins">
                  <h1>Số lượng kho</h1>
                </div>
                <div
                  key={index}
                  className="h-[10vh] flex justify-center items-center"
                >
                  {i.stock}
                </div>
              </div>
              <div className="w-[10%] flex sm:flex-col h-full overflow-hidden">
                <div className="bg-white h-[4vh] justify-center flex items-center text-black font-[600] font-Poppins"></div>
                <div className="h-[10vh] flex justify-center items-center">
                  <CiEdit
                    size={25}
                    className=" cursor-pointer hover:-translate-x-2 transition-transform duration-300"
                  />
                  <MdOutlineDeleteOutline
                    onClick={() => handleDelete(i?._id)}
                    size={25}
                    className="ml-2 cursor-pointer hover:translate-x-2 transition-transform duration-300"
                  />
                  {openDelModal ? (
                    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-[100]">
                      <div className="bg-white flex flex-col justify-center items-center rounded-md sm:h-[20vh] h-fit sm:w-[40%] w-[90%]">
                        <h1 className="text-center font-[600] font-Poppins sm:text-xl">
                          Bạn có chắc muốn xóa sản phẩm này ?
                        </h1>
                        <div className="w-full flex justify-center items-center sm:mt-6">
                          <div
                            onClick={handleConfirmDel}
                            className="sm:w-[100px] text-lg font-[600] text-gray-300 hover:translate-x-2 transition-transform duration-300 h-[30px] rounded-xl cursor-pointer bg-red-500 opacity-20 hover:opacity-100 flex justify-center items-center"
                          >
                            Xác nhận
                          </div>
                          <div
                            onClick={() => setOpenDelModal(false)}
                            className="sm:w-[100px] text-lg font-[600] text-gray-300 hover:translate-x-2 transition-transform duration-300 sm:ml-4 h-[30px] rounded-xl cursor-pointer bg-blue-500 flex justify-center items-center"
                          >
                            Đóng
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
          {products.length > productsPerPage && (
            <div className="flex justify-center mt-4">
              {[...Array(Math.ceil(products.length / productsPerPage))].map(
                (_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`mr-2 px-3 py-1 rounded-md bg-gray-200 ${
                      currentPage === index + 1 ? "bg-gray-400" : ""
                    }`}
                  >
                    {index + 1}
                  </button>
                )
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="w-full h-[62vh] flex justify-center items-center">
          Chưa có sản phẩm nào
        </div>
      )}
    </div>
  );
};

export default AllProduct;
