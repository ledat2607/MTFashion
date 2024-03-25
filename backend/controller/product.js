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
      category: data.selectedCategory,
      type: data.selectedType,
      mat: data.mat,
      stock: data.stock,
      color: data.color,
      size: data.size,
      sold_out: data.sold_out,
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
//get all product
router.get(
  "/all-product-admin",

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

//Delete product
router.post(
  "/delete-product",
  isAdmin,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const productId = req.body.id;
      const product = await Product.findByIdAndDelete(productId);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy sản phẩm",
        });
      }
      res.status(200).json({
        success: true,
        message: "Xóa thành công !",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);
//get informartion product by id
router.get(
  "/get-produc-info",
  isAdmin,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const productId = req.query.selectedProduct;
      const productData = await Product.findById(productId);
      if (!productData) {
        return next(new ErrorHandler("Sản phẩm không tồn tại", 400));
      }
      res.status(200).json({
        success: true,
        productData,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);
//create event product
router.post(
  "/create-event-product",
  isAdmin,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { data } = req.body;
      const isProduct = await Product.findById(data.id);
      if (!isProduct) {
        return next(new ErrorHandler("Sản phẩm không tồn tại", 400));
      }
      const updatedProduct = await Product.findByIdAndUpdate(
        data.id,
        {
          isOnSale: {
            status: true,
            discount_rate_on_sale: data.bonus,
            price_sale: data.price_on_sale,
            start_date: data.start_date,
            finish_date: data.end_date,
            start_time: data.start_time,
            finish_time: data.end_time,
          },
        },
        { new: true }
      );

      if (!updatedProduct) {
        return next(new ErrorHandler("Không thể cập nhật sản phẩm", 400));
      }
      res.status(200).json({
        success: true,
        message: "Thêm mới sản phẩm khuyến mãi thành công",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);
module.exports = router;
