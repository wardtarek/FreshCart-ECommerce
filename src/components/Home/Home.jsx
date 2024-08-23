import React, { useEffect } from "react";
import HeaderSlider from "../HeaderSlider/HeaderSlider";
import CategorySlider from "../CategorySlider/CategorySlider";
import Products from "../Products/Products";

function Home() {
  useEffect(() => {
    window.document.title = "FreshCart | Home";
  }, []);
  return (
    <div>
      <HeaderSlider />
      <CategorySlider />
      <Products />
    </div>
  );
}

export default Home;
