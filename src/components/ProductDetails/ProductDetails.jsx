import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { RotatingLines } from "react-loader-spinner";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import { wishListContext } from "../../Context/WishListContext";
import Slider from "react-slick";

const ProductDetails = () => {
  const { addToCart } = useContext(cartContext);
  const [loaderBtn, setLoaderBtn] = useState(false);
  const { id } = useParams();
  const { addToWishList, products } = useContext(wishListContext);
  const [loader, setLoader] = useState(false);

  async function getProductDetails() {
    return await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
  }
  const { data, isLoading } = useQuery(
    `productDetails${id}`,
    getProductDetails
  );
  async function addProductToCart() {
    setLoader(true)
    setLoaderBtn(true);
    const data = await addToCart(id);
    if (data) {
      setLoader(false)
      setLoaderBtn(false);
      toast.success(data.message);
    } else {
      setLoader(false)
      setLoaderBtn(false);
      toast.error("error");
    }
  }
  async function addProductToWishList(id, e) {
    setLoader(true)
    e.target.classList.add("fa-solid", "fa-heart", "text-2xl", "text-red-500");
    const data = await addToWishList(id);
    if (data) {
      setLoader(false)
      toast.success(data.message);
    } else {
      setLoader(false)
      toast.error("error");
    }
  }
  useEffect(() => {
    window.document.title = "FreshCart | Product Details";
  }, []);
  if (isLoading) {
    return (
      <div className="h-screen flex flex-wrap justify-center items-center bg-black bg-opacity-25 fixed w-full left-0 top-0">
        <RotatingLines
          visible={true}
          height="96"
          width="96"
          color="grey"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }
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
    <>
      {loader ? (
        <div className="h-screen flex flex-wrap justify-center items-center bg-black bg-opacity-25 fixed w-full left-0 top-0 z-10">
          <RotatingLines
            visible={true}
            height="96"
            width="96"
            color="grey"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
            wrapperStyle={{}}
            wrapperClassName=""
          />
        </div>
      ) : (
        ""
      )}
      <div className="container py-2 mx-auto flex flex-wrap justify-center items-center mt-24 lg:mt-20">
        <div className="w-full md:w-1/3 mb-10">
          <Slider {...settings} className="relative">
            {data.data.data.images.map((img, index) => (
              <div key={index}>
                <img src={img} className="w-full" alt="" />
              </div>
            ))}
          </Slider>
        </div>
        <div className="w-full md:w-2/3 px-4">
          <h2 className="text-2xl">{data.data.data.title}</h2>
          <p className="my-4 mx-2 text-slate-500">
            {data.data.data.description}
          </p>
          <h3 className="text-green-500">{data.data.data.category.name}</h3>
          <div className="flex flex-wrap justify-between items-center mt-2">
            <h4>{data.data.data.price} EGP</h4>
            <div className="flex flex-wrap justify-center items-center">
              <i className="fa-solid fa-star text-yellow-300 mr-1"></i>
              <h4 className="text-slate-500">
                {data.data.data.ratingsAverage}
              </h4>
            </div>
          </div>
          <div className="flex flex-wrap justify-between items-center">
            <button
              onClick={addProductToCart}
              className="mt-5 w-2/3 text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-500 focus:outline-none dark:focus:ring-green-600"
            >
              {loaderBtn ? (
                <i className="fa-solid fa-spinner fa-spin text-white"></i>
              ) : (
                "Add to Cart"
              )}
            </button>
            <button onClick={(e) => addProductToWishList(data.data.data.id, e)}>
              <i
                className={
                  products == null || products.length == 0
                    ? "fa-regular fa-heart text-2xl"
                    : `${products.map((i) =>
                        i.id == data.data.data.id
                          ? " fa-solid fa-heart text-2xl text-red-500 "
                          : " fa-regular fa-heart text-2xl "
                      )}`
                }
              ></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
