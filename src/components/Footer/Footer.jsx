import React, { useContext } from "react";

const Footer = () => {
  return (
    <footer className="bg-slate-100 w-full h-[410px] md:h-[320px]">
      <div className="container mx-auto py-10">
        <h2 className="text-xl">Get the FreshCart app</h2>
        <p className="text-sm text-slate-500">
          We will send you a link, Open it on your phone to download the app
        </p>
        <div className="flex flex-wrap justify-center md:justify-between items-center m-2 py-6 border-b">
          <input
            type="text"
            className="w-full mb-4 md:mb-0 md:w-[75%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block py-2 px-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            placeholder="Email .."
          />
          <button className="md:w-[20%] text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2 dark:bg-green-600 dark:hover:bg-green-500 focus:outline-none dark:focus:ring-green-600">
            Share App Link
          </button>
        </div>
        <div className="flex flex-wrap justify-center md:justify-between items-center m-2 py-6 border-b ">
          <div className="text-xl mb-3 sm:mb-0">
            <span>Payment Partners</span>
            <i className="fa-brands fa-amazon-pay mx-4"></i>
            <i className="fa-brands fa-cc-mastercard me-4"></i>
            <i className="fa-brands fa-cc-paypal me-4"></i>
          </div>
          <div className="text-xl">
            <span>Get deliveries with FreshCart</span>
            <i className="fa-brands fa-app-store-ios mx-4"></i>
            <i className="fa-brands fa-google-play "></i>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
