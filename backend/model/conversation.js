const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    groupId: {
      type: String,
    },
    members: {
      type: Array,
      required: true,
    },
    lastMessage: {
      type: String,
    },
    lastMessageId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Conversation", conversationSchema);
