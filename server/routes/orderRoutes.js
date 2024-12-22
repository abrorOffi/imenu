const express = require("express");
const router = express.Router();
const {
    createOrder,
    getOrdersByRestaurant,
    updateOrderStatus,
} = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");

// Buyurtma yaratish
router.post("/", protect, createOrder);

// Restoran bo'yicha barcha buyurtmalarni olish
router.get("/:restaurantId", protect, getOrdersByRestaurant);

// Buyurtma holatini yangilash
router.patch("/:orderId", protect, updateOrderStatus);

module.exports = router;