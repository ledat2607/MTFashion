const express = require("express");
const cookieParser = require("cookie-parser");
const ErrorHandler = require("./middleware/error");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
// app.use("/", express.static("uploads"));
// app.use(express.urlencoded({ limit: "50mb" }));
// app.use(bodyParser.json({ limit: "10000kb", extended: true }));
// app.use(bodyParser.urlencoded({ limit: "10000kb", extended: true }));
app.use(express.json({ limit: "10mb", extended: true }));
app.use(
  express.urlencoded({ limit: "10mb", extended: true, parameterLimit: 50000 })
);
//config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "backend/config/.env",
  });
}
//import routes
const user = require("./controller/user");
const admin = require("./controller/admin");
const type = require("./controller/type");
const product = require("./controller/product");
const order = require("./controller/order");
const conversation = require("./controller/conversation");
const message = require("./controller/message");

app.use("/api/v2/user", user);
app.use("/api/v2/admin", admin);
app.use("/api/v2/type", type);
app.use("/api/v2/product", product);
app.use("/api/v2/order", order);
app.use("/api/v2/conversation", conversation);
app.use("/api/v2/message", message);

//ErrorHandling
app.use(ErrorHandler);
module.exports = app;
