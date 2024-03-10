import React, { useEffect, useState } from "react";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer.jsx";
import { productData } from "../../static/data";
import { useParams } from "react-router-dom";
import ProductDetails from "../../components/Product/ProductDetails";
import SuggessProduct from "../../components/Product/SuggessProduct";
const ProductPage = () => {
  const [data, setData] = useState(null);
  const { name } = useParams();
  const productName = name.replace(/-/g, "");
  useEffect(() => {
    const data = productData?.find((i) => i?.name === productName);
    setData(data);
  }, [productName]);
  return (
    <div className="max-w-[1900px] mx-auto overflow-x-scroll">
      <Header />
      <ProductDetails data={data} />
      {data && <SuggessProduct data={data} />}
      <Footer />
    </div>
  );
};

export default ProductPage;
