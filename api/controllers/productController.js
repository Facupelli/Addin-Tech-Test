const Product = require("../models/productModel");

module.exports.getProducts = async (req, res) => {
  const { userId } = req.query;
  try {
    const products = await Product.find({ userId: userId });

    res.status(200).json(products);
  } catch (e) {
    console.log(e);
  }
};

module.exports.createProduct = async (req, res) => {
  const { name, price, userId } = req.body;
  try {
    if (name) {
      const newProduct = await Product.create({
        name,
        price,
        userId,
      });

      return res.status(200).json({ success: true, newProduct });
    }

    return res.status(400).json({ message: "missing data" });
  } catch (e) {
    console.log(e);
  }
};

module.exports.updateProduct = async (req, res) => {
  const { name, price, id } = req.body;

  try {
    if (name && id) {
      const updatedProduct = await Product.findByIdAndUpdate(
        { _id: id },
        { name, price }
      );
      return res.status(200).json({ success: true, updatedProduct });
    }

    return res.status(400).json({ message: "missing data" });
  } catch (e) {
    console.log(e);
  }
};

module.exports.deleteProductById = async (req, res) => {
  const { id } = req.body;

  try {
    if (id) {
      await Product.deleteOne({ _id: id });
      return res.status(200).json({ success: true });
    }

    return res.status(400).json({ message: "missing data" });
  } catch (e) {
    console.log(e);
  }
};
