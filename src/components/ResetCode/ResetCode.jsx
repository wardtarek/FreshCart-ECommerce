import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ResetCode = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const user = {
    resetCode: "",
  };

  async function resetCode(values) {
    setIsLoading(true);
    try {
      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        values
      );
      console.log(res);
      toast.success(res.data.status);
      setIsLoading(false);
      if (res.data.status == "Success") {
        // navigate to reset Password
        navigate("/resetPassword");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.res.data.statusMsg);
      setIsLoading(false);
    }
  }
  const formik = useFormik({
    initialValues: user,
    onSubmit: resetCode,
  });
useEffect(() => {
  window.document.title = "FreshCart | Reset Code";
}, []);
  return (
    <div className="container py-2 mx-auto mt-14">
      <div className="w-[60%] mx-auto my-4">
        <h2 className="text-2xl mb-2">Enter code Now :</h2>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label
              htmlFor="resetCode"
              className="block mb-1 text-sm font-medium text-gray-500 dark:text-white"
            >
              Reset Code:
            </label>
            <input
              type="text"
              id="resetCode"
              value={formik.values.resetCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block w-full mb-2 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-green-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            />
          </div>
          <div className="w-full flex flex-wrap justify-between items-center">
            <button
              type="submit"
              className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-500 focus:outline-none dark:focus:ring-green-600"
            >
              {isLoading ? (
                <i className="fa-solid fa-spinner fa-spin text-white"></i>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetCode;
