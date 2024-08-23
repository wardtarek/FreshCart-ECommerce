import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useContext, useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";

const AllOrders = () => {
  const [ loader, setLoader ] = useState(false);
  const [orders, setOrders] = useState(null);
  const { id } = jwtDecode(localStorage.getItem("token"));

  async function getAllOrders() {
    setLoader(true);
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`
      );
      setOrders(data);
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  }
  useEffect(() => {
    getAllOrders();
    
      window.document.title = "FreshCart | All Orders";
 
  }, []);
  if (loader) {
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
  return (
    <section>
      <div className="container py-10 mx-auto mt-14">
        {orders
          ? orders.map((item, idx) => (
              <div className="bg-gray-100 p-10 mb-4" key={idx}>
                <div className="flex flex-wrap justify-center items-center mb-2">
                  {item.cartItems.map((i, index) => (
                    <div className="w-1/3 lg:w-1/6 p-2" key={index}>
                      <img
                        src={i.product.imageCover}
                        className="w-full"
                        alt=""
                      />
                      <h4 className="text-sm text-center mt-2">
                        {i.product.title.split(" ").splice(0, 2).join(" ")}
                      </h4>
                      <h4 className="text-sm text-center">
                        Count :{" "}
                        <span className="text-green-500">{i.count}</span>
                      </h4>
                      <h4 className="text-sm text-center">
                        Price :{" "}
                        <span className="text-green-500">{i.price} EGP</span>
                      </h4>
                    </div>
                  ))}
                </div>
                <h3 className=" mb-2">
                  Total Order Price :{" "}
                  <span className="text-green-500">
                    {item.totalOrderPrice} EGP
                  </span>
                </h3>
                <h3 className=" mb-2">
                  Payment Method Type :{" "}
                  <span className="text-green-500">
                    {item.paymentMethodType}
                  </span>
                </h3>
                <h3 className=" mb-2">
                  Delivery :{" "}
                  <span
                    className={
                      item.isDelivered ? "text-green-500" : "text-red-500"
                    }
                  >
                    {item.isDelivered ? "Delivered" : "Not Yet"}
                  </span>
                </h3>
              </div>
            ))
          : ""}
      </div>
    </section>
  );
};

export default AllOrders;
