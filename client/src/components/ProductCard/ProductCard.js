import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "../../context/context";
import { fetchProducts, formatPrice } from "../../utils/products";

import Button from "../Button/Button";
import CreateProduct from "../CreateProduct/CreateProduct";
import Modal from "../Modal/Modal";

import s from "./ProductCard.module.css";

export default function ProductCard({ product, setProducts }) {
  const { userId } = useContext(UserContext);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteProduct = async () => {
    try {
      await axios.delete("http://localhost:3001/product", {
        data: { id: product._id },
      });
      fetchProducts(userId).then((res) => setProducts(res.data));
      setShowDeleteModal(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Modal isOpen={showUpdateModal}>
        <CreateProduct
          setShowModal={setShowUpdateModal}
          setProducts={setProducts}
          product={product}
        />
      </Modal>

      <Modal isOpen={showDeleteModal}>
        <div className={s.delete_modal_container}>
          <p>Seguro que quieres eliminar este producto?</p>
          <div className={s.flex}>
            <Button
              type="button"
              text="NO"
              styles="danger"
              handleClick={() => setShowDeleteModal(false)}
            />
            <Button type="button" text="SI" handleClick={handleDeleteProduct} />
          </div>
        </div>
      </Modal>

      <article className={s.card_container}>
        <div className={s.img_wrapper}>
          <img
            alt={product.name}
            src="https://images.unsplash.com/photo-1656543802898-41c8c46683a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
          />
        </div>
        <div className={s.padding}>
          <p>{product.name}</p>
          <div className={s.flex}>
            <p>{formatPrice(product.price)}</p>
            <div className={s.margin_l_auto}>
              <Button
                text="edit"
                type="button"
                handleClick={() => setShowUpdateModal(true)}
              />
              <Button
                text="X"
                styles="danger"
                type="button"
                handleClick={() => setShowDeleteModal(true)}
              />
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
