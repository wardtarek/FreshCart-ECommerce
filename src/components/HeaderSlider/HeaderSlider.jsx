import React from "react";
import Slider from "react-slick";
import img1 from "./../../assets/images/slider-image-1.jpeg";
import img2 from "./../../assets/images/slider-image-2.jpeg";
import img3 from "./../../assets/images/slider-image-3.jpeg";
import img4 from "./../../assets/images/best-luggage-brands-H-MAIN-2022.webp";
import img5 from "./../../assets/images/online-shopping-concept-about-electronics-and-gadgets-in-modern-promotion-period-of-new-models-consist-of-phone-vr-headphone-with-drone-and-credit-card-and-green-screen-realistic-3d-renderi.jpg";

export default function HeaderSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
  };
  return (
    <section className="lg:flex container py-4 mx-auto mt-16">
      <div className="w-full lg:w-2/3 pb-8">
        <Slider {...settings} className="relative py-2">
          <div>
            <img
              src={img3}
              className="w-full lg:h-[500px] lg:object-cover"
              alt=""
            />
          </div>
          <div>
            <img
              src={img2}
              className="w-full lg:h-[500px] lg:object-cover"
              alt=""
            />
          </div>
          <div>
            <img
              src={img1}
              className="w-full lg:h-[500px] lg:object-cover"
              alt=""
            />
          </div>
        </Slider>
      </div>
      <div className="w-full lg:w-1/3 py-2">
        <img
          src={img4}
          className="w-full lg:h-[250px] lg:object-cover"
          alt=""
        />
        <img
          src={img5}
          className="w-full lg:h-[250px] lg:object-cover"
          alt=""
        />
      </div>
    </section>
  );
}
