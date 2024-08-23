import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const Forget = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const user = {
    email: "",
  };
  const validation = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Enter a Valid Email"),
  });
  async function forgetPass(values) {
    setIsLoading(true);
    try {
      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        values
      );
      console.log(res);
      toast.success(res.data.statusMsg);
      setIsLoading(false);
    //   navigate to resetCode
        navigate("/resetCode");
    } catch (err) {
      console.log(err);
      toast.error(err.res.data.statusMsg);
      setIsLoading(false);
    }
  }
  const formik = useFormik({
    initialValues: user,
    onSubmit: forgetPass,
    validationSchema: validation,
  });
useEffect(() => {
  window.document.title = "FreshCart | Forget Password";
}, []);
  return (
    <div className="container py-2 mx-auto mt-14">
      <div className="w-[60%] mx-auto my-4">
        <h2 className="text-2xl mb-2">Forget Password :</h2>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block mb-1 text-sm font-medium text-gray-500 dark:text-white"
            >
              email:
            </label>
            <input
              type="email"
              id="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block w-full mb-2 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-green-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            />
          </div>
          {formik.errors.email && formik.touched.email ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">Error! </span>
              {formik.errors.email}
            </div>
          ) : (
            ""
          )}
          <div className="w-full flex flex-wrap justify-between items-center">
            <button
              type="submit"
              className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-500 focus:outline-none dark:focus:ring-green-600"
            >
              {isLoading ? (
                <i className="fa-solid fa-spinner fa-spin text-white"></i>
              ) : (
                "Send"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Forget;
