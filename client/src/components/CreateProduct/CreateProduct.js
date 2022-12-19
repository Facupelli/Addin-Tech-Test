import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "../../context/context";
import { fetchProducts } from "../../utils/products";

import Button from "../Button/Button";

import s from "./CreateProduct.module.css";

export default function CreateProduct({
  isOpen,
  setShowModal,
  setProducts,
  productId,
  productName,
}) {
  const [name, setName] = useState(productName ? productName : "");
  const { userId } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (productId) {
        await axios.put("http://localhost:3001/product", {
          name,
          id: productId,
        });
      } else {
        await axios.post("http://localhost:3001/product", { name, userId });
      }

      fetchProducts(userId).then((res) => setProducts(res.data));
      setName("");
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
        <Button
          type="submit"
          text={productId ? "ACTUALIZAR" : "CREAR"}
          disabled={!name.length > 0}
        />
      </form>
    </div>
  );
}
