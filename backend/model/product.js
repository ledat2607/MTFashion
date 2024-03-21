const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  originalPrice: {
    type: String,
    required: true,
  },
  discountRate: {
    type: String,
    required: true,
  },
  discountPrice: {
    type: String,
    required: true,
  },
  category: {
    type: String,
  },
  type: {
    type: String,
  },
  imgProduct: [
    {
      url: {
        type: String,
      },
      code: {
        type: String,
      },
    },
  ],
  material: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  descriptions: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Product", productSchema);
