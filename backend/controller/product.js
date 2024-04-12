const express = require("express");
const router = express.Router();
const Product = require("../model/product");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { isAdmin, isAuthenticated } = require("../middleware/auth");
const Order = require("../model/order");
//Create new product
router.post("/create-product", isAdmin, async (req, res, next) => {
  try {
    const data = req.body;
    const imgProducts = data.images.map((imageUrl, index) => {
      return {
        url: imageUrl,
        code: data.codes[index],
      };
    });
    // const productData = {
    //   productName: data.productName,
    //   discountRate: data.discountRate,
    //   originalPrice: data.originalPrice,
    //   discountPrice: data.discountPrice,
    //   category: data.selectedCategory,
    //   type: data.selectedType,
    //   mat: data.mat,
    //   stock: data.stock,
    //   color: data.color,
    //   size: data.size,
    //   sold_out: data.sold_out,
    //   imgProduct: imgProducts,
    //   descriptions: data.markdownValue,
    //   material: data.mat,
    // };
    // await Product.create(productData);
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
//Delete event
router.post(
  "/delete-event",
  isAdmin,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { id } = req.body;
      const isProduct = await Product.findById(id);
      if (!isProduct) {
        return next(new ErrorHandler("Sản phẩm không tồn tại", 400));
      }
      const updatedProduct = await Product.findByIdAndUpdate(id, {
        isOnSale: {
          status: false,
          discount_rate_on_sale: 0,
          price_sale: "",
          start_date: "",
          finish_date: "",
          start_time: "",
          finish_time: "",
        },
      });

      if (!updatedProduct) {
        return next(new ErrorHandler("Không thể cập nhật sản phẩm", 400));
      }

      res.status(200).json({
        success: true,
        message: "Xóa sự kiện thành công",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);
//add new discount code
router.post(
  "/add_new_discount_code",
  isAdmin,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { type, code, quantity, percent, dateExp, productId } = req.body;
      const product = await Product.findById(productId);
      if (!product) {
        return next(new ErrorHandler("Sản phẩm không tồn tại", 400));
      }
      const newDiscountCode = {
        type: type,
        value: percent,
        code: code,
        dateExp: dateExp,
        quantity: quantity,
      };

      // Thêm mã khuyến mãi mới vào mảng discountCode của sản phẩm
      product.discountCode.push(newDiscountCode);
      await product.save();
      res.status(200).json({
        success: true,
        message: "Thêm mới thành công",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);
//delete discountcode by code
router.post(
  "/delete_code",
  isAdmin,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { code, productId } = req.body;
      const product = await Product.findById(productId);
      if (!product) {
        return next(new ErrorHandler("Sản phẩm không tồn tại", 400));
      }
      const discountCodeIndex = product.discountCode.findIndex(
        (discount) => discount.code === code
      );

      if (discountCodeIndex === -1) {
        return next(new ErrorHandler("Mã khuyến mãi không tồn tại", 400));
      }

      product.discountCode.splice(discountCodeIndex, 1);

      // Lưu lại thông tin sản phẩm sau khi xóa mã khuyến mãi
      await product.save();
      res.status(200).json({
        success: true,
        message: "Xóa thành công",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);
//add comment
router.post(
  "/add-comment",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { orderId, productId, comment, rating, images, avatar, userName } =
        req.body;
      const product = await Product.findById(productId);
      if (!product) {
        return next(new ErrorHandler("Sản phẩm không tồn tại", 404));
      }
      const order = await Order.findById({ _id: orderId });
      if (!order) {
        return next(new ErrorHandler("Đơn hàng không tồn tại", 400));
      }

      order.isComment = true;
      product.comment.push({
        isCommented: true,
        cmt_userName: userName,
        avatarUser: avatar,
        content: comment,
        rating: rating,
        imgCmt: images, // Sử dụng mảng `images` với trường `url` đã được frontend truyền
      });

      await product.save();
      await order.save();
      res.status(200).json({
        success: true,
        message: "Đánh giá thành công",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

module.exports = router;
