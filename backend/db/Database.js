const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose.connect(process.env.DB_URL).then((data) => {
    console.log(`Kết nối thành công với: ${data.connection.host}`);
  });
};

module.exports = connectDatabase;
