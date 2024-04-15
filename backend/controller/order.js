const express = require("express");
const router = express.Router();
const Order = require("../model/order");
const Product = require("../model/product");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { isAuthenticated, isAdmin } = require("../middleware/auth");
const User = require("../model/user");
//create order
router.post(
  "/create-order",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { product, shippingAddress, user, totalPrice, style, paymentInfo } =
        req.body;
      const productId = product?.productId;
      const isProduct = await Product.findById(productId);
      if (!isProduct) {
        return next(new ErrorHandler("Sản phẩm không tồn tại"));
      }

      let paidAt = null; // Initialize paidAt to null

      if (paymentInfo.type === "Paypal") {
        // If payment type is paypal, update payment info and set paidAt to current date
        paymentInfo.id = req.body.paymentInfo.id; // Assuming you want to update payment ID
        paymentInfo.status = req.body.paymentInfo.status; // Assuming you want to update payment status
        paidAt = Date.now();
      } else if (paymentInfo.type !== "Thanh toán khi nhận hàng") {
        return next(new ErrorHandler("Phương thức thanh toán không hợp lệ"));
      }

      // Check if style exists, otherwise default to product.product.imgProduct[0]
      const selectedStyle =
        style ||
        (product.product.imgProduct[0] ? product.product.imgProduct[0] : null);

      const data = {
        style: selectedStyle,
        product: product,
        shippingAddress: {
          street: shippingAddress?.street,
          town: shippingAddress?.town,
          provine: shippingAddress?.provine,
        },
        user: {
          id: user,
        },
        totalPrice: totalPrice,
        paymentInfo: paymentInfo,
        paidAt: paidAt, // Assign the calculated value of paidAt
      };

      await Order.create(data);
      res.status(200).json({
        success: true,
        message: "Đã đặt hàng thành công",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);
//get all order foruser
router.get(
  "/all-order-user/:userId",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const orders = await Order.find({ "user.id": req.params.userId }).sort({
        createdAt: -1,
      });

      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
//cancel orders
router.post(
  "/cancel-order",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { reason, orderId } = req.body;
      // Tìm và cập nhật đơn hàng phù hợp
      const updatedOrder = await Order.findOneAndUpdate(
        { _id: orderId }, // Điều kiện tìm kiếm
        {
          $set: {
            paidAt: new Date(), // Cập nhật paidAt thành thời gian hiện tại
            status: "Đã hủy", // Cập nhật status thành "Đã hủy"
            reason: reason, // Cập nhật lý do hủy đơn hàng
          },
        },
        { new: true } // Trả về bản ghi đã cập nhật mới
      );

      if (!updatedOrder) {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy đơn hàng",
        });
      }

      res.status(200).json({
        success: true,
        message: "Hủy đơn hàng thành công",
        order: updatedOrder, // Trả về thông tin của đơn hàng đã được cập nhật
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);
//refund order
router.post(
  "/refund-order",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { reason, orderId } = req.body;
      // Tìm và cập nhật đơn hàng phù hợp
      const updatedOrder = await Order.findOneAndUpdate(
        { _id: orderId }, // Điều kiện tìm kiếm
        {
          $set: {
            paidAt: new Date(), // Cập nhật paidAt thành thời gian hiện tại
            status: "Hoàn trả", // Cập nhật status thành "Đã hủy"
            reason: reason, // Cập nhật lý do hủy đơn hàng
          },
        },
        { new: true } // Trả về bản ghi đã cập nhật mới
      );

      if (!updatedOrder) {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy đơn hàng",
        });
      }

      res.status(200).json({
        success: true,
        message: "Yêu cầu hoàn trả thành công",
        order: updatedOrder, // Trả về thông tin của đơn hàng đã được cập nhật
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);
//get all order - admin
router.get(
  "/get-all-orders",
  isAdmin,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const orders = await Order.find();
      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);
//update status order
router.put(
  "/update-status-order",
  isAdmin,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { status, id, productId, userId, amount } = req.body;
      if (status === "Giao hàng thành công") {
        // Cập nhật trạng thái đơn hàng và thời gian thanh toán
        const order = await Order.findByIdAndUpdate(
          id,
          { status: status, paidAt: Date.now() },
          { new: true }
        );

        if (!order) {
          return res.status(404).json({
            success: false,
            message: "Không tìm thấy đơn hàng",
          });
        }

        const quantitySold = order.product.quantity;

        // Cập nhật số lượng bán ra của sản phẩm
        await Product.findByIdAndUpdate(
          productId,
          { $inc: { sold_out: quantitySold } }, // Tăng số lượng bán ra
          { new: true }
        );

        // Cập nhật số lượng trong kho của sản phẩm
        await Product.findByIdAndUpdate(
          productId,
          { $inc: { stock: -quantitySold } }, // Giảm số lượng trong kho
          { new: true }
        );

        // Cập nhật amount của người dùng
        const user = await User.findByIdAndUpdate(
          userId,
          { $inc: { amount: amount } }, // Tăng amount
          { new: true }
        );

        return res.status(200).json({
          success: true,
          message: "Cập nhật trạng thái đơn hàng thành công",
          data: order,
        });
      } else if (status === "Xác nhận hoàn trả") {
        // Cập nhật trạng thái đơn hàng
        const order = await Order.findByIdAndUpdate(
          id,
          { status: status },
          { new: true }
        );

        if (!order) {
          return res.status(404).json({
            success: false,
            message: "Không tìm thấy đơn hàng",
          });
        }

        // Trừ amount của người dùng
        const user = await User.findByIdAndUpdate(
          userId,
          { $inc: { amount: -amount } }, // Trừ amount
          { new: true }
        );

        return res.status(200).json({
          success: true,
          message: "Cập nhật trạng thái đơn hàng thành công",
          data: order,
        });
      } else {
        // Nếu không phải là "Giao hàng thành công" hoặc "Xác nhận hoàn trả", chỉ cập nhật trạng thái đơn hàng
        const order = await Order.findByIdAndUpdate(
          id,
          { status: status },
          { new: true }
        );

        if (!order) {
          return res.status(404).json({
            success: false,
            message: "Không tìm thấy đơn hàng",
          });
        }

        return res.status(200).json({
          success: true,
          message: "Cập nhật trạng thái đơn hàng thành công",
          data: order,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

module.exports = router;
