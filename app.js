var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var app = express();
require("dotenv").config();

var authRoutes = require("./routes/authRoutes");
var bookingRoutes = require("./routes/bookingRoutes");
var busRoutes = require("./routes/busRoutes");
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit the process if MongoDB connection fails
  });

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
