const { Router } = require("express");
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProductById,
} = require("../controllers/productController");
const router = Router();

router.get("/", getProducts);
router.post("/", createProduct);
router.put("/", updateProduct);
router.delete("/", deleteProductById);

module.exports = router;
