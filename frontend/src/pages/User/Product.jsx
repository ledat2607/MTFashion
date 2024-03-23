import React, { useEffect, useState } from "react";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import ProductCard from "../../components/Product/ProductCard";
import { FaFilter } from "react-icons/fa";
import { useSelector } from "react-redux";
import { server } from "../../server";
import axios from "axios";
const Product = () => {
  const categoriesData = [
    { title: "Sản phẩm Nam", value: "man" },
    { title: "Sản phẩm Nữ", value: "woman" },
    { title: "Mẹ và bé", value: "mom_son" },
    { title: "Phụ kiện", value: "accessories" },
    { title: "Khác", value: "other" },
  ];
  const [selectedCatgory, setSelectedCategory] = useState("ALL");
  const { products } = useSelector((state) => state.products);
  const [selectedType, setSelectedType] = useState("");
  const [data, setData] = useState([]);
  const [categoriesType, setcategoriesType] = useState([]);
  useEffect(() => {
    if (selectedCatgory) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${server}/type/types-by-category?selectedCategory=${selectedCatgory}`,
            { withCredentials: true }
          );
          setcategoriesType(response.data.types);
        } catch (error) {
          console.error("Error fetching types:", error);
        }
      };

      fetchData();
    }
  }, [selectedCatgory]);
  console.log(categoriesType);
  const handleCategoryChange = (event) => {
    const newCategory = event.target.value;
    setSelectedCategory(newCategory);
    setSelectedType("");
  };
  const handleTypechange = (e) => {
    const newType = e.target.value;
    setSelectedType(newType);
  };
  useEffect(() => {
    const filteredData =
      selectedCatgory === "ALL"
        ? products
        : products?.filter((item) => item?.category === selectedCatgory);
    const finalData =
      selectedType === ""
        ? filteredData
        : filteredData?.filter((item) => item.type === selectedType);
    setData(finalData);
  }, [selectedCatgory, selectedType, products]);
  return (
    <div className="w-full h-screen">
      <Header activeHeading={2} />
      <div className="w-[90%] h-[5vh] mt-4 mx-auto flex items-center">
        <FaFilter size={30} />
        <span className="ml-4 texl-xl font-[600] uppercase font-Poppins">
          Bộ lọc
        </span>
      </div>
      <div className="w-[90%] mx-auto flex">
        <div className="w-[20%]">
          <label className="text-lg font-[400] font-Poppins">
            Danh mục sản phẩm
          </label>
          <select
            className="sm:w-[250px] mt-3 w-[150px] rounded-md shadow-2xl h-[40px] bg-gray-300 text-black"
            value={selectedCatgory}
            onChange={handleCategoryChange}
          >
            <option value="ALL">Tất cả danh mục</option>
            {categoriesData.map((category) => (
              <option key={category.id} value={category.value}>
                {category.title}
              </option>
            ))}
          </select>
        </div>
        <div className="w-[25%]">
          {selectedCatgory !== "ALL" && (
            <div className="w-full flex-col flex">
              <label className="text-lg font-[400] font-Poppins">
                Loại sản phẩm
              </label>
              <select
                className="sm:w-[250px] mt-3 w-[150px] rounded-md shadow-2xl h-[40px] bg-gray-200 text-black"
                value={selectedType}
                onChange={handleTypechange}
              >
                <option>Chọn loại sản phẩm</option>

                {categoriesType[0]?.types?.map((i) => (
                  <option key={i._id} value={i.name}>
                    {i.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>
      <div className="w-[90%] mx-auto h-[120vh]">
        <ProductCard products={data} />
      </div>
      <Footer />
    </div>
  );
};

export default Product;
