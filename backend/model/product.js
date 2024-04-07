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
  },
  color: {
    type: String,
  },
  size: {
    type: String,
  },
  descriptions: {
    type: String,
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
    default: 0,
  },
  comment: [
    {
      isCommented: {
        type: Boolean,
        default: false,
      },
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
    start_time: {
      type: String,
    },
    finish_time: {
      type: String,
    },
  },
  discountCode: [
    {
      type: {
        type: String,
      },
      value: {
        type: Number,
      },
      code: {
        type: String,
      },
      dateExp: {
        type: Date,
      },
      quantity: {
        type: Number,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
productSchema.pre("save", function (next) {
  if (this.isModified("comment") || this.isNew) {
    // Tính trung bình cộng của tất cả rating trong comment
    const totalRating = this.comment.reduce((acc, cur) => acc + cur.rating, 0);
    this.rating_avg = totalRating / this.comment.length;
  }
  next();
});
module.exports = mongoose.model("Product", productSchema);
