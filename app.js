var createError = require("http-errors");
var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();
var app = express();

var authRoutes = require("./routes/authRoutes");
var bookingRoutes = require("./routes/bookingRoutes");
var busRoutes = require("./routes/busRoutes");
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Server started"));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/admin", authRoutes);
app.use("/api", bookingRoutes);
app.use("/api", busRoutes);

app.use(function (req, res, next) {
  res.json({
    message: "Hello , welcome to backend",
    status: 200,
  });
});
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
