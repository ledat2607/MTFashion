import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard.jsx";
import { useSelector } from "react-redux";
import { server } from "../../server.js";
import axios from "axios";

const Product = () => {
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSort, setSelectedSort] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { products } = useSelector((state) => state.products);
  const sortedProduct =
    products &&
    products
      .slice()
      .sort(
        (a, b) =>
          new Date(b?.createdAt?.slice(0, 10)) -
          new Date(a?.createdAt?.slice(0, 10))
      );

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = sortedProduct?.slice(startIndex, endIndex);
  const totalPages = Math.ceil(products?.length / itemsPerPage);
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const categoriesData = [
    { title: "Sản phẩm Nam", value: "man" },
    { title: "Sản phẩm Nữ", value: "woman" },
    { title: "Mẹ và bé", value: "mom_son" },
    { title: "Phụ kiện", value: "accessories" },
    { title: "Khác", value: "other" },
  ];
  const priceData = [
    { title: "Thấp -> Cao", value: "incre" },
    { title: "Cao -> Thấp", value: "decre" },
  ];
  const handleCheckboxClick = (value) => {
    setSelectedCategory((prevValue) => (prevValue === value ? "" : value));

    if (selectedCategory === value) {
      setSelectedCategory("");
      setFilteredProducts([]);
      return;
    }
    if (!value) {
      return;
    }
    const filtered = products.filter((product) => product.category === value);
    setFilteredProducts(filtered);
  };

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
  const handleFilter = (cat, type) => {
    if (selectedCategory !== " ") {
      const filtered = products.filter(
        (product) => product.category === cat && product.type === type
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  };
  const handleShortData = (value) => {
    setSelectedSort(value);
    const sortedProducts = [...products];
    if (value === "incre") {
      sortedProducts.sort((a, b) => {
        const priceA = parseFloat(a.discountPrice.replace(/[.,đ]/g, ""));
        const priceB = parseFloat(b.discountPrice.replace(/[.,đ]/g, ""));
        return priceA - priceB;
      });
    } else if (value === "decre") {
      sortedProducts.sort((a, b) => {
        const priceA = parseFloat(a.discountPrice.replace(/[.,đ]/g, ""));
        const priceB = parseFloat(b.discountPrice.replace(/[.,đ]/g, ""));
        return priceB - priceA;
      });
    }
    setFilteredProducts(sortedProducts);
  };

  console.log(products);
  return (
    <div className="w-full mt-8 mx-auto">
      <div className="w-[100%]">
        <h1 className="uppercase text-center md:text-[2rem] font-Poppins font-[700]">
          Sản phẩm
        </h1>
        <div className="w-full pb-8 mt-6 min-h-screen flex justify-center">
          <div className="w-[15%] min-h-screen  p-6">
            <h1 className="text-lg font-[600] font-Poppins uppercase">
              Bộ lọc sản phẩm
            </h1>
            <div className="w-full border-2 border-blue-500 relative mt-[15%] rounded-lg">
              <h1 className="absolute text-blue-500 -top-4 left-4 w-max bg-white text-md font-Poppins font-[600]">
                Theo loại sản phẩm
              </h1>
              <div className="w-full h-full mt-3 p-3 flex justify-center flex-col">
                {categoriesData?.map((category, index) => (
                  <div key={index} className="mb-2">
                    <input
                      type="checkbox"
                      onChange={() => handleCheckboxClick(category.value)}
                      checked={selectedCategory === category.value}
                    />
                    <b className="ml-2" value={category.value}>
                      {category.title}
                    </b>
                    {data?.length !== 0 &&
                      selectedCategory === category.value && (
                        <div className="w-full h-full flex justify-between items-center">
                          {data[0]?.types?.map((type, ind) => (
                            <div
                              onClick={() =>
                                handleFilter(category.value, type.name)
                              }
                              key={ind}
                              className="w-[45%] cursor-pointer rounded-2xl h-[40px] flex items-center justify-center bg-slate-400 text-white"
                            >
                              {type.name}
                            </div>
                          ))}
                        </div>
                      )}
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full border-2 mt-[15%] border-blue-500 relative rounded-lg">
              <h1 className="absolute -top-4 left-4 w-max bg-white text-blue-500 text-md font-Poppins font-[600]">
                Theo giá
              </h1>
              <div className="w-full h-full mt-3 p-3 flex justify-center flex-col">
                {priceData?.map((price, index) => (
                  <div key={index} className="mb-2">
                    <input
                      type="checkbox"
                      onChange={() => handleShortData(price.value)}
                      checked={selectedSort === price.value}
                    />
                    <b className="ml-2" value={price.value}>
                      {price.title}
                    </b>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-[80%]">
            {filteredProducts.length !== 0 ? (
              <ProductCard products={filteredProducts} />
            ) : (
              <ProductCard products={currentProducts} />
            )}
          </div>
        </div>
        <div className="mt-4 ml-12">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={`mr-2 px-3 py-2 rounded ${
                currentPage === index + 1
                  ? "bg-gray-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
