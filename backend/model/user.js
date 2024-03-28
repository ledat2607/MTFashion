const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  surName: {
    type: String,
    required: [true, "Vui lòng điền Họ!"],
  },
  name: { type: String, required: [true, "Vui lòng điền tên của bạn!"] },
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
    minLength: [8, "Mật khẩu phải có độ dài lớn hơn 8 ký tự"],
    select: false,
  },
  phoneNumber: {
    type: Number,
    unique: true,
  },
  addresses: [
    {
      country: {
        type: String,
      },
      city: {
        type: String,
      },
      town: {
        type: String,
      },
      street: {
        type: String,
      },

      addressType: {
        type: String,
      },
    },
  ],
  role: {
    type: String,
    default: "user",
  },
  avatar: {
    type: String,
  },
  birthDay: {
    type: Date,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  amount: {
    type: Number,
    default: 0,
  },
  customerType: {
    type: String,
    default: "Bronze",
  },
  cart: [
    {
      productId: { type: String },
      product: { type: Object },
      date: { type: Date, default: Date.now() },
      quantity: { type: Number, default: 1 },
      size: { type: String },
      typeProduct: {
        code: {
          type: String,
        },
        url: {
          type: String,
        },
      },
    },
  ],
  wishlist: [
    {
      productId: { type: String },
      product: { type: Object },
      date: { type: Date, default: Date.now() },
    },
  ],
  discountCode: [
    {
      code: { type: String },
      value: { type: Number },
      shopId: { type: String },
      selectedProduct: { type: String },
      couponName: { type: String },
    },
  ],
  resetPasswordToken: String,
  resetPasswordTime: Date,
});

//  Hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// jwt token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });
};

// compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
