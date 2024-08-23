import axios from "axios";
import React, { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

const Brands = () => {
  const [loader, setLoader] = useState(false);
  const [subData, setSubData] = useState(null);
  const [modal, setModal] = useState(false)

  async function getAllBrands() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }
  const { data, isLoading } = useQuery("brands", getAllBrands);

  async function getSubBrand(subBrandId) {
    setModal(true)
    setLoader(true);
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/brands/${subBrandId}`
      );
      setSubData(data.data);
      setLoader(false);
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  }
  function closeModal(){
    setModal(false)
  }
  function closeModal2(e){
    if (
      e.target.getAttribute(
        "id"
      ) == "Modal"
    ) {
      setModal(false);
    }
  }

  useEffect(() => {
    window.document.title = "FreshCart | Brands"
  }, [])
  
  if (isLoading) {
    return (
      <div className="h-screen flex flex-wrap justify-center items-center bg-black bg-opacity-25 absolute w-full">
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
  return (
    <div className="container py-8 mx-auto mt-20 lg:mt-14">
      <h2 className="text-center text-4xl text-green-500 font-semibold mt-4 mb-10">
        All Brands
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {data?.data.data.map((item, idx) => (
          <Link
            data-modal-target="Modal"
            data-modal-toggle="Modal"
            onClick={() => getSubBrand(item._id)}
            key={idx}
            className="w-full rounded-md border shadow-0 hover:shadow-[0px_0px_5px_5px_rgba(0,120,0,0.4)] transition-all duration-500"
          >
            <div>
              <img
                src={item.image}
                className="w-full h-[200px] object-contain"
                alt=""
              />
            </div>
            <h2 className="text-center text-2xl text-green-500 font-semibold py-4">
              {item.name}
            </h2>
          </Link>
        ))}
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
        <div
          id="Modal"
          onClick={closeModal2}
          className={`${modal? "flex" : "hidden" } bg-black bg-opacity-25 overflow-y-auto overflow-x-hidden fixed z-50 justify-center items-center w-full md:inset-0 h-screen max-h-full`}
        >
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <button
                  type="button"
                  onClick={closeModal}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              <div className="p-4 md:p-5 space-y-4 flex justify-center ">
                <img src={subData?.image} alt="" />
              </div>

              <div className="flex justify-end items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  onClick={closeModal}
                  type="button"
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-green-500 focus:outline-none bg-white rounded-lg border border-green-200 hover:bg-green-500 hover:text-white focus:z-10 focus:ring-4 focus:ring-green-100 dark:focus:ring-green-700 dark:bg-green-800 dark:text-green-400 dark:border-green-600 dark:hover:text-white dark:hover:bg-green-700"
                >
                  close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Brands;
