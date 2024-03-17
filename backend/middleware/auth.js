const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const Admin = require("../model/admin");
exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("Vui lòng đăng nhập để tiếp tục !", 400));
  }
  const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

  req.user = await User.findById(decode.id);
  next();
});
exports.isAdmin = catchAsyncErrors(async (req, res, next) => {
  const { adminToken } = req.cookies;
  if (!adminToken) {
    return next(new ErrorHandler("Vui lòng đăng nhập để tiếp tục", 401));
  }

  const decoded = jwt.verify(adminToken, process.env.JWT_SECRET_KEY);

  req.admin = await Admin.findById(decoded.id);

  next();
});
