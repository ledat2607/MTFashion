const express = require("express");
const router = express.Router();
const Admin = require("../model/admin");
const User = require("../model/user");
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const adminToken = require("../utils/adminToken");
const { isAdmin } = require("../middleware/auth");
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
//Login amdin
router.post(
  "/login-admin",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const data = req.body;
      const userName = data?.userName;
      if (!data?.userName || !data?.password.trim()) {
        return next(new ErrorHandler("Vui lòng nhập đầy đủ thông tin!", 400));
      }
      const admin = await Admin.findOne({ userName }).select("+password");
      if (!admin) {
        return next(new ErrorHandler("Người dùng không tồn tại", 400));
      }
      const isPasswordValid = await admin.comparePassword(data?.password);
      if (!isPasswordValid) {
        return next(new ErrorHandler("Mật khẩu không chính xác", 400));
      }
      adminToken(admin, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);
//Load admin information
router.get(
  "/get-admin",
  isAdmin,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const admin = await Admin.findById(req.admin?.id);
      if (!admin) {
        return next(new ErrorHandler("Quản trị viên không tồn tại", 400));
      }
      res.status(200).json({
        success: true,
        admin,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);
//logout admin
router.get(
  "/logout-admin",
  isAdmin,
  catchAsyncErrors(async (req, res, next) => {
    try {
      res.cookie("adminToken", null, {
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
//Get all user
router.get(
  "/get-user-admin",
  isAdmin,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const userData = await User.find();
      res.status(200).json({
        success: true,
        userData,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

module.exports = router;
