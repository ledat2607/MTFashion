const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  originalPrice: {
    type: String,
    required: true,
  },
  discountRate: {
    type: String,
    required: true,
  },
  discountPrice: {
    type: String,
    required: true,
  },
  category: {
    type: String,
  },
  type: {
    type: String,
  },
  imgProduct: [
    {
      url: {
        type: String,
      },
      code: {
        type: String,
      },
    },
  ],
  material: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  descriptions: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    default: 1,
  },
  sold_out: {
    type: Number,
    default: 0,
  },
  rating_avg: {
    type: Number,
    default: 5.0,
  },
  comment: [
    {
      cmt_userName: {
        type: String,
      },
      avatarUser: {
        type: String,
      },
      content: {
        type: String,
      },
      rating: {
        type: Number,
      },
      cmt_createdAt: {
        type: Date,
        default: Date.now(),
      },
      imgCmt: [
        {
          url: {
            type: String,
          },
        },
      ],
    },
  ],
  isOnSale: {
    status: {
      type: Boolean,
      default: false,
    },
    discount_rate_on_sale: {
      type: Number,
    },
    price_sale: {
      type: String,
    },
    start_date: {
      type: Date,
    },
    finish_date: {
      type: Date,
    },
  },
  createdAt: {
    type: Date,
  },
});

module.exports = mongoose.model("Product", productSchema);
