const express = require("express");
const path = require("path");
const router = express.Router();
const Admin = require("../model/Admin");
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const jwt = require("jsonwebtoken");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const adminToken = require("../utils/jwtToken");
//create new admin
router.post(
  "/create-new-admin",
  upload.single("file"),
  async (req, res, next) => {
    try {
      const { email, userName, password, avatar } = req.body;
      const isExists = await Admin.findOne({ email });
      if (isExists) {
        return next(
          new ErrorHandler("Tài khoản quản trị viên đã tồn tại", 400)
        );
      }
      const admin = {
        userName: userName,
        email: email,
        password: password,
        avatar: avatar,
      };
      await Admin.create(admin);
      res.status(200).json({
        success: true,
        message: "Đăng ký thành công",
      });
    } catch (error) {
      return next(new ErrorHandler("Lỗi", 400));
    }
  }
);
//Login user
// router.post(
//   "/login-admin",
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const { userName, password } = req.body;
//       if (!userName || !password.trim()) {
//         return next(new ErrorHandler("Vui lòng nhập đầy đủ thông tin!", 400));
//       }
//       const user = await User.findOne({ userName }).select("+password");
//       if (!user) {
//         return next(new ErrorHandler("Người dùng không tồn tại", 400));
//       }
//       const isPasswordValid = await user.comparePassword(password);
//       if (!isPasswordValid) {
//         return next(new ErrorHandler("Mật khẩu không chính xác", 400));
//       }
//       sendToken(user, 201, res);
//     } catch (error) {
//       return next(new ErrorHandler(error.message, 400));
//     }
//   })
// );
//Load user information
// router.get(
//   "/get-admin",
//   isAuthenticated,
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const user = await User.findById(req.user.id);
//       if (!user) {
//         return next(new ErrorHandler("Người dùng không tồn tại", 400));
//       }
//       res.status(200).json({
//         success: true,
//         user,
//       });
//     } catch (error) {
//       return next(new ErrorHandler(error.message, 400));
//     }
//   })
// );
// //Logout user
// router.get(
//   "/admin/logout",
//   isAuthenticated,
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       res.cookie("token", null, {
//         expires: new Date(Date.now()),
//         httpOnly: true,
//       });
//       res.status(200).json({
//         success: true,
//         message: "Đăng xuất thành công",
//       });
//     } catch (error) {
//       return next(new ErrorHandler(error.message, 500));
//     }
//   })
// );
module.exports = router;
