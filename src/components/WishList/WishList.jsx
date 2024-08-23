import React, { useContext, useEffect, useState } from "react";
import { wishListContext } from "../../Context/WishListContext";
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { RotatingLines } from "react-loader-spinner";

function WishList() {
  const { removeFromWishList, products } = useContext(wishListContext);
  const { addToCart } = useContext(cartContext);
  const [loader, setLoader] = useState(false);

  async function addProductToCart(id) {
    setLoader(true)
    const data = await addToCart(id);
    if (data) {
      setLoader(false)
      toast.success(data.message);
    } else {
      setLoader(false)
      toast.error("error");
    }
  }
  
  async function removeProductFromWishList(id) {
    setLoader(true);
    const data = await removeFromWishList(id);
    if (data) {
      setLoader(false);
      toast.success(data.message);
    } else {
      setLoader(false);
      toast.error("error");
    }
  }
  useEffect(() => {
    window.document.title = "FreshCart | WishList";
  }, []);
  return products ? (
    <section>
      <div className="container py-10 mx-auto mt-14">
        <div className="bg-gray-100 p-10">
          {products.length != 0 ? (
            <>
              <div className="flex flex-wrap justify-between items-center px-2">
                <h2 className="text-2xl sm:text-3xl font-medium mb-2">
                  My WishList :
                </h2>
              </div>
              {loader ? (
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
              ) : (
                ""
              )}
              {products.map((item, idx) => (
                <div
                  className="flex flex-wrap justify-center items-center py-2 border-b"
                  key={idx}
                >
                  <div className="w-1/6">
                    <img src={item.imageCover} alt="" />
                  </div>
                  <div className="w-3/6 px-8">
                    <h3 className="text-sm sm:text-base">
                      {item.title.split(" ").splice(0, 2).join(" ")}
                    </h3>
                    <h3 className="text-green-500 sm:my-2 text-sm sm:text-base">
                      Price : {item.price} EGP
                    </h3>
                    <button onClick={() => removeProductFromWishList(item.id)}>
                      <p className="text-red-500">
                        <i className="fa-regular fa-trash-can me-2"></i>
                        <span>Remove</span>
                      </p>
                    </button>
                  </div>
                  <div className="w-2/6 flex flex-wrap justify-center">
                    <button
                      onClick={() => {
                        addProductToCart(item.id);
                        removeFromWishList(item.id);
                      }}
                      type="button"
                      className="text-green-500 hover:text-white border border-green-500 hover:bg-green-500 focus:outline-none font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="h-[200px] flex flex-wrap justify-center items-center">
              <h2 className="text-2xl">Your WishList is Empty</h2>
            </div>
          )}
        </div>
      </div>
    </section>
  ) : (
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

export default WishList;
