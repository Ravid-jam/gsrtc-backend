const express = require("express");
const { createBus, searchBuses } = require("../controller/busController");
const { protect } = require("../auth/authMiddleware");
const router = express.Router();

router.post("/create", protect, createBus);
router.post("/search", searchBuses);

module.exports = router;
