const express = require("express");
const router = express.Router();
const Product = require("../model/product");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { isAdmin } = require("../middleware/auth");
//Create new product
router.post("/create-product", isAdmin, async (req, res, next) => {
  try {
    const data = req.body;
    const imgProducts = data.images.map((imageUrl, index) => {
      return {
        url: imageUrl,
        code: data.codes[index], // Lấy code ứng với index tương ứng
      };
    });
    const productData = {
      productName: data.productName,
      discountRate: data.discountRate,
      originalPrice: data.originalPrice,
      discountPrice: data.discountPrice,
      mat: data.mat,
      color: data.color,
      size: data.size,
      imgProduct: imgProducts,
      descriptions: data.markdownValue,
      material: data.mat,
    };
    await Product.create(productData);
    res.status(200).json({
      success: true,
      message: "Sản phẩm thêm thành công",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message), 400);
  }
});
router.get(
  "/all-product-admin",
  isAdmin,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find();
      res.status(200).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);
module.exports = router;
