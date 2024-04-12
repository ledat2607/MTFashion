import React from "react";
import Header from "../../components/Layout/Header";
import CheckOutStep from "../../components/CheckOutComponent/CheckOutStep";
import Footer from "../../components/Layout/Footer";
import { useLocation } from "react-router-dom";
import Payment from "../../components/CheckOutComponent/Payment";
const PaymentPage = () => {
  const location = useLocation();
  const { dataUser, dataAddress, dataProduct, appliedCodes } = location.state;
  const data = {
    dataUser,
    dataProduct,
    dataAddress,
    appliedCodes,
  };
  return (
    <div className="w-full h-[100vh]">
      <Header />
      <CheckOutStep active={2} />
      <div className="w-full h-[90vh]">
        <Payment data={data} />
      </div>
      <Footer />
    </div>
  );
};

export default PaymentPage;
