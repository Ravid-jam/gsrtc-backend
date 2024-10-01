const express = require("express");
const { bookBus } = require("../controller/bookingController");
const { protect } = require("../auth/authMiddleware");
const router = express.Router();

router.post("/book", protect, bookBus);

module.exports = router;
