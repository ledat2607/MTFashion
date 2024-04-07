const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  product: {
    type: Object,
    required: true,
  },
  shippingAddress: {
    street: {
      type: String,
    },
    town: {
      type: String,
    },
    provine: {
      type: String,
    },
  },
  style: {
    type: Object,
    required: true,
  },
  user: {
    surName: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "Chờ duyệt",
  },
  type: {
    type: String,
    default: "order",
  },
  paymentInfo: {
    id: {
      type: String,
    },
    status: {
      type: String,
    },
    type: {
      type: String,
    },
  },
  paidAt: {
    type: Date,
  },
  deliveredAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  images: [
    {
      type: String,
    },
  ],
  reason: {
    type: String,
  },
  isComment: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Order", orderSchema);
