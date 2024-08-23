import { Link, NavLink, useNavigate } from "react-router-dom";
import img from "./../../assets/images/freshcart-logo.svg";
import { useContext, useEffect, useState } from "react";
import { authContext } from "../../Context/AuthContext";
import { cartContext } from "../../Context/CartContext";

const Navbar = () => {
  const { token, setToken } = useContext(authContext);
  const { numOfProducts } = useContext(cartContext);
  const [scroll, setScroll] = useState(0);

  const navigate = useNavigate();
  function logOut() {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  }
  const [height, setHeight] = useState("0px");

  function handleClickOutNav(e) {
    if (
      e.target.tagName != "NAV" &&
      e.target.offsetParent.tagName != "NAV"
    ) {
      navClose();
    }
  }
  function navOpen() {
    if (height == "0px") {
      setHeight("300px");
      window.addEventListener("click", handleClickOutNav);
    } else {
      navClose();
    }
  }
  function navClose() {
    setHeight("0px");
    window.removeEventListener("click", handleClickOutNav);
  }

  useEffect(() => {
    window.addEventListener("scroll", () => {
      let y = window.scrollY;
      setScroll(y);
    });
  }, []);

  return (
    <nav
      className={`bg-slate-100 fixed top-0 left-0 right-0 z-20 transition-all duration-300 ${
        scroll > 40 || height != "0px" ? "shadow-lg" : ""
      }`}
    >
      <div className="container mx-auto py-4 flex justify-between items-center">
        <div className="logo">
          <NavLink to="/home">
            <img src={img} alt="" className="text-center mx-auto" />
          </NavLink>
        </div>
        <div className="Navlink text-center hidden lg:block">
          <ul className="lg:flex lg:justify-center">
            {token ? (
              <>
                <li className="mt-2 lg:mt-0 lg:me-3">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "text-green-500 font-semibold"
                        : "text-slate-500 hover:text-slate-700 transition-all duration-300 "
                    }
                    to="/home"
                  >
                    Home
                  </NavLink>
                </li>
                <li className="mt-2 lg:mt-0 lg:me-3">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "text-green-500 font-semibold"
                        : "text-slate-500 hover:text-slate-700 transition-all duration-300"
                    }
                    to="/cart"
                  >
                    Cart
                  </NavLink>
                </li>
                <li className="mt-2 lg:mt-0 lg:me-3">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "text-green-500 font-semibold"
                        : "text-slate-500 hover:text-slate-700 transition-all duration-300"
                    }
                    to="/wishlist"
                  >
                    WishList
                  </NavLink>
                </li>
                <li className="mt-2 lg:mt-0 lg:me-3">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "text-green-500 font-semibold"
                        : "text-slate-500 hover:text-slate-700 transition-all duration-300"
                    }
                    to="/products"
                  >
                    Products
                  </NavLink>
                </li>
                <li className="mt-2 lg:mt-0 lg:me-3">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "text-green-500 font-semibold"
                        : "text-slate-500 hover:text-slate-700 transition-all duration-300"
                    }
                    to="/categories"
                  >
                    Categories
                  </NavLink>
                </li>
                <li className="mt-2 lg:mt-0 lg:me-3">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "text-green-500 font-semibold"
                        : "text-slate-500 hover:text-slate-700 transition-all duration-300"
                    }
                    to="/brands"
                  >
                    Brands
                  </NavLink>
                </li>
                <li className="mt-2 lg:mt-0 lg:me-3">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "text-green-500 font-semibold"
                        : "text-slate-500 hover:text-slate-700 transition-all duration-300"
                    }
                    to="/allorders"
                  >
                    All Orders
                  </NavLink>
                </li>
              </>
            ) : (
              ""
            )}
          </ul>
        </div>
        <div className="social text-center hidden lg:flex">
          <div>
            {/* <i className="fa-brands fa-instagram me-3"></i>
              <i className="fa-brands fa-facebook me-3"></i>
              <i className="fa-brands fa-tiktok me-3"></i>
              <i className="fa-brands fa-twitter me-3"></i>
              <i className="fa-brands fa-linkedin me-3"></i>
              <i className="fa-brands fa-youtube me-3"></i> */}
            {token ? (
              <Link to="/cart">
                <i className="fa-solid fa-cart-shopping me-6 relative">
                  <div
                    className="absolute inline-flex items-center justify-center w-6 h-6 text-white bg-green-500 border-2 rounded-md -top-3 -right-4 dark:border-gray-900"
                    style={{ fontSize: "10px" }}
                  >
                    {numOfProducts}
                  </div>
                </i>
              </Link>
            ) : (
              ""
            )}
          </div>
          <div>
            {token ? (
              <button onClick={logOut} className="me-3">
                Logout<i className="fa-solid fa-right-from-bracket ms-2"></i>
              </button>
            ) : (
              <>
                <NavLink to="/login" className="me-3">
                  Login
                </NavLink>
                <NavLink to="/register" className="me-3">
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
        <div className="lg:hidden">
          <button
            onClick={navOpen}
            className="outline-none mobile-menu-button py-2 px-4 border border-slate-400 focus:shadow-[0_0_0_2px] duration-500 rounded-lg"
          >
            <i className="fa-solid fa-bars fa-xl"></i>
          </button>
        </div>
      </div>
      <div
        className="container mx-auto mobile-menu overflow-hidden transition-[height] duration-500 lg:hidden"
        style={{ height: height }}
      >
        <div className="Navlink text-center">
          <ul>
            {token ? (
              <>
                <li className="mt-2 lg:mt-0 lg:me-3">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "text-green-500 font-semibold"
                        : "text-slate-500 hover:text-slate-700 transition-all duration-300"
                    }
                    to="/home"
                  >
                    Home
                  </NavLink>
                </li>
                <li className="mt-2 lg:mt-0 lg:me-3">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "text-green-500 font-semibold"
                        : "text-slate-500 hover:text-slate-700 transition-all duration-300"
                    }
                    to="/cart"
                  >
                    Cart
                  </NavLink>
                </li>
                <li className="mt-2 lg:mt-0 lg:me-3">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "text-green-500 font-semibold"
                        : "text-slate-500 hover:text-slate-700 transition-all duration-300"
                    }
                    to="/wishlist"
                  >
                    WishList
                  </NavLink>
                </li>
                <li className="mt-2 lg:mt-0 lg:me-3">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "text-green-500 font-semibold"
                        : "text-slate-500 hover:text-slate-700 transition-all duration-300"
                    }
                    to="/products"
                  >
                    Products
                  </NavLink>
                </li>
                <li className="mt-2 lg:mt-0 lg:me-3">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "text-green-500 font-semibold"
                        : "text-slate-500 hover:text-slate-700 transition-all duration-300"
                    }
                    to="/categories"
                  >
                    Categories
                  </NavLink>
                </li>
                <li className="mt-2 lg:mt-0 lg:me-3">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "text-green-500 font-semibold"
                        : "text-slate-500 hover:text-slate-700 transition-all duration-300"
                    }
                    to="/brands"
                  >
                    Brands
                  </NavLink>
                </li>
                <li className="mt-2 lg:mt-0 lg:me-3">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "text-green-500 font-semibold"
                        : "text-slate-500 hover:text-slate-700 transition-all duration-300"
                    }
                    to="/allorders"
                  >
                    All Orders
                  </NavLink>
                </li>
              </>
            ) : (
              ""
            )}
          </ul>
        </div>
        <div className="social text-center flex flex-wrap justify-center items-center mt-4">
          <div>
            {/* <i className="fa-brands fa-instagram me-3"></i>
              <i className="fa-brands fa-facebook me-3"></i>
              <i className="fa-brands fa-tiktok me-3"></i>
              <i className="fa-brands fa-twitter me-3"></i>
              <i className="fa-brands fa-linkedin me-3"></i>
              <i className="fa-brands fa-youtube me-3"></i> */}
            {token ? (
              <Link to="/cart">
                <i className="fa-solid fa-cart-shopping me-10 relative">
                  <div
                    className="absolute inline-flex items-center justify-center w-6 h-6 text-white bg-green-500 border-2 rounded-md -top-3 -right-4 dark:border-gray-900"
                    style={{ fontSize: "10px" }}
                  >
                    {numOfProducts}
                  </div>
                </i>
              </Link>
            ) : (
              ""
            )}
          </div>
          <div>
            {token ? (
              <button onClick={logOut} className="me-3">
                Logout
              </button>
            ) : (
              <>
                <NavLink to="/login" className="me-3">
                  Login
                </NavLink>
                <NavLink to="/register" className="me-3">
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
