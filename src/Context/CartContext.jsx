import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { authContext } from "./AuthContext";

export const cartContext = createContext();
const CartContextProvider = ({ children }) => {
  const [numOfProducts, setNumOfProducts] = useState(0);
  const [products, setProducts] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartId, setCartId] = useState(0)
  const [loader, setLoader] = useState(false)

  const { token } = useContext(authContext);

  async function addToCart(productId) {
    setLoader(true)
    try {
      setLoader(false)
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId: productId,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      getUserCart();
      return data;
    } catch (error) {
      setLoader(false)
    }
  }
  async function getUserCart() {
    setLoader(true)
    try {
      setLoader(false)
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setNumOfProducts(data.numOfCartItems);
      setProducts(data.data.products);
      setTotalPrice(data.data.totalCartPrice);
      setCartId(data.data._id)
      return data;
    } catch (error) {
      setLoader(false)
      setProducts([]);
    }
  }
  async function updateCart(id, count) {
    setLoader(true)
    try {
      setLoader(false)
      const { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
          count: count
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setNumOfProducts(data.numOfCartItems);
      setProducts(data.data.products);
      setTotalPrice(data.data.totalCartPrice);
      setCartId(data.data._id);
      return data;
    } catch (error) {
      setLoader(false)
    }
  }
  async function removeProduct(id) {
    setLoader(true)
    try {
      setLoader(false)
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setNumOfProducts(data.numOfCartItems);
      setProducts(data.data.products);
      setTotalPrice(data.data.totalCartPrice);
      setCartId(data.data._id);
      return data;
    } catch (error) {
      setLoader(false)
    }
  }
  async function clearCart() {
    setLoader(true)
    try {
      setLoader(false)
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setNumOfProducts(0);
      setProducts([]);
      setTotalPrice(0);
      
      return data;
    } catch (error) {
      setLoader(false)
    }
  }
  useEffect(
    function () {
      if (token != null) {
        getUserCart();
      }
    },
    [token]
  );
  return (
    <cartContext.Provider
      value={{
        addToCart,
        numOfProducts,
        products,
        totalPrice,
        updateCart,
        removeProduct,
        clearCart,
        cartId,
        setNumOfProducts,
        setProducts,
        setTotalPrice,
        loader
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export default CartContextProvider;
