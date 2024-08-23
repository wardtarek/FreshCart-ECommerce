import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { wishListContext } from "../../Context/WishListContext";

const Products = () => {
  const { addToCart } = useContext(cartContext);
  const { addToWishList, products } = useContext(wishListContext);
  const [newData, setNewData] = useState([]);
  const [search, setSearch] = useState("");
  const [loader, setLoader] = useState(false);

  async function getAllProducts() {
    let x = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
    setNewData(x.data.data);
    return x;
  }
  // refetch is a function to fetch data from button or anywhere
  const { data, isLoading, isFetching, error, refetch } = useQuery(
    "products",
    getAllProducts,
    {
      // refetchOnMount: false
      // refetchInterval: 5000,
      // cacheTime: 500,
      // enabled: false        // connected to refetch
    }
  );

  async function addProductToCart(id) {
    setLoader(true);
    const data = await addToCart(id);
    if (data) {
      setLoader(false);
      toast.success(data.message);
    } else {
      setLoader(false);
      toast.error("error");
    }
  }
  async function addProductToWishList(id, e) {
    setLoader(true)
    e.target.classList.add("fa-solid", "fa-heart", "text-2xl", "text-red-500");
    const data = await addToWishList(id);
    if (data) {
      setLoader(false);
      toast.success(data.message);
    } else {
      setLoader(false);
      toast.error("error");
    }
  }
  useEffect(() => {
    window.document.title = "FreshCart | Products";
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
          wrapperClassName=""
        />
      </div>
    );
  }

  function handleSearch(e) {
    setSearch(e.target.value);
    setNewData(
      data.data.data.filter((item) => {
        return item.title.toLowerCase().includes(search.toLowerCase());
      })
    );
  }

  return (
    <div>
      <div className="container py-2 mx-auto mt-20 lg:mt-14">
        <div className="w-[60%] mx-auto ">
          <input
            type="text"
            id="first_name"
            className="my-14 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            placeholder="Search..."
            onKeyUp={(e) => handleSearch(e)}
          />
        </div>
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
        <div className="flex flex-wrap justify-center items-center ">
          {newData.map((item, index) => (
            <div
              className="group w-full sm:w-1/2 md:w-1/3 xl:w-1/5 p-4 overflow-hidden rounded-md shadow-0 hover:shadow-[0px_0px_10px_10px_rgba(0,120,0,0.4)] transition-all duration-300"
              key={index}
            >
              <Link to={`/productDetails/${item.id}`}>
                <div className="inner p-2">
                  <img src={item.imageCover} alt="" className="w-full" />
                  <div className="p-2">
                    <h2 className="text-green-500">{item.category.name}</h2>
                    <h2>{item.title.split(" ").splice(0, 2).join(" ")}</h2>
                    <div className="flex flex-wrap justify-between items-center mt-2">
                      <h4>{item.price} EGP</h4>
                      <div className="flex flex-wrap justify-center items-center">
                        <i className="fa-solid fa-star text-yellow-300 mr-1"></i>
                        <h4 className="text-slate-500">
                          {item.ratingsAverage}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
              <div className="flex flex-wrap justify-center items-center">
                <button
                  onClick={() => addProductToCart(item.id)}
                  className="w-2/3 translate-y-[100px] group-hover:translate-y-0 transition-all duration-500 text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-4 mb-2 dark:bg-green-600 dark:hover:bg-green-500 focus:outline-none dark:focus:ring-green-600"
                >
                  Add to Cart
                </button>
                <button onClick={(e) => addProductToWishList(item.id, e)}>
                  <i
                    className={
                      products == null || products.length == 0
                        ? "fa-regular fa-heart text-2xl"
                        : `${products.map((i) =>
                            i.id == item.id
                              ? " fa-solid fa-heart text-2xl text-red-500 "
                              : " fa-regular fa-heart text-2xl "
                          )}`
                    }
                  ></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
