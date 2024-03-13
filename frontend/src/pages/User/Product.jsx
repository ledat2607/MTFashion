import React, { useEffect, useState } from "react";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import { categories, productData } from "../../static/data";
import ProductCard from "../../components/Product/ProductCard";
import { FaFilter } from "react-icons/fa";
const Product = () => {
  const [selectedCatgory, setSelectedCategory] = useState("ALL");
  const [selectedType, setSelectedType] = useState("");
  const [data, setData] = useState([]);
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
        ? productData
        : productData?.filter((item) => item?.category === selectedCatgory);
    const finalData =
      selectedType === ""
        ? filteredData
        : filteredData?.filter((item) => item.type === selectedType);
    setData(finalData);
  }, [selectedCatgory, selectedType]);
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
            {categories.map((category) => (
              <option key={category.id} value={category.value}>
                {category.name}
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

                {categories
                  .find((category) => category.value === selectedCatgory)
                  ?.type?.map((type) => (
                    <option key={type.idType} value={type.valueType}>
                      {type.nameType}
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
