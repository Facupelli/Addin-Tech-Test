const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
  },
  userId: {
    type: String,
    required: [true, "User ID is required"],
  },
});

module.exports = mongoose.model("Product", productSchema);
