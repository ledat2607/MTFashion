const express = require("express");
const path = require("path");
const router = express.Router();
const Type = require("../model/type");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { isAdmin } = require("../middleware/auth");
//Create type
router.post(
  "/create-new-type",
  isAdmin,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const data = req.body;
      // Tìm kiếm loại sản phẩm với category tương ứng
      const existingType = await Type.findOne({
        category: data.selectedCategoryNewType,
      });

      // Nếu loại sản phẩm đã tồn tại, kiểm tra xem type đã có trong mảng types chưa
      if (existingType) {
        const typeExists = existingType.types.some(
          (type) => type.name === data.newType
        );
        if (typeExists) {
          // Nếu type đã tồn tại trong mảng types, trả về thông báo lỗi
          return res.status(400).json({
            success: false,
            message: "Loại sản phẩm đã tồn tại",
          });
        } else {
          existingType.types.push({ name: data.newType });
          await existingType.save();
        }
      } else {
        await Type.create({
          title: data.newTypeTitle,
          category: data.selectedCategoryNewType,
          types: [{ name: data.newType }],
        });
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

//load type by category
router.get(
  "/types-by-category",
  isAdmin,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { selectedCategory } = req.query;
      // Thực hiện truy vấn để lấy danh sách các loại sản phẩm (types) tương ứng với category
      const types = await Type.find({ category: selectedCategory });

      res.status(200).json({
        success: true,
        types,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

module.exports = router;
