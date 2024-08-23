import React, { useContext, useEffect, useState } from "react";
import { cartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import toast from "react-hot-toast";

const Cart = () => {
  const { products, totalPrice, updateCart, removeProduct, clearCart } =
    useContext(cartContext);
  const [loader, setLoader] = useState(false);

  async function removeProductFromCart(id) {
    setLoader(true);
    const data = await removeProduct(id);
    if (data) {
      setLoader(false);
      toast.success("Prodect is removed successfully from your cart");
    } else {
      setLoader(false);
      toast.error("error");
    }
  }
  async function updateToCart(id, count) {
    setLoader(true);
    const data = await updateCart(id, count);
    if (data) {
      setLoader(false);
      toast.success("Your cart has been updated successfully");
    } else {
      setLoader(false);
      toast.error("error");
    }
  }
  async function clearTheCart() {
    setLoader(true);
    const data = await clearCart();
    if (data) {
      setLoader(false);
      toast.success("Your cart is cleared");
    } else {
      setLoader(false);
      toast.error("error");
    }
  }
  useEffect(() => {
    window.document.title = "FreshCart | Cart";
  }, []);

  return products ? (
    <section>
      <div className="container py-10 mx-auto mt-14">
        <div className="bg-gray-100 p-10">
          {products.length != 0 ? (
            <>
              <div className="flex flex-wrap justify-between items-center px-2">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-medium mb-2">Shop Cart :</h2>
                  <h3 className="mb-2 sm:text-xl">
                    Total Cart Price :{" "}
                    <span className="text-green-500">{totalPrice} EGP</span>
                  </h3>
                </div>
                <button
                  onClick={() => clearTheCart()}
                  type="button"
                  className="text-red-500 hover:text-white border border-red-500 hover:bg-red-500 focus:outline-none font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600"
                >
                  Clear Cart
                </button>
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
                    <img src={item.product.imageCover} alt="" />
                  </div>
                  <div className="w-3/6 px-8">
                    <h3 className="text-sm sm:text-base">
                      {item.product.title.split(" ").splice(0, 2).join(" ")}
                    </h3>
                    <h3 className="text-green-500 sm:my-2 text-sm sm:text-base">
                      Price : {item.price} EGP
                    </h3>
                    <button
                      onClick={() => removeProductFromCart(item.product.id)}
                    >
                      <p className="text-red-500">
                        <i className="fa-regular fa-trash-can me-2"></i>
                        <span>Remove</span>
                      </p>
                    </button>
                  </div>
                  <div className="w-2/6 flex flex-wrap justify-center items-center">
                    <button
                      onClick={() =>
                        updateToCart(item.product.id, item.count - 1)
                      }
                      type="button"
                      disabled={item.count == 0 ? true : false}
                      className={
                        item.count == 0
                          ? "disabled:opacity-50 text-green-500 border border-green-500 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-green-500 dark:text-green-500 dark:hover:text-white"
                          : "text-green-500 hover:text-white border border-green-500 hover:bg-green-500 focus:outline-none font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600"
                      }
                    >
                      -
                    </button>
                    <p className="mx-3">{item.count}</p>
                    <button
                      onClick={() =>
                        updateToCart(item.product.id, item.count + 1)
                      }
                      type="button"
                      className="text-green-500 hover:text-white border border-green-500 hover:bg-green-500 focus:outline-none font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
              <div className="mt-5 flex flex-wrap justify-center">
                <Link
                  to="/payment"
                  className=" text-sky-500 hover:text-white border border-sky-500 hover:bg-sky-500 focus:outline-none font-medium rounded-lg text-lg px-8 py-2 text-center dark:border-sky-500 dark:text-sky-500 dark:hover:text-white dark:hover:bg-sky-600"
                >
                  Checkout
                </Link>
              </div>
            </>
          ) : (
            <div className="h-[200px] flex flex-wrap justify-center items-center">
              <h2 className="text-2xl">Your Cart is Empty</h2>
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
    
  
};

export default Cart;
