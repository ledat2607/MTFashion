const express = require("express");
const router = express.Router();
const User = require("../model/user");
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const jwt = require("jsonwebtoken");
const sendCode = require("../utils/sendCode");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const { isAuthenticated } = require("../middleware/auth");
const Product = require("../model/product");
//Create user
router.post(
  "/verify-user-email",
  upload.single("file"),
  async (req, res, next) => {
    try {
      const { surName, name, email, password, userName, phoneNumber } =
        req.body;
      const userEmail = await User.findOne({ email });
      const duplicateUserName = await User.findOne({ userName });
      const duplicatePhone = await User.findOne({ phoneNumber });
      if (
        surName === "" ||
        name === "" ||
        email === "" ||
        password === "" ||
        phoneNumber === "" ||
        userName === ""
      ) {
        return next(new ErrorHandler("Vui lòng điền đầy đủ thông tin", 400));
      }
      if (userEmail) {
        return next(new ErrorHandler("Email đã được đăng ký!", 400));
      }
      if (duplicateUserName) {
        return next(new ErrorHandler("Tên người dùng đã tồn tại!", 401));
      }
      if (duplicatePhone) {
        return next(new ErrorHandler("Số điện thoại đã được đăng ký!", 402));
      }
      if (password.length < 8) {
        return next(
          new ErrorHandler("Mật khẩu phải có độ dài từ 8 ký tự", 400)
        );
      }

      const verificationCode = await sendCode({
        email: email,
        subject: "Mã xác thực",
        message: "Mã xác thực xác minh tài khoản",
      });

      res.status(200).json({
        success: true,
        verificationCode,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message), 400);
    }
  }
);

//create new user
router.post(
  "/create-new-user",
  catchAsyncErrors(async (req, res, next) => {
    const data = req.body;
    const verificationCodeAsString = data?.verificationCode
      .toString()
      .replace(/,/g, "");
    const verificationCodeAsNumber = parseInt(verificationCodeAsString, 10);
    if (verificationCodeAsNumber === data.verificationCode) {
      const user = {
        name: data?.userData?.name,
        email: data?.userData?.email,
        password: data?.userData?.password,
        avatar: data?.userData?.avatar,
        phoneNumber: data?.userData?.phoneNumber,
        surName: data?.userData?.surName,
        userName: data?.userData?.userName,
      };
      await User.create(user);
      res.status(200).json({
        success: true,
        message: "Đăng ký thành công !",
      });
    }
  })
);
//Login user
router.post(
  "/login-user",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { userName, password } = req.body;
      if (!userName || !password.trim()) {
        return next(new ErrorHandler("Vui lòng nhập đầy đủ thông tin!", 400));
      }
      const user = await User.findOne({ userName }).select("+password");
      if (!user) {
        return next(new ErrorHandler("Người dùng không tồn tại", 400));
      }
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return next(new ErrorHandler("Mật khẩu không chính xác", 400));
      }
      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);
//Load user information
router.get(
  "/get-user",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return next(new ErrorHandler("Người dùng không tồn tại", 400));
      }
      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);
//Logout user
router.get(
  "/logout",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });
      res.status(200).json({
        success: true,
        message: "Đăng xuất thành công",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//add to wishlist
router.post(
  "/add_to_wishlist",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { id } = req.body;
      const productId = id;
      const isProduct = await Product.findById(productId);
      if (!isProduct) {
        return next(new ErrorHandler("Sản phẩm không tồn tại", 400));
      }
      const user = req.user;
      const isAlreadyInWishlist = user.wishlist?.some(
        (item) => item.productId.toString() === productId
      );

      if (isAlreadyInWishlist) {
        return next(
          new ErrorHandler("Sản phẩm đã có trong danh sách yêu thích", 400)
        );
      }

      // Thêm sản phẩm vào danh sách wishlist của người dùng
      user.wishlist?.push({
        productId: productId,
        product: isProduct,
        date: Date.now(),
      });

      // Lưu cập nhật của người dùng
      await user.save();

      res.status(200).json({
        success: true,
        message: "Sản phẩm đã được thêm vào danh sách yêu thích",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);
// Remove from wishlist
router.delete(
  "/remove_from_wishlist/:productId",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const productId = req.params.productId;
      const user = req.user;

      // Tìm kiếm sản phẩm trong danh sách mong muốn của người dùng
      const index = user.wishlist.findIndex(
        (item) => item.productId.toString() === productId
      );

      // Nếu sản phẩm tồn tại trong danh sách mong muốn, loại bỏ nó
      if (index !== -1) {
        user.wishlist.splice(index, 1);
        await user.save();
        return res.status(200).json({
          success: true,
          message: "Sản phẩm đã được xóa khỏi danh sách yêu thích",
        });
      } else {
        return next(
          new ErrorHandler("Sản phẩm không tồn tại trong wishlist", 400)
        );
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);
//add to cart
router.post(
  "/add_to_cart",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { id, quantity, size, style } = req.body;
      const productId = id;
      const isProduct = await Product.findById(productId);

      if (!isProduct) {
        return next(new ErrorHandler("Sản phẩm không tồn tại", 400));
      }

      const user = req.user;
      let existingCartItem = user.cart.find(
        (item) => item.productId.toString() === productId.toString()
      );

      if (existingCartItem) {
        existingCartItem.quantity += parseInt(quantity);
      } else {
        user.cart.push({
          productId: productId,
          product: isProduct,
          date: Date.now(),
          quantity: parseInt(quantity),
          size: size,
          typeProduct: {
            code: style?.code,
            url: style?.url,
          },
        });
      }

      await user.save();

      res.status(200).json({
        success: true,
        message: "Sản phẩm đã được thêm vào giỏ hàng",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);
// Remove from c
router.delete(
  "/remove_from_cart/:productId",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const productId = req.params.productId;
      const user = req.user;
      // Tìm kiếm sản phẩm trong danh sách mong muốn của người dùng
      const index = user.cart?.findIndex(
        (item) => item.productId.toString() === productId
      );

      // Nếu sản phẩm tồn tại trong danh sách mong muốn, loại bỏ nó
      if (index !== -1) {
        user.cart.splice(index, 1);
        await user.save();
        return res.status(200).json({
          success: true,
          message: "Sản phẩm đã được xóa khỏi giỏ hàng",
        });
      } else {
        return next(
          new ErrorHandler("Sản phẩm không tồn tại trong giỏ hàng", 400)
        );
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);
//get wishlist
router.get(
  "/get_wishlist/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const userId = req.params?.id;
      //Lấy thông tin người dùng và populate trường 'wishlist'
      const user = await User.findById(userId).populate("wishlist");

      // Trả về danh sách yêu thích từ thông tin người dùng
      const wishlist = user?.wishlist;

      // Trả về danh sách yêu thích
      res.status(200).json({ success: true, wishlist });
    } catch (error) {
      // Bắt lỗi nếu có
      return next(new ErrorHandler(error.message, 400));
    }
  })
);
//get cart
router.get(
  "/get_cart/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const userId = req.params?.id;
      //Lấy thông tin người dùng và populate trường 'wishlist'
      const user = await User.findById(userId).populate("cart");

      // Trả về danh sách yêu thích từ thông tin người dùng
      const cart = user?.cart;

      // Trả về danh sách yêu thích
      res.status(200).json({ success: true, cart });
    } catch (error) {
      // Bắt lỗi nếu có
      return next(new ErrorHandler(error.message, 400));
    }
  })
);
module.exports = router;
