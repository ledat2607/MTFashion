import React, { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { MdRemove } from "react-icons/md";
import axios from "axios";
import { server } from "../../../server";
import { toast } from "react-toastify";
import MyMarkdownEditor from "../../Admin/Manage/Layout/Markdown";
import AllProduct from "../../Admin/Manage/AllProduct";
const ManageProduct = () => {
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [addNew, setAddNew] = useState(false);
  const [imgProduct, setImgProduct] = useState(null);
  const [productCode, setProductCode] = useState(null);
  const [productName, setProductName] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [discountRate, setDiscountRate] = useState("");
  const [arrImg, setArrImg] = useState([]);
  const [arrCode, setArrCode] = useState([]);
  const [mat, setMat] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [stock, setStock] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    "Chọn danh mục sản phẩm..."
  );
  const [selectedCategoryNewType, setSelectedCategoryNewType] = useState(
    "Chọn danh mục sản phẩm..."
  );
  const [selectedType, setSelectedType] = useState("");
  const [newType, setNewType] = useState("");
  const [newTypeTitle, setnewTypeTitle] = useState("");
  const [markdownValue, setMarkdownValue] = useState("");

  // Xử lý sự kiện thay đổi danh mục sản phẩm
  const handleCategoryNewChange = (event) => {
    setSelectedCategoryNewType(event.target.value);
    const selectedTitle = categoriesData.find(
      (item) => item.value === event.target.value
    )?.title;
    setnewTypeTitle(selectedTitle || "");
  };
  //Cập nhật dữ liệu loại cho từng cat
  useEffect(() => {
    if (selectedCategory) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${server}/type/types-by-category?selectedCategory=${selectedCategory}`,
            { withCredentials: true }
          );
          setData(response.data.types);
        } catch (error) {
          console.error("Error fetching types:", error);
        }
      };

      fetchData();
    }
  }, [selectedCategory]);
  //Danh mục sản phẩm
  const categoriesData = [
    { title: "Sản phẩm Nam", value: "man" },
    { title: "Sản phẩm Nữ", value: "woman" },
    { title: "Mẹ và bé", value: "mom_son" },
    { title: "Phụ kiện", value: "accessories" },
    { title: "Khác", value: "other" },
  ];
  //Mở Modal thêm mới sản phẩm
  const handleOpenAddNew = () => {
    setAddNew(!addNew);
  };
  //Load hình ảnh
  const handleChangeImageInput = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64Data = reader.result.split(",")[1];
        setImgProduct(base64Data);
      };

      reader.readAsDataURL(file);
    }
  };
  //Thêm vào mảng
  const handleAddToArray = () => {
    if (imgProduct && productCode) {
      setArrImg([...arrImg, imgProduct]);
      setArrCode([...arrCode, productCode]);
      setImgProduct(null);
      setProductCode("");
    }
  };
  //Xóa ảnh
  const handleRemove = (index) => {
    const updatedArrImg = [...arrImg];
    const updatedArrCode = [...arrCode];

    updatedArrImg.splice(index, 1);
    updatedArrCode.splice(index, 1);

    setArrImg(updatedArrImg);
    setArrCode(updatedArrCode);
  };
  //Định dạng format tiền tệ việt nam
  function formatVietnameseCurrency(number) {
    const roundedNumber = Math.round(number / 1000) * 1000;
    const formattedNumber = roundedNumber.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });

    return formattedNumber;
  }
  //Định dạng input OriginalPrice
  const handleBlurOriginalPrice = () => {
    const formattedPrice = formatVietnameseCurrency(parseFloat(originalPrice));
    setOriginalPrice(formattedPrice);
  };
  //Định dạng input DiscountPrice
  const handleBlurDiscountPrice = () => {
    const preOriginalPrice = originalPrice.replace(/\D/g, "");
    const price = parseFloat(preOriginalPrice);
    const rate = parseFloat(discountRate) / 100;
    const formattedPrice = formatVietnameseCurrency(price - price * rate);
    setDiscountPrice(formattedPrice);
  };
  // Hàm xử lý sự kiện thay đổi danh mục
  const handleChangeType = (event) => {
    setSelectedType(event.target.value);
  };
  const handleAddNewType = () => {
    setOpenModal(!openModal);
  };
  //Thêm mới loại sản phẩm
  const addnewType = async () => {
    await axios
      .post(
        `${server}/type/create-new-type`,
        {
          selectedCategoryNewType,
          newTypeTitle,
          newType,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message);
        setNewType(null);
        setnewTypeTitle("");
        setSelectedCategoryNewType(null);
        setTimeout(() => {
          setOpenModal(!openModal);
        }, 1000);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  const handleChangeCategory = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedType(null);
  };
  //Thêm mới sản phẩm
  const handleAddNewProduct = async () => {
    try {
      await axios
        .post(
          `${server}/product/create-product`,
          {
            productName,
            originalPrice,
            discountPrice,
            discountRate,
            mat,
            stock,
            size,
            color,
            markdownValue,
            selectedCategory,
            selectedType,
            images: arrImg,
            codes: arrCode,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          setTimeout(() => {
            setAddNew(!addNew);
            setArrCode([]);
            setProductName("");
            setColor("");
            setArrImg([]);
            setProductCode("");
            setDiscountPrice("");
            setDiscountRate("");
            setOriginalPrice("");
            setStock("");
            setMat("");
            setMarkdownValue("");
            setSelectedCategory("Chọn danh mục sản phẩm");
            setSelectedType("");
            setSize("");
          }, 1000);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  //markdown
  // Hàm xử lý sự kiện thay đổi giá trị Markdown
  const handleMarkdownChange = (value) => {
    setMarkdownValue(value);
  };
  return (
    <div className="w-full h-full">
      <h1 className="text-center text-xl font-Poppins font-[600] uppercase sm:pb-6">
        Quản lý sản phẩm
      </h1>
      <div className="w-full h-[95%]">
        {/*Add new product*/}
        <div className="w-full h-[40px] flex">
          <div
            onClick={handleOpenAddNew}
            className="w-[200px] text-white font-[600] font-Poppins hover:translate-x-2 transition-transform duration-200 cursor-pointer flex justify-center items-center h-full bg-blue-500 shadow-2xl shadow-gray-800/40 rounded-3xl"
          >
            Thêm mới sản phẩm
          </div>
          {addNew ? (
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-[100]">
              <div className="bg-white flex flex-col rounded-md sm:h-[85vh] h-fit sm:w-[90%] w-[90%]">
                <div className="w-full flex pb-4 ">
                  <div className="w-[15%] pl-2">
                    <input
                      type="file"
                      name="avatar"
                      id="file-input"
                      accept=".jpg,.jpeg,.png"
                      className="sr-only"
                      onChange={handleChangeImageInput}
                    />
                    <label
                      htmlFor="file-input"
                      className="inline-block w-full overflow-hidden rounded-md cursor-pointer"
                    >
                      <div className="flex overflow-hidden justify-center mt-2 h-[10vh] sm:w-full rounded-sm">
                        {imgProduct ? (
                          <img
                            src={`data:image/jpeg;base64,${imgProduct}`}
                            className="h-full sm:w-[4vw] w-[22vw] object-cover rounded-md"
                            alt="img-avatar"
                          />
                        ) : (
                          <div className="flex justify-center items-center rounded-md h-full w-[4vw] border-2 border-blue-500">
                            <CiCirclePlus size={40} color="blue" />
                          </div>
                        )}
                      </div>
                    </label>
                    <input
                      value={productCode}
                      onChange={(e) => setProductCode(e.target.value)}
                      placeholder="Mã sản phẩm..."
                      className="border rounded-lg p-2 border-black"
                    />
                    <div
                      onClick={handleAddToArray}
                      className="flex rounded-xl text-white justify-center items-center w-[50%] mx-auto mt-4 h-[30px] bg-blue-500 hover:cursor-pointer hover:translate-x-3  transition-all duration-300"
                    >
                      Thêm
                    </div>
                  </div>

                  <div className="w-[85%] h-[20vh] flex sm:flex-col sm:mt-4 justify-center items-center">
                    <span className="text-lg font-[600] uppercase">
                      Hình ảnh đã thêm
                    </span>
                    {arrImg.length !== 0 && arrCode.length !== 0 ? (
                      <div className="sm:w-[90%] h-full flex p-2">
                        {arrImg.map((img, index) => (
                          <div
                            key={index}
                            className="flex sm:flex-col items-center relative"
                          >
                            <img
                              src={`data:image/jpeg;base64,${img}`}
                              className="w-[80px] ml-3 h-[100px] rounded-lg shadow-xl"
                              alt={`img-${index}`}
                            />
                            <span className="text-md font-[500]">
                              {arrCode[index]}
                            </span>
                            <div
                              onClick={() => handleRemove(index)}
                              className="absolute transition-all duration-300 cursor-pointer hover:-right-6 z-[100] hover:w-[35px] hover:h-[35px] hover:-top-4 hover:border-2 hover:border-green-500 hover:bg-white hover:text-black flex justify-center items-center w-[25px] h-[25px] rounded-full bg-gray-500 -top-2 -right-2"
                            >
                              <MdRemove size={20} />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="w-[90%] h-full flex justify-center items-center">
                        Chưa có hình ảnh nào được thêm
                      </div>
                    )}
                  </div>
                </div>
                <div className="w-full">
                  <form>
                    <div className="w-[100%] flex">
                      <div className="w-[50%]">
                        <div className="w-full flex">
                          <div className="w-[40%] flex flex-col p-2 h-[10vh]">
                            <label className="text-xl font-Poppins font-[600]">
                              Tên sản phẩm
                            </label>
                            <input
                              type="text"
                              value={productName}
                              onChange={(e) => setProductName(e.target.value)}
                              placeholder="Tên sản phẩm..."
                              className="border-2  focus:outline-none bg-gray-200 focus:bg-gray-100 mt-2 w-[250px] h-[40px] rounded-lg p-2"
                            />
                          </div>
                          <div className="w-[50%] flex flex-col p-2 h-[10vh]">
                            <label className="text-xl font-Poppins font-[600]">
                              Số lượng nhập kho
                            </label>
                            <input
                              type="number"
                              value={stock}
                              onChange={(e) => setStock(e.target.value)}
                              placeholder="Số lượng kho..."
                              className="border-2  focus:outline-none bg-gray-200 focus:bg-gray-100 mt-2 w-[150px] h-[40px] rounded-lg p-2"
                            />
                          </div>
                        </div>
                        <div className="w-[100%] h-[10vh] flex">
                          <div className="w-[40%] flex flex-col p-2 h-[10vh]">
                            <label className="text-xl font-Poppins font-[600]">
                              Giá gốc sản phẩm
                            </label>
                            <input
                              value={originalPrice}
                              onChange={(e) => setOriginalPrice(e.target.value)}
                              onBlur={handleBlurOriginalPrice}
                              placeholder="Giá gốc..."
                              className="border-2  focus:outline-none bg-gray-200 focus:bg-gray-100 mt-2 w-[250px] h-[40px] rounded-lg p-2"
                            />
                          </div>
                          <div className="w-[60%] flex flex-col p-2 h-[10vh]">
                            <label className="text-xl font-Poppins font-[600]">
                              Phần trăm giảm
                            </label>
                            <input
                              value={discountRate}
                              onChange={(e) => setDiscountRate(e.target.value)}
                              placeholder="Phần trăm giảm..."
                              className="border-2  focus:outline-none bg-gray-200 focus:bg-gray-100 mt-2 w-[250px] h-[40px] rounded-lg p-2"
                            />
                          </div>
                        </div>
                        <div className="w-[100%] flex">
                          <div className="w-[40%] flex flex-col p-2 h-[10vh]">
                            <label className="text-xl font-Poppins font-[600]">
                              Giá khuyến mãi sản phẩm
                            </label>
                            <input
                              readOnly
                              value={discountPrice}
                              onChange={(e) =>
                                setDiscountPrice(
                                  originalPrice - originalPrice * discountRate
                                )
                              }
                              onBlur={handleBlurDiscountPrice}
                              placeholder="Giá khuyến mãi..."
                              className="border-2  focus:outline-none bg-gray-200 focus:bg-gray-100 mt-2 w-[250px] h-[40px] rounded-lg p-2"
                            />
                          </div>
                          <div className="w-[40%] flex flex-col p-2 h-[10vh]">
                            <label className="text-xl font-Poppins font-[600]">
                              Size sản phẩm
                            </label>
                            <input
                              type="text"
                              value={size}
                              onChange={(e) => setSize(e.target.value)}
                              placeholder="Size sản phẩm..."
                              className="border-2  focus:outline-none bg-gray-200 focus:bg-gray-100 mt-2 w-[150px] h-[40px] rounded-lg p-2"
                            />
                          </div>
                        </div>

                        <div className="w-[80%] h-[10vh] flex justify-center items-center">
                          <div className="w-[50%] flex flex-col p-2 h-[10vh]">
                            <label className="text-xl font-Poppins font-[600]">
                              Chọn danh mục sản phẩm
                            </label>
                            <select
                              className="w-[200px] h-[40px] border p-2 rounded-xl"
                              value={selectedCategory}
                              onChange={handleChangeCategory}
                            >
                              <option value="">Chọn danh mục...</option>
                              {categoriesData.map((item, index) => (
                                <option key={index} value={item.value}>
                                  {item.title}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="w-[40%] flex flex-col p-2 h-[10vh]">
                            <label className="text-xl font-Poppins font-[600]">
                              Chọn loại sản phẩm
                            </label>
                            <select
                              className="w-[200px] h-[40px] border p-2 rounded-xl"
                              value={selectedType}
                              onChange={handleChangeType}
                            >
                              {data.length > 0 &&
                                data[0].types.map((item, index) => (
                                  <option key={index} value={item.name}>
                                    {item.name}
                                  </option>
                                ))}
                            </select>
                          </div>
                          <div
                            onClick={handleAddNewType}
                            className="w-[10%] cursor-pointer hover:text-white hover:bg-blue-500 hover:translate-x-2 transition-transform duration-300 sm:mt-6 flex justify-center items-center h-[40px] bg-blue-300 rounded-2xl"
                          >
                            Add
                          </div>
                          {openModal ? (
                            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-[100]">
                              <div className="bg-white rounded-md sm:h-[30vh] h-fit sm:w-[45%] w-[90%]">
                                <h1 className="text-2xl font-[600] font-Poppins uppercase text-center sm:mt-6">
                                  Thêm mới loại sản phẩm
                                </h1>
                                <div className="w-full flex">
                                  <div className="w-[45%] flex flex-col p-2 h-[10vh]">
                                    <label className="text-xl font-Poppins font-[600]">
                                      Chọn danh mục sản phẩm
                                    </label>
                                    <select
                                      className="w-[200px] h-[40px] border p-2 rounded-xl"
                                      value={selectedCategoryNewType}
                                      onChange={handleCategoryNewChange}
                                    >
                                      <option value="">Chọn danh mục...</option>
                                      {categoriesData.map((item, index) => (
                                        <option key={index} value={item.value}>
                                          {item.title}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                  <div className="w-[45%] flex flex-col p-2 h-[10vh]">
                                    <label className="text-xl font-Poppins font-[600]">
                                      Tên loại
                                    </label>
                                    <input
                                      type="text"
                                      value={newType}
                                      onChange={(e) =>
                                        setNewType(e.target.value)
                                      }
                                      placeholder="Tên loại sản phẩm..."
                                      className="border-2  focus:outline-none bg-gray-200 focus:bg-gray-100 mt-2 w-[400px] h-[40px] rounded-lg p-2"
                                    />
                                  </div>
                                </div>
                                <div className="w-full sm:mt-6 flex justify-center items-center">
                                  <div
                                    onClick={addnewType}
                                    className="flex mr-4 text-lg font-[500] font-Poppins hover:text-white justify-center items-center w-[150px] h-[40px] rounded-2xl bg-blue-300 hover:bg-blue-500 cursor-pointer hover:translate-x-2 transition-transform duration-300 "
                                  >
                                    Thêm mới
                                  </div>
                                  <div
                                    onClick={handleAddNewType}
                                    className="opacity-60 hover:opacity-100 flex mr-4 text-lg font-[500] font-Poppins hover:text-white justify-center items-center w-[150px] h-[40px] rounded-2xl bg-red-300 hover:bg-red-500 cursor-pointer hover:translate-x-2 transition-transform duration-300 "
                                  >
                                    Đóng
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : null}
                        </div>
                        <div className="w-[80%] h-[10vh] flex justify-center items-center">
                          <div className="w-[50%] flex flex-col p-2 h-[10vh]">
                            <label className="text-xl font-Poppins font-[600]">
                              Chất liệu sản phẩm
                            </label>
                            <input
                              value={mat}
                              onChange={(e) => setMat(e.target.value)}
                              placeholder="Chất liệu sản phẩm..."
                              className="border-2  focus:outline-none bg-gray-200 focus:bg-gray-100 mt-2 w-[250px] h-[40px] rounded-lg p-2"
                            />
                          </div>
                          <div className="w-[50%] flex flex-col p-2 h-[10vh]">
                            <label className="text-xl font-Poppins font-[600]">
                              Màu sắc
                            </label>
                            <input
                              value={color}
                              onChange={(e) => setColor(e.target.value)}
                              placeholder="Màu sắc sản phẩm..."
                              className="border-2  focus:outline-none bg-gray-200 focus:bg-gray-100 mt-2 w-[250px] h-[40px] rounded-lg p-2"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="w-[50%] h-full">
                        <label className="text-xl font-[600] font-Poppins uppercase">
                          Mô tả sản phẩm
                        </label>
                        <MyMarkdownEditor onChange={handleMarkdownChange} />
                      </div>
                    </div>
                  </form>
                </div>
                <div className="w-full sm:mt-4 flex justify-center">
                  <div
                    onClick={handleOpenAddNew}
                    className="sm:w-[80px] sm:mr-6 h-[40px] opacity-35 hover:bg-red-400 cursor-pointer hover:opacity-100 hover:translate-x-3 transition-all duration-300 bg-gray-300 flex justify-center items-center rounded-2xl"
                  >
                    Đóng
                  </div>
                  <div
                    onClick={handleAddNewProduct}
                    className="sm:w-[100px] duration-300 transition-all hover:translate-x-3 text-lg font-[500] text-white hover:text-black hover:bg-white hover:border-teal-500 border-2 cursor-pointer sm:h-[40px] rounded-2xl flex justify-center items-center bg-blue-500"
                  >
                    Thêm mới
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
        {/*Product*/}
        <div className="w-[100%] pt-2 h-[92%]">
          <AllProduct />
        </div>
      </div>
    </div>
  );
};

export default ManageProduct;
