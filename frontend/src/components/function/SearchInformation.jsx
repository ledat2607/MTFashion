import React, { useState } from "react";
import { productData } from "../../static/data";
import { Link } from "react-router-dom";

const SearchInformation = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchData, setSearchData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts = productData.filter((product) =>
      product.name.toLocaleLowerCase().includes(term.toLocaleLowerCase())
    );
    setSearchData(filteredProducts);
  };
  const inputWidth = isFocused ? "60%" : "30%";

  return (
    <div
      style={{ width: inputWidth }}
      className="h-[40px] transition-all duration-300 relative"
    >
      <input
        placeholder="Tìm kiếm"
        className="focus:placeholder:text-white w-full rounded-lg h-full p-2 bg-transparent focus:outline-none"
        onFocus={handleFocus}
        value={searchTerm}
        onChange={handleSearchChange}
        onBlur={handleBlur}
      />
      {searchTerm && searchData && searchData.length !== 0 ? (
        <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
          {searchData?.map((i, index) => {
            const d = i.name;
            const Product_name = d.replace(/\s+/g, "-");
            return (
              <Link to={`/product/${Product_name}`}>
                <div className="w-full flex items-start py-3">
                  <img
                    src={i.image_Url[0].url}
                    alt=""
                    className="w-[40px] h-[40px] mr-1"
                  />
                  <h1>{i.name}</h1>
                </div>
              </Link>
            );
          })}
        </div>
      ) : null}
      <div className="h-[1px] w-full bg-white"></div>
    </div>
  );
};

export default SearchInformation;
