import React, { useEffect, useState } from "react";
import Header from "../../components/Layout/Header";
import { productData } from "../../static/data";
import { useParams } from "react-router-dom";
import ProductDetails from "../../components/Product/ProductDetails.jsx";
const ProductPage = () => {
  const [data, setData] = useState(null);
  const { name } = useParams();
  const productName = name.replace(/-/g, "");
  useEffect(() => {
    const data = productData?.find((i) => i?.name === productName);
    setData(data);
  }, [productName]);
  return (
    <div className="max-w-[1900px] mx-auto">
      <Header />
      <ProductDetails data={data} />
    </div>
  );
};

export default ProductPage;
