const { Router } = require("express");
const { checkUser } = require("../middlewars/authMiddleware");
const authRoutes = require("./authRoutes");
const productRoutes = require("./productRoutes");

const router = Router();

router.post("/", checkUser);
router.use("/auth", authRoutes);
router.use("/product", productRoutes);

module.exports = router;
