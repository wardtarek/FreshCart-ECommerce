import axios from "axios";
import React, { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

const Categories = () => {
  const [loader, setLoader] = useState(false);
  const [subData, setSubData] = useState(null);
  const [subName, setSubName] = useState("");

  async function getAllCategories() {
    return await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories",
      {
        limit: 10,
      }
    );
  }
  const { data, isLoading } = useQuery("categories", getAllCategories);

  async function getAllSubCategories(subCatId, name) {
    setLoader(true);
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/categories/${subCatId}/subcategories`,
        {
          limit: 10,
        }
      );
      setSubData(data.data);
      setSubName(name);
      setLoader(false);
    } catch (error) {
      setLoader(false);
    }
  }
  useEffect(() => {
    window.document.title = "FreshCart | Categories";
  }, []);
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.data.data.map((item, idx) => (
          <Link
            onClick={() => getAllSubCategories(item._id, item.name)}
            key={idx}
            className="w-full rounded-md border shadow-0 hover:shadow-[0px_0px_5px_5px_rgba(0,120,0,0.4)] transition-all duration-500"
          >
            <div>
              <img
                src={item.image}
                className="w-full h-[300px] object-cover"
                alt=""
              />
            </div>
            <h2 className="text-center text-3xl text-green-500 font-semibold py-4">
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
        <div className="my-10">
          {subData != null ? (
            <h2 className="text-center text-green-500 font-semibold text-3xl my-5">
              {subName} subcategories
            </h2>
          ) : (
            ""
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {subData != null
              ? subData.map((item, idx) => (
                  <Link
                    key={idx}
                    className="w-full p-2 rounded-md border shadow-0 hover:shadow-[0px_0px_5px_5px_rgba(0,120,0,0.4)] transition-all duration-500"
                  >
                    <h3 className="text-center text-[26px] font-semibold py-4">
                      {item.name}
                    </h3>
                  </Link>
                ))
              : ""}
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
