const express = require("express");
const router = express.Router();
const {
    createRestaurant,
    addTable,
    generateQRCode,
    getAllRestaurants,
} = require("../controllers/restaurantController");
const { protect } = require("../middleware/authMiddleware");

// Restoran yaratish
router.post("/", protect, createRestaurant);

// Stol qo'shish
router.post("/:id/tables", protect, addTable);

// QR kod yaratish
router.get("/:id/tables/:tableId/qrcode", protect, generateQRCode);

// Barcha restoranlarni olish
router.get("/", protect, getAllRestaurants);

module.exports = router;