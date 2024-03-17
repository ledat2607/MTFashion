const adminToken = (admin, statusCode, res) => {
  const adminT = admin.getJwtToken();

  // Options for cookies
  const options = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  res.status(statusCode).cookie("adminToken", adminT, options).json({
    success: true,
    admin,
    message: "Đăng nhập thành công",
    adminT,
  });
};
module.exports = adminToken;
