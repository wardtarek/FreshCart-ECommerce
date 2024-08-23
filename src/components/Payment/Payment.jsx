import { useFormik, useFormikContext } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { cartContext } from "../../Context/CartContext";
import axios from "axios";
import toast from "react-hot-toast";

const Payment = () => {
  const [isLoading1, setIsLoading1] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [det, setDet] = useState("");
  const [ph, setPh] = useState("");
  const [cityy, setCityy] = useState("");
  const navigate = useNavigate();
  const { cartId, setNumOfProducts, setProducts, setTotalPrice } =
    useContext(cartContext);
  const x = {
    details: "",
    phone: "",
    city: "",
  };

  const validation = Yup.object().shape({
    details: Yup.string()
      .required("Details is required")
      .min(3, "Details must be at least 3 chars"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
        "Please Enter a Valid Phone Number"
      ),
    city: Yup.string()
      .required("City is required")
      .min(2, "City must be at least 3 chars"),
  });
  async function cashPayment(values) {
    console.log(values);
    
    setIsLoading1(true);
    try {
      const res = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        {
          shippingAddress: {
            values,
          },
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log(res.data);
      toast.success(res.data.status);
      setIsLoading1(false);
      setNumOfProducts(0);
      setProducts([]);
      setTotalPrice(0);
      // navigate to home
      navigate("/home");
    } catch (err) {
      console.log(err);
      toast.error("Error cash payment");
      setIsLoading1(false);
    }
  }
  const handleChangeFun = (event) => {
    if (event.target.id == "details") {
      setDet(event.target.value);
    } else if (event.target.id == "phone") {
      setPh(event.target.value);
    } else {
      setCityy(event.target.value);
    }
  };

  async function onlinePayment() {
    setIsLoading2(true);    
    try {
      const res = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173/%23`,
        {
          shippingAddress: {
            details: det,
            phone: ph,
            city: cityy,
          },
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log(res.data);
      toast.success(res.data.status);
      setIsLoading2(false);
      window.open(res.data.session.url);
    } catch (err) {
      console.log(err);
      toast.error("Error online payment");
      setIsLoading2(false);
    }
  }
  const formik = useFormik({
    initialValues: x,
    onSubmit: cashPayment,
    validationSchema: validation,
  });

  useEffect(() => {
    window.document.title = "FreshCart | Payment";
  }, []);
  return (
    <section>
      <div className="container py-2 mx-auto mt-14">
        <div className="w-[60%] mx-auto my-4">
          <h2 className="text-2xl mb-2">Payment :</h2>
          <form onSubmit={formik.handleSubmit} onChange={handleChangeFun}>
            {/* Details */}
            <div>
              <label
                htmlFor="details"
                className="block mb-1 text-sm font-medium text-gray-500 dark:text-white"
              >
                Details:
              </label>
              <input
                value={formik.values.details}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
                id="details"
                className="block w-full mb-2 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-green-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              />
            </div>
            {formik.errors.details && formik.touched.details ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                <span className="font-medium">Error! </span>
                {formik.errors.details}
              </div>
            ) : (
              ""
            )}
            {/* phone */}
            <div>
              <label
                htmlFor="phone"
                className="block mb-1 text-sm font-medium text-gray-500 dark:text-white"
              >
                phone:
              </label>
              <input
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="tel"
                id="phone"
                className="block w-full mb-2 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-green-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              />
            </div>
            {formik.errors.phone && formik.touched.phone ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                <span className="font-medium">Error! </span>
                {formik.errors.phone}
              </div>
            ) : (
              ""
            )}
            {/* City */}
            <div>
              <label
                htmlFor="city"
                className="block mb-1 text-sm font-medium text-gray-500 dark:text-white"
              >
                City:
              </label>
              <input
                value={formik.values.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
                id="city"
                className="block w-full mb-2 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-green-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              />
            </div>
            {formik.errors.city && formik.touched.city ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                <span className="font-medium">Error! </span>
                {formik.errors.city}
              </div>
            ) : (
              ""
            )}
            <div className="mt-8 flex flex-wrap justify-center">
              <button
                type="submit"
                className=" text-sky-500 hover:text-white border border-sky-500 hover:bg-sky-500 focus:outline-none font-medium rounded-lg px-8 py-2 me-4 text-center dark:border-sky-500 dark:text-sky-500 dark:hover:text-white dark:hover:bg-sky-600"
              >
                {isLoading1 ? (
                  <i className="fa-solid fa-spinner fa-spin text-white"></i>
                ) : (
                  "Pay Cash Now"
                )}
              </button>
              <button
                type="button"
                onClick={onlinePayment}
                className=" text-sky-500 hover:text-white border border-sky-500 hover:bg-sky-500 focus:outline-none font-medium rounded-lg px-8 py-2 text-center dark:border-sky-500 dark:text-sky-500 dark:hover:text-white dark:hover:bg-sky-600"
              >
                {isLoading2 ? (
                  <i className="fa-solid fa-spinner fa-spin text-white"></i>
                ) : (
                  "Pay Online Now"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Payment;
