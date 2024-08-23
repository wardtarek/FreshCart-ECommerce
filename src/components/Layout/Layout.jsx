import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-[60vh]">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
