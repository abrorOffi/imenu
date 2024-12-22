const express = require("express");
const router = express.Router();
const { getRestaurantReport } = require("../controllers/reportController");
const { protect } = require("../middleware/authMiddleware");

// Restoran bo'yicha hisobot olish
router.get("/:restaurantId", protect, getRestaurantReport);

module.exports = router;