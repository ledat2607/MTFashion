import React, { useEffect, useState } from "react";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer.jsx";
import { useParams } from "react-router-dom";
import ProductDetails from "../../components/Product/ProductDetails";
import SuggessProduct from "../../components/Product/SuggessProduct";
import { useSelector } from "react-redux";
const ProductPage = () => {
  const { products } = useSelector((state) => state.products);
  const [data, setData] = useState(null);
  const { name } = useParams();
  const proname = name.replace(/-/g, "");
  useEffect(() => {
    const data = products?.find((i) => i?.productName === proname);
    setData(data);
  }, [proname, products]);
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
