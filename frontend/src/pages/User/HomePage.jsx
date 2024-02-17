import React from "react";
import Header from "../../components/Layout/Header";
import Hero from "../../components/Layout/Hero";
import Collection from "../../components/Collection/Collection";
import Product from "../../components/Product/Product.jsx";
const HomePage = () => {
  return (
    <div className="max-w-[1900px] mx-auto">
      <Header activeHeading={1} />
      <Hero />
      <Collection />
      <Product />
    </div>
  );
};

export default HomePage;
