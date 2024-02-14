const express = require("express");
const path = require("path");
const router = express.Router();
const User = require("../model/user");
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const jwt = require("jsonwebtoken");
const sendCode = require("../utils/sendCode");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
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
      let avatar = {};
      if (req.file) {
        const filename = req.file.filename;
        const fileUrl = path.join(filename);
        avatar = {
          public_id: fileUrl,
          url: fileUrl,
        };
      } else {
        avatar = {
          public_id: "",
          url: "",
        };
      }

      const user = {
        surName: surName,
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        password: password,
        userName: userName,
        avatar: avatar,
      };

      const verificationCode = await sendCode({
        email: user.email,
        subject: "Mã xác thực",
        message: "Mã xác thực xác minh tài khoản",
      });

      res.status(200).json({
        success: true,
        user,
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
      await User.create(data.userData);
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
module.exports = router;
