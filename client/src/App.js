import { useCookies } from "react-cookie";
import { useContext, useState } from "react";
import { useVerifyUser } from "./hooks/useVerifyUser";
import { useFetchProducts } from "./hooks/useFetchProducts";
import { UserContext } from "./context/context";

import Button from "./components/Button/Button";
import CreateProduct from "./components/CreateProduct/CreateProduct";
import ProductCard from "./components/ProductCard/ProductCard";
import Modal from "./components/Modal/Modal";

import "./app.css";

function App() {
  useVerifyUser();

  const { email, setUserId, setEmail } = useContext(UserContext);
  const [, , removeCookie] = useCookies();
  const [showCreateModal, setShowCreateModal] = useState(false);

  const { products, setProducts } = useFetchProducts();

  return (
    <>
      <Modal isOpen={showCreateModal}>
        <CreateProduct
          setShowModal={setShowCreateModal}
          setProducts={setProducts}
        />
      </Modal>

      <main className="main">
        <div className="bg">
          <div className="btn-wrapper">
            <p>{email}</p>
            <Button
              type="button"
              text="Salir"
              styles="black"
              handleClick={() => {
                removeCookie("jwt");
                setUserId("");
                setEmail("");
              }}
            />
          </div>

          <section>
            <div className="flex">
              <h1>TUS PRODUCTOS</h1>
              <Button
                type="button"
                text="CREAR"
                handleClick={() => setShowCreateModal(true)}
              />
            </div>

            <div className="products-container">
              {products.length > 0 ? (
                products.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    setProducts={setProducts}
                  />
                ))
              ) : (
                <p>
                  No tienes productos! Haz click en CREAR para agregar productos
                  a tu lista!
                </p>
              )}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default App;
