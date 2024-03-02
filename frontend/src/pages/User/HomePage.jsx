import React from "react";
import Header from "../../components/Layout/Header";
import Hero from "../../components/Layout/Hero";
import Collection from "../../components/Collection/Collection";
import Product from "../../components/Product/Product";
import DiscountEvent from "../../components/Event/DiscountEvent";
import Blog from "../../components/Blog/Blog";
import Branding from "../../components/Layout/Branding";
import Footer from "../../components/Layout/Footer";
const HomePage = () => {
  return (
    <div className="max-w-[1900px] mx-auto bg-slate-200/30">
      <Header activeHeading={1} />
      <Hero />
      <Collection />
      <Product />
      <Branding />
      <DiscountEvent />
      <Blog />
      <Footer />
    </div>
  );
};

export default HomePage;
