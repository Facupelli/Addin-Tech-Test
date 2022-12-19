import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/context";
import { fetchProducts } from "../utils/products";

export const useFetchProducts = () => {
  const [products, setProducts] = useState([]);
  const { userId } = useContext(UserContext);

  useEffect(() => {
    if (userId) {
      fetchProducts(userId).then((res) => setProducts(res.data));
    }
  }, [userId]);

  return { products, setProducts };
};
