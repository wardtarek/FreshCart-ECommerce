import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
import Slider from "react-slick";

export default function CategorySlider() {
  async function getAllCategories() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }
  const { data } = useQuery("categorySlider", getAllCategories);
  const [sliderShow, setSliderShow] = useState()
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 416,
        settings: {
          dots: true,
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          dots: true,
          infinite: true,
          speed: 500,
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          dots: true,
          infinite: true,
          speed: 500,
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1536,
        settings: {
          dots: true,
          infinite: true,
          speed: 500,
          slidesToShow: 6,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <section>
      <div className="container mx-auto overflow-hidden">
        <Slider {...settings} className="py-2">
          {data?.data.data.map((item, idx) => (
            <div
              key={idx}
              className="p-2 my-2 rounded-3xl border shadow-0 hover:shadow-md hover:shadow-[rgba(0,120,0,0.4)] transition-all duration-300"
            >
              <div>
                <img
                  src={item.image}
                  className="w-full h-[250px] rounded-t-3xl object-cover"
                  alt=""
                />
              </div>
              <h2 className="text-center text-green-500 font-semibold py-4">
                {item.name}
              </h2>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
