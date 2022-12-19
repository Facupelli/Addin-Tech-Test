import axios from "axios";

export const fetchProducts = async (userId) => {
  return await axios(`http://localhost:3001/product?userId=${userId}`);
};

export const formatPrice = (price) => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumSignificantDigits: 12,
  }).format(price);
};
