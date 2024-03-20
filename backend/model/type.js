const mongoose = require("mongoose");

const typeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Vui lòng chọn danh mục sản phẩm!"],
  },
  category: {
    type: String,
    required: [true, "Vui lòng điền tên phân loại sản phẩm!"],
  },
  types: [
    {
      name: {
        type: String,
        required: [true, "Vui lòng điền tên loại sản phẩm!"],
      },
    },
  ],
});

module.exports = mongoose.model("Type", typeSchema);
