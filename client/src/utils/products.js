import axios from "axios";

export const fetchProducts = async (userId) => {
  return await axios(`http://localhost:3001/product?userId=${userId}`);
};
