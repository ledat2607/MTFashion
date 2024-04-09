import React, { useEffect, useState } from "react";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import ProductCard from "../../components/Product/ProductCard";
import { useSelector } from "react-redux";
import { server } from "../../server";
import axios from "axios";

const HotProductPage = () => {
  const [data, setData] = useState([]);
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${server}/products`, {
          withCredentials: true,
        });
        setData(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const sortedData = products?.slice().sort((a, b) => b.sold_out - a.sold_out);
    setData(sortedData);
  }, [products]);

  return (
    <div className="w-full h-screen">
      <Header activeHeading={3} />
      <div className="w-[90%] h-[5vh] mt-4 mx-auto flex items-center">
        <h1 className="text-xl font-[600] uppercase font-Poppins">
          Tất cả sản phẩm
        </h1>
      </div>
      <div className="w-[90%] mx-auto h-[120vh]">
        <ProductCard products={data} />
      </div>
      <Footer />
    </div>
  );
};

export default HotProductPage;
