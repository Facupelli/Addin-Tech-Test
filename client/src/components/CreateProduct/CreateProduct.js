import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "../../context/context";
import { fetchProducts } from "../../utils/products";

import Button from "../Button/Button";

import s from "./CreateProduct.module.css";

export default function CreateProduct({ setShowModal, setProducts, product }) {
  const [name, setName] = useState(product?.name ? product.name : "");
  const [price, setPrice] = useState(product?.price ? product.price : null);
  const { userId } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (product?._id) {
        await axios.put("http://localhost:3001/product", {
          name,
          price,
          id: product._id,
        });
      } else {
        await axios.post("http://localhost:3001/product", {
          name,
          price,
          userId,
        });
      }

      fetchProducts(userId).then((res) => setProducts(res.data));
      setName("");
      setPrice("");
      setShowModal(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <div className={s.flex}>
        <Button
          text="X"
          type="button"
          handleClick={() => setShowModal(false)}
        />
      </div>
      <form className={s.form} onSubmit={handleSubmit}>
        <label>Nombre</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Precio</label>
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Button
          type="submit"
          text={product?._id ? "ACTUALIZAR" : "CREAR"}
          disabled={!name.length > 0}
        />
      </form>
    </div>
  );
}
