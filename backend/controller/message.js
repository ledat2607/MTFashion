const express = require("express");
const router = express.Router();
const Message = require("../model/message");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const User = require("../model/user");

//create new message
router.post(
  "/create-new-message",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const messageData = req.body;
      messageData.conversationId = req.body.conversationId;
      messageData.sender = req.body.sender;
      messageData.text = req.body.text;

      const message = new Message({
        conversationId: messageData.conversationId,
        text: messageData.text,
        sender: messageData.sender,
        images: messageData.images ? messageData.images : null,
      });
      await message.save();
      res.status(200).json({
        success: true,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

//get all message with conversationId
router.get(
  "/get-all-messages/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const messages = await Message.find({
        conversationId: req.params.id,
      });
      res.status(200).json({
        success: true,
        messages,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

//delete all chat
router.post(
  "/delete-messages/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      // Tìm tất cả các tin nhắn có conversationId trùng với req.params.id
      await Message.deleteMany({ conversationId: req.params.id });

      res.status(200).json({
        success: true,
        message: "Xóa thành công",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

module.exports = router;
