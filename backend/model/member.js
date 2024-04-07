const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  conversationId: {
    type: String,
    required: true,
  },
  senderId: {
    type: String,
  },
  message: {
    type: String,
  },
});

module.exports = mongoose.model("Member", memberSchema);
