const express = require("express");
const router = express.Router();
const Conversation = require("../model/conversation");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const User = require("../model/user");
const { isAdmin, isAuthenticated } = require("../middleware/auth");

//create new conversation
router.post(
  "/create-conversation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { groupId, senderId, receivedId } = req.body;

      // Kiểm tra xem conversation đã tồn tại giữa hai người dùng hay chưa
      const existingConversation = await Conversation.findOne({
        members: { $all: [senderId, receivedId] },
      });

      if (existingConversation) {
        // Nếu conversation đã tồn tại, không cần tạo mới, trả về thông báo
        return res.status(200).json({
          success: true,
        });
      }

      // Nếu conversation chưa tồn tại, tạo mới
      const newConversation = new Conversation({
        members: [senderId, receivedId],
        groupId: groupId,
      });
      await newConversation.save();
      res.status(200).json({
        success: true,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

//get all conversation admin
router.get(
  "/get-all-conversation/:id",
  isAdmin,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const conversations = await Conversation.find({
        members: {
          $in: [req.params.id],
        },
      }).sort({ updatedAt: -1, createdAt: -1 });
      res.status(200).json({
        success: true,
        conversations,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);
//get all conversation
router.get(
  "/get-all-conversation/:id",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const conversations = await Conversation.find({
        members: {
          $in: [req.params.id],
        },
      }).sort({ updatedAt: -1, createdAt: -1 });
      res.status(200).json({
        success: true,
        conversations,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

//update last conversation
router.put(
  "/update-last-message/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { lastMessage, lastMessageId } = req.body;
      const conversation = await Conversation.findByIdAndUpdate(req.params.id, {
        lastMessage,
        lastMessageId,
      });

      res.status(201).json({
        success: true,
        conversation,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);
module.exports = router;
