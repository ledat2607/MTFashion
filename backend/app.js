const express = require("express");
const cookieParser = require("cookie-parser");
const ErrorHandler = require("./utils/ErrorHandler");
const app = express();
const bodyParser = require("body-parser");

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true, limit: "100mb" }));

//config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "backend/config/.env",
  });
}

//ErrorHandling
app.use(ErrorHandler);
module.exports = app;
