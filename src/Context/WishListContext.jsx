import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { authContext } from "./AuthContext";

export const wishListContext = createContext();
function WishListContextProvider({ children }) {
  const [products, setProducts] = useState(null);
  const { token } = useContext(authContext);

  async function addToWishList(productId) {
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          productId: productId,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      getUserWishList();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  async function getUserWishList() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setProducts(data.data);

      return data;
    } catch (error) {
      console.log(error);
    }
  }
  
  async function removeFromWishList(id) {
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      getUserWishList();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(
    function () {
      if (token != null) {
        getUserWishList();
      }
    },
    [token]
  );

  return (
    <wishListContext.Provider
      value={{
        addToWishList,
        removeFromWishList,
        products,
      }}
    >
      {children}
    </wishListContext.Provider>
  );
}

export default WishListContextProvider;
