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
    if (verificationCodeAsNumber === data?.verificationCode) {
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
//add discountcode
router.post(
  "/add_discount_code",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { data, productId } = req.body;
      const newDiscountCode = {
        code: data.code,
        type: data.type,
        value: data.value,
        productId: productId,
        quantity: 1,
        dateExp: data.dateExp,
      };

      // Lấy ID của người dùng từ đối tượng authenticated
      const userId = req.user.id;

      // Cập nhật trường discountCode của người dùng với dữ liệu mới
      await User.findByIdAndUpdate(userId, {
        $push: { discountCode: newDiscountCode },
      });
      res.status(200).json({
        success: true,
        message: "Thêm thành công",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);
//update addresses
router.post(
  "/add_address",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { street, town, provine, selectedStyle } = req.body;
      const userId = req.user.id;
      // Tìm và cập nhật người dùng
      const user = await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            addresses: {
              street: street,
              town: town,
              provine: provine,
              addressType: selectedStyle,
            },
          },
        },
        { new: true } // Trả về người dùng sau khi cập nhật
      );

      // Kiểm tra nếu không tìm thấy người dùng
      if (!user) {
        return next(new ErrorHandler("Người dùng không tồn tại", 400));
      }

      res.status(200).json({
        success: true,
        message: "Thêm mới thành công",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);
//delete address
router.post(
  "/delete_address",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { id } = req.body;
      const userId = req.user.id;

      // Xóa địa chỉ từ cơ sở dữ liệu
      const deletedAddress = await User.findOneAndUpdate(
        { _id: userId },
        { $pull: { addresses: { _id: id } } },
        { new: true }
      );

      // Kiểm tra xem địa chỉ đã được xóa thành công hay không
      if (!deletedAddress) {
        return next(new ErrorHandler("Địa chỉ không tồn tại", 400));
      }

      res.status(200).json({
        success: true,
        message: "Xóa địa chỉ thành công",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);
//update avatar
router.put(
  "/update-avatar",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { data } = req.body;
      const userId = req.user.id;
      const user = await User.findByIdAndUpdate(
        userId,
        { avatar: data?.avatar },
        { new: true }
      );
      if (!user) {
        return next(new ErrorHandler("Người dùng không tồn tại", 400));
      }
      res.status(200).json({
        success: true,
        message: "Cập nhật ảnh đại diện thành công",
      });
    } catch (error) {}
  })
);
router.put(
  "/update-infor",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { data } = req.body;
      const userId = req.user.id;
      const user = await User.findByIdAndUpdate(
        userId,
        {
          birthDay: data.editBirthDay,
          surName: data.editSurname,
          email: data.editEmail,
          name: data.editName,
          phoneNumber: data?.editPhoneNumber,
          userName: data?.editUserName,
        },
        { new: true }
      );
      if (!user) {
        return next(new ErrorHandler("Người dùng không tồn tại", 400));
      }
      res.status(200).json({
        success: true,
        message: "Cập nhật thông tin thành công",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);
//update password
router.put(
  "/update-user-password",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id).select("+password");
      const isPasswordMatched = await user.comparePassword(
        req.body.oldPassword
      );
      if (!isPasswordMatched) {
        return next(new ErrorHandler("Mật khẩu cũ không chính xác!"));
      }
      if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("Mật khẩu xác nhận không chính xác !"));
      }
      user.password = req.body.newPassword;
      await user.save();
      res.status(201).json({
        success: true,
        message: "Cập nhật thành công",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);
module.exports = router;
