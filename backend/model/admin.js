const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const adminSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Vui lòng điền tên đăng nhập của bạn!"],
  },
  email: {
    type: String,
    required: [true, "Vui lòng điền email của bạn !"],
  },
  password: {
    type: String,
    required: [true, "Vui lòng nhập mật khẩu"],
    select: false,
  },
  role: {
    type: String,
    default: "admin",
  },
  avatar: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
  resetPasswordToken: String,
  resetPasswordTime: Date,
});

//  Hash password
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// jwt token
adminSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });
};

// compare password
adminSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("Admin", adminSchema);
