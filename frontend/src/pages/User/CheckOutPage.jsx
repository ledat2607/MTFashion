import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import CheckOutComponent from "../../components/CheckOutComponent/CheckOutComponent";
import CheckOutStep from "../../components/CheckOutComponent/CheckOutStep";
const CheckOutPage = () => {
  const location = useLocation();
  const { product, price, style, size, quantity } = location.state;
  const data = {
    product,
    price,
    style,
    size,
    quantity,
  };
  return (
    <div className="w-full h-[100vh]">
      <Header />
      <CheckOutStep active={1} />
      <CheckOutComponent data={data} />
      <Footer />
    </div>
  );
};

export default CheckOutPage;
